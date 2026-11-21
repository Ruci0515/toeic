#!/usr/bin/env python3
"""
用 macOS 內建語音（say）把聽力逐字稿合成為「一回一個」連續音檔，並產生時間軸。
不同角色用不同口音（美、英、澳、愛爾蘭），流程比照多益：
  Part 2：Number N → 題目 → (A)(B)(C) 三個回應 → 作答空白 5 秒
  Part 3/4：Questions X through Y refer to … → 對話／獨白 → 逐題唸題目 → 每題作答空白 8 秒

用法（在專案資料夾執行，需要 macOS 與 ffmpeg：brew install ffmpeg）：
    python3 tools/build_audio.py            # 產生所有回數
    python3 tools/build_audio.py 2          # 只產生第 2 回
輸出：audio/test{N}_listening.mp3、data/audio_timeline.js（window.BESTEP_AUDIO）
"""
import json
import os
import re
import subprocess
import sys
import tempfile
import wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RATE = 22050
SPEECH_RATE = '168'          # 每分鐘字數，接近多益語速
NARRATOR = 'Eddy (English (US))'
ANSWER_GAP = {'Part 2': 5.0, 'Part 3': 8.0, 'Part 4': 8.0}


def load_tests():
    """用 node 讀出 data/test*_listening.js（回傳 {testId: [questions]}）。"""
    js = r"""
      const fs = require('fs'), vm = require('vm'), path = require('path');
      const ctx = { window: {} }; vm.createContext(ctx);
      const dir = path.join(process.argv[1], 'data');
      const files = fs.readdirSync(dir).filter((f) => /^test\d+_listening\.js$/.test(f)).sort();
      files.forEach((f) => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx));
      const out = {};
      Object.values(ctx.window.BESTEP_DATA).forEach((d) => { if (d.section === 'listening') out[d.testId] = d.questions; });
      process.stdout.write(JSON.stringify(out));
    """
    raw = subprocess.run(['node', '-e', js, ROOT], capture_output=True, text=True, check=True).stdout
    return {int(k): v for k, v in json.loads(raw).items()}


class Builder:
    def __init__(self, tmp):
        self.tmp = tmp
        self.items = []
        self.t = 0.0
        self.n = 0

    def _wav_len(self, path):
        with wave.open(path) as w:
            return w.getnframes() / float(w.getframerate())

    def speak(self, voice, text):
        text = re.sub(r'^\(([A-E])\)\s*', r'\1. ', text.strip())
        text = text.replace('[pause]', ', ')
        self.n += 1
        aiff = os.path.join(self.tmp, 's%04d.aiff' % self.n)
        wav = os.path.join(self.tmp, 's%04d.wav' % self.n)
        subprocess.run(['say', '-v', voice, '-r', SPEECH_RATE, '-o', aiff, text], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', aiff, '-ac', '1', '-ar', str(RATE), '-c:a', 'pcm_s16le', wav], check=True)
        self.items.append(wav)
        self.t += self._wav_len(wav)

    def silence(self, seconds):
        self.n += 1
        wav = os.path.join(self.tmp, 'z%04d.wav' % self.n)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=%d:cl=mono' % RATE,
                        '-t', '%.3f' % seconds, '-c:a', 'pcm_s16le', wav], check=True)
        self.items.append(wav)
        self.t += self._wav_len(wav)

    def export(self, out):
        lst = os.path.join(self.tmp, 'list.txt')
        with open(lst, 'w') as fh:
            fh.write(''.join("file '%s'\n" % p.replace("'", "'\\''") for p in self.items))
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst,
                        '-ac', '1', '-ar', str(RATE), '-c:a', 'libmp3lame', '-b:a', '64k', out], check=True)


def groups_of(questions):
    groups, index = [], {}
    for q in questions:
        key = q.get('group') or ('Q%d' % q['id'])
        if key not in index:
            index[key] = len(groups)
            groups.append([])
        groups[index[key]].append(q)
    return groups


def detect_gaps(mp3):
    """找出 ≥ 3 秒的空白（作答時間），給「跳過等待」與檢討重聽使用。"""
    out = subprocess.run(['ffmpeg', '-hide_banner', '-i', mp3, '-af', 'silencedetect=noise=-38dB:d=3',
                          '-f', 'null', '-'], capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', out)]
    ends = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', out)]
    return [[round(a, 2), round(b, 2)] for a, b in zip(starts, ends)]


def build_test(test_id, questions, tmp):
    b = Builder(tmp)
    segments = []
    b.silence(1.0)
    for group in groups_of(questions):
        first = group[0]
        voices = first.get('voices') or {}
        part = first['part']
        start = b.t
        nums = [q['id'] for q in group]
        if part == 'Part 2':
            b.speak(NARRATOR, 'Number %d.' % first['id'])
            b.silence(0.6)
            for line in first['script']:
                b.speak(voices.get(line['speaker'], 'Samantha'), line['text'])
                b.silence(0.7)
            b.silence(ANSWER_GAP[part])
        else:
            kind = 'conversation' if part == 'Part 3' else 'talk'
            b.speak(NARRATOR, 'Questions %d through %d refer to the following %s.' % (nums[0], nums[-1], kind))
            b.silence(1.0)
            for line in first['script']:
                b.speak(voices.get(line['speaker'], 'Samantha'), line['text'])
                b.silence(0.5)
            b.silence(1.0)
            for q in group:
                b.speak(NARRATOR, 'Number %d. %s' % (q['id'], q['question']))
                b.silence(ANSWER_GAP[part])
        label = ('第 %d 題' % nums[0]) if len(nums) == 1 else ('第 %d–%d 題' % (nums[0], nums[-1]))
        segments.append({'start': round(start, 3), 'end': round(b.t, 3), 'kind': 'group', 'firstQ': nums[0], 'label': label})
    os.makedirs(os.path.join(ROOT, 'audio'), exist_ok=True)
    out = os.path.join(ROOT, 'audio', 'test%d_listening.mp3' % test_id)
    b.export(out)
    print('第 %d 回：%d 段，共 %.1f 分鐘 → %s（%.1f MB）' % (test_id, len(segments), b.t / 60, os.path.relpath(out, ROOT), os.path.getsize(out) / 1e6))
    return {'src': 'audio/test%d_listening.mp3' % test_id, 'duration': round(b.t, 3), 'segments': segments,
            'gaps': detect_gaps(out)}


def main():
    tests = load_tests()
    only = [int(a) for a in sys.argv[1:] if a.isdigit()]
    path = os.path.join(ROOT, 'data', 'audio_timeline.js')
    timeline = {}
    if os.path.exists(path):
        text = open(path, encoding='utf-8').read()
        if '{' in text:
            timeline = json.loads(text[text.index('{'):text.rindex('}') + 1])
    for test_id in sorted(tests):
        if only and test_id not in only:
            continue
        with tempfile.TemporaryDirectory() as tmp:
            timeline[str(test_id)] = build_test(test_id, tests[test_id], tmp)
    with open(path, 'w', encoding='utf-8') as fh:
        fh.write('/* 由 tools/build_audio.py 自動產生，請勿手動修改。 */\nwindow.BESTEP_AUDIO = ' +
                 json.dumps(timeline, ensure_ascii=False, indent=2) + ';\n')
    print('時間軸 → data/audio_timeline.js')


if __name__ == '__main__':
    main()
