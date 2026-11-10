"""
캐릭터 그림 최적화 스크립트
- 입력: assets-src/characters/001_sleepy-otter.jpg 처럼 '번호_키이름.jpg'
- 출력: public/assets/characters/sleepy-otter.webp (배경 투명, 320x320)
- 실행: python scripts/optimize-characters.py  (24장에 몇 분 걸려요)
- 필요: pip install pillow
"""
import glob
import os
import re
from collections import deque

from PIL import Image, ImageFilter

SRC = 'assets-src/characters'
DST = 'public/assets/characters'
SIZE = 320
PAD = 0.04
WHITE_LEVEL = 238  # 이 값 이상으로 밝은 픽셀을 흰 배경 후보로 본다


def cut_background(im):
    """가장자리와 이어진 흰색만 투명하게 만든다 (캐릭터 안쪽 흰색은 지키기 위해)."""
    rgb = im.convert('RGB')
    w, h = rgb.size
    px = rgb.load()
    near_white = bytearray(w * h)
    for y in range(h):
        for x in range(w):
            if min(px[x, y]) >= WHITE_LEVEL:
                near_white[y * w + x] = 1

    bg = bytearray(w * h)
    q = deque()
    edge = [(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)]
    for x, y in edge:
        i = y * w + x
        if near_white[i] and not bg[i]:
            bg[i] = 1
            q.append((x, y))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                i = ny * w + nx
                if near_white[i] and not bg[i]:
                    bg[i] = 1
                    q.append((nx, ny))

    alpha = Image.frombytes('L', (w, h), bytes(0 if v else 255 for v in bg))
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))  # 테두리를 부드럽게
    out = rgb.convert('RGBA')
    out.putalpha(alpha)
    return out


def main():
    os.makedirs(DST, exist_ok=True)
    total = 0
    for f in sorted(glob.glob(f'{SRC}/*.jpg')):
        key = re.sub(r'^\d+_', '', os.path.splitext(os.path.basename(f))[0])
        im = cut_background(Image.open(f))
        bbox = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
        im = im.crop(bbox)
        side = int(max(im.size) * (1 + PAD * 2))
        canvas = Image.new('RGBA', (side, side), (255, 255, 255, 0))
        canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
        canvas = canvas.resize((SIZE, SIZE), Image.LANCZOS)
        out = f'{DST}/{key}.webp'
        canvas.save(out, 'WEBP', quality=82, method=6)
        total += os.path.getsize(out)
        print(f'{key}: {os.path.getsize(out) // 1024}KB')
    print(f'합계 {total // 1024}KB')


if __name__ == '__main__':
    main()
