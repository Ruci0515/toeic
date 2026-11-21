#!/usr/bin/env python3
"""
用 Kokoro（開源 AI 語音，Apache-2.0）把聽力逐字稿合成為「一回一個」連續音檔，並產生時間軸。
聲音：美國／英國口音男女聲（af_ / am_ / bf_ / bm_ 開頭），每段由題目資料的 voices 指定。
流程比照多益：
  Part 1／2：Number N →（題目）→ (A)(B)(C)(D) → 作答空白 5 秒
  Part 3／4：Questions X through Y refer to … → 對話／獨白 → 逐題唸題目 → 每題作答空白 8 秒

第一次使用（模型約 350 MB，放在 ~/.cache/toeic-tts，不進 git）：
    brew install python@3.12 ffmpeg
    mkdir -p ~/.cache/toeic-tts && cd ~/.cache/toeic-tts
    /opt/homebrew/bin/python3.12 -m venv venv && ./venv/bin/pip install kokoro-onnx soundfile
    curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
    curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
用法（在專案資料夾）：
    ~/.cache/toeic-tts/venv/bin/python tools/build_audio.py      # 產生所有回數
    ~/.cache/toeic-tts/venv/bin/python tools/build_audio.py 2    # 只產生第 2 回
輸出：audio/test{N}_listening.mp3、data/audio_timeline.js（window.BESTEP_AUDIO）
"""
import json
import os
import re
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.expanduser('~/.cache/toeic-tts')
RATE = 24000
NARRATOR = 'am_michael'
ANSWER_GAP = {'Part 1': 5.0, 'Part 2': 5.0, 'Part 3': 8.0, 'Part 4': 8.0}

kokoro = Kokoro(os.path.join(MODEL_DIR, 'kokoro-v1.0.onnx'), os.path.join(MODEL_DIR, 'voices-v1.0.bin'))


def load_tests():
    """用 node 依檔名順序載入 data/*.js，回傳 {testId: [聽力題目]}。"""
    js = r"""
      const fs = require('fs'), vm = require('vm'), path = require('path');
      const ctx = { window: {} }; vm.createContext(ctx);
      const dir = path.join(process.argv[1], 'data');
      fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'audio_timeline.js').sort()
        .forEach((f) => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx));
      const out = {};
      Object.values(ctx.window.BESTEP_DATA).forEach((d) => { if (d.section === 'listening') out[d.testId] = d.questions; });
      process.stdout.write(JSON.stringify(out));
    """
    raw = subprocess.run(['node', '-e', js, ROOT], capture_output=True, text=True, check=True).stdout
    return {int(k): v for k, v in json.loads(raw).items()}


def clean(text):
    text = re.sub(r'^\(([A-D])\)\s*', r'\1. ', text.strip())
    text = text.replace('[pause]', ', ')
    # 電話號碼、編號：逐字唸（555-0192 → 5 5 5, 0 1 9 2）
    text = re.sub(r'\b(\d{3})-(\d{4})\b', lambda m: ' '.join(m.group(1)) + ', ' + ' '.join(m.group(2)), text)
    text = re.sub(r'\b([A-Z])-(\d{3,})\b', lambda m: m.group(1) + ', ' + ' '.join(m.group(2)), text)
    return text


class Builder:
    def __init__(self, tmp):
        self.tmp = tmp
        self.items = []
        self.t = 0.0
        self.n = 0

    def _write(self, samples):
        self.n += 1
        path = os.path.join(self.tmp, 'c%05d.wav' % self.n)
        sf.write(path, samples, RATE, subtype='PCM_16')
        self.items.append(path)
        self.t += len(samples) / RATE

    def speak(self, voice, text):
        lang = 'en-gb' if voice.startswith('b') else 'en-us'
        samples, sr = kokoro.create(clean(text), voice=voice, speed=1.0, lang=lang)
        assert sr == RATE
        self._write(np.asarray(samples, dtype=np.float32))

    def silence(self, seconds):
        self._write(np.zeros(int(seconds * RATE), dtype=np.float32))

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
    for gi, group in enumerate(groups_of(questions)):
        first = group[0]
        voices = first.get('voices') or {}
        part = first['part']
        start = b.t
        nums = [q['id'] for q in group]
        if part in ('Part 1', 'Part 2'):
            b.speak(NARRATOR, 'Number %d.' % first['id'] if part == 'Part 2' else 'Number %d. Look at the picture marked number %d in your test book.' % (first['id'], first['id']))
            b.silence(0.7)
            for line in first['script']:
                b.speak(voices.get(line['speaker'], 'af_heart'), line['text'])
                b.silence(0.6)
            b.silence(ANSWER_GAP[part])
        else:
            kind = 'conversation' if part == 'Part 3' else 'talk'
            extra = ' and graphic' if first.get('figure') else ''
            b.speak(NARRATOR, 'Questions %d through %d refer to the following %s%s.' % (nums[0], nums[-1], kind, extra))
            b.silence(1.0)
            for line in first['script']:
                b.speak(voices.get(line['speaker'], 'af_heart'), line['text'])
                b.silence(0.45)
            b.silence(1.0)
            for q in group:
                b.speak(NARRATOR, 'Number %d. %s' % (q['id'], q['question']))
                b.silence(ANSWER_GAP[part])
        label = ('第 %d 題' % nums[0]) if len(nums) == 1 else ('第 %d–%d 題' % (nums[0], nums[-1]))
        segments.append({'start': round(start, 3), 'end': round(b.t, 3), 'kind': 'group', 'firstQ': nums[0], 'label': label})
        print('  %s（%.0f 秒）' % (label, b.t - start), flush=True)
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
