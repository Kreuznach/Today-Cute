# 캐릭터 그림 만들기 가이드 (Grok Imagine 사용)

**작성일**: 2026-11-10  
**읽는 사람**: 초등 고학년도 따라 할 수 있게 쉽게 썼어요

---

## 0. 지금 앱은 어떻게 되어 있나요?

✅ **24마리 그림이 모두 들어갔어요!** (2026-11-10, v0.2.10)

- Grok으로 만든 jpg 24장을 **webp 로 바꾸고 배경을 투명하게** 만들어 앱에 넣었어요.
- 앱은 `public/assets/characters/{키}.webp` 가 있으면 그림을, 없으면 이모지를 보여 줘요.
- 나중에 새 친구를 추가해도 **그림만 없으면 이모지로 먼저 나와서** 앱이 고장 나지 않아요.

| 항목 | 전 (jpg) | 후 (webp) |
|------|----------|-----------|
| 크기 | 1408×1408 | 320×320 |
| 한 장 용량 | 약 180~390KB | 약 12~27KB |
| 24장 합계 | 약 5.9MB | **약 0.4MB** (약 15배 가벼워요) |
| 배경 | 흰색 네모 | **투명** (파스텔 카드 위에 스티커처럼 얹혀요) |

```
assets-src/characters/        ← 원본 jpg 보관함 (앱에 안 들어가요)
│   001_sleepy-otter.jpg
│   ...
public/assets/characters/     ← 앱에 들어가는 최적화 그림
    sleepy-otter.webp
    ...
scripts/optimize-characters.py ← jpg → webp 자동 변환 도구
```

> 💡 **왜 원본을 `public` 밖에 두나요?**  
> `public` 안에 있는 파일은 전부 앱 파일(.ait)에 같이 들어가요.  
> 5.9MB짜리 원본이 같이 들어가면 앱이 무거워져서, 원본은 `assets-src` 에 따로 보관해요.

### 그림을 새로 바꾸고 싶을 때 (3줄 요약)

1. 새 jpg를 `assets-src/characters/` 에 `번호_키이름.jpg` 로 넣어요. (예: `001_sleepy-otter.jpg`)
2. `python scripts/optimize-characters.py` 를 실행해요. (몇 분 걸려요)
3. `npm run build` 로 새 `.ait` 를 만들어요.

---

## 0-1. 처음 계획 (참고)

처음에는 아래처럼 만들 계획이었어요. 지금은 이미 끝났지만, 새 친구를 만들 때 그대로 쓸 수 있어요.

```
public/
└── assets/
    └── characters/
        ├── sleepy-otter.webp   ← 이 이름으로 넣으면 졸린 수달 그림이 나와요
        ├── picky-cat.webp
        └── ...
```

> ⚠️ 파일 이름은 **영어 키 이름 + .webp** 로 정확히 맞춰야 해요. (아래 표 참고)

---

## 1. 누가 그림을 만드나요? (AI가 직접 하기 어려운 이유)

| 방법 | 가능할까요? | 이유 |
|------|-------------|------|
| Copilot이 내 크롬의 Grok을 조종 | ❌ 어려워요 | Copilot이 쓰는 브라우저는 내 크롬과 **따로**라서 내 Grok 로그인이 없어요 |
| Copilot이 Grok을 자동으로 연결 | ❌ 없어요 | Grok Imagine 이미지를 만드는 공식 연결(도구)이 지금은 없어요 |
| **내가 Grok에서 만들고 파일만 넣기** | ✅ 추천 | 아래 프롬프트를 복사해서 붙이면 돼요 |
| Copilot의 이미지 만들기 기능 | △ 가능 | 크레딧이 들고, 24장은 비용이 커서 필요할 때만 요청하세요 |

그래서 **"내가 Grok에서 만들기"** 방법을 자세히 알려 줄게요.

---

## 2. 그림 만드는 순서 (5단계)

1. **grok.com** 에 로그인해서 **Imagine** 을 열어요.
2. 아래 **공통 문장** 뒤에 **친구 문장**을 붙여서 입력해요.
3. 마음에 드는 그림이 나오면 **다운로드** 해요.
4. 크기를 **256×256** 으로 줄이고 **webp** 로 바꿔요. (3번 항목 참고)
5. 파일 이름을 바꿔서 `public/assets/characters/` 에 넣어요. 끝! 🎉

### 공통 문장 (모든 친구에게 똑같이 붙여요)

> 그래야 24마리가 **한 가족처럼** 보여요.

```
cute chibi animal sticker, soft pastel colors, thick rounded outline,
big shiny eyes, tiny blush cheeks, simple flat shading,
centered full body, plain white background, no text, no watermark,
square image, friendly and calm mood, for a children-friendly app
```

### 친구 문장 (친구별로 하나씩 이어 붙여요)

| # | 파일 이름 (키) | 친구 문장 |
|---|----------------|-----------|
| 1 | `sleepy-otter` | a sleepy otter floating on its back, half-closed eyes |
| 2 | `picky-cat` | a picky cat with a proud look, tail curled |
| 3 | `hyper-hamster` | an energetic hamster with full cheeks, sparkling eyes |
| 4 | `soft-chick` | a fluffy yellow chick, round and soft |
| 5 | `walk-dog` | a happy puppy on a walk, wagging tail |
| 6 | `lazy-turtle` | a relaxed turtle with a round shell |
| 7 | `cloud-bunny` | a bunny with fluffy cloud-like fur, long ears |
| 8 | `sparkle-fox` | a clever fox with a bushy sparkling tail |
| 9 | `shy-panda` | a shy panda hiding half its face with its paws |
| 10 | `rascal-raccoon` | a mischievous raccoon with a playful grin |
| 11 | `steady-bear` | a warm and sturdy teddy bear, gentle smile |
| 12 | `star-penguin` | a penguin holding a tiny glowing star |
| 13 | `pure-sheep` | a fluffy white sheep like cotton candy |
| 14 | `ocean-octopus` | a creative octopus holding a paintbrush |
| 15 | `tiny-frog` | a cheerful little frog jumping |
| 16 | `sweet-koala` | a sweet koala hugging a tree branch |
| 17 | `dreamy-whale` | a dreamy whale with a small water spout and stars |
| 18 | `morning-bird` | a small bird singing at sunrise |
| 19 | `wise-owl` | a calm wise owl with round glasses |
| 20 | `brave-lion` | a brave baby lion with a fluffy mane |
| 21 | `calm-elephant` | a calm baby elephant, big soft ears |
| 22 | `flower-butterfly` | a pretty butterfly with flower-patterned wings |
| 23 | `mini-deer` | a gentle small deer with tiny antlers |
| 24 | `happy-pig` | a happy pink pig with a smiling snout |

**팁**

- 먼저 **1마리만** 만들어서 스타일이 마음에 드는지 보세요. 마음에 들면 공통 문장은 **절대 바꾸지 않고** 나머지를 만들어요.
- 마음에 드는 그림이 나오면 그 그림을 **참고 이미지**로 올려서 "같은 스타일로" 라고 하면 더 비슷해져요.
- 배경은 **하얀색(또는 투명)** 이 좋아요. 앱의 파스텔 배경 위에 올려 쓰기 때문이에요.

---

## 3. 크기와 파일 형식 줄이기

앱 파일이 무거워지면 로딩이 느려져요. 그래서 **작게** 만들어요.

| 항목 | 값 |
|------|----|
| 크기 | 256×256 (가로=세로) |
| 형식 | webp |
| 파일 하나 크기 | 40KB 이하 추천 |
| 24장 합계 | 1MB 안쪽 |

**쉬운 방법**: [squoosh.app](https://squoosh.app) 에 그림을 올리고 → 크기 256 → 형식 WebP → 저장.

**한꺼번에 바꾸는 방법** (파이썬이 있을 때, 폴더 안의 png 전부 변환):

```
pip install pillow
python -c "import glob,os; from PIL import Image; [Image.open(f).convert('RGBA').resize((256,256)).save(os.path.splitext(f)[0]+'.webp','WEBP',quality=85) for f in glob.glob('*.png')]"
```

---

## 4. 넣고 나서 확인하기

1. 그림을 `public/assets/characters/` 에 넣어요.
2. `npm run dev` 로 앱을 열어요.
3. 도감에서 **획득한 친구**의 그림이 바뀌었는지 봐요.
4. 안 바뀌면 아래를 확인해요.

| 증상 | 이유 | 해결 |
|------|------|------|
| 계속 이모지로 나와요 | 파일 이름이 달라요 | 위 표의 **키 이름.webp** 와 똑같은지 확인 |
| 그림이 깨져 보여요 | webp가 아니거나 파일이 망가짐 | 다시 변환해서 넣기 |
| 그림이 너무 커요 | 256보다 큼 | 크기를 줄여서 다시 저장 |

**배포 전에**: `npm run build` 후 `.ait` 파일 크기가 너무 커지지 않았는지 꼭 확인해요.

---

## 5. 꼭 지켜야 할 약속

- 남의 캐릭터(유명 만화·게임 캐릭터)와 **닮지 않게** 해요. 저작권 문제가 생길 수 있어요.
- 그림 안에 **글자·워터마크**가 들어가면 다시 만들어요.
- 무섭거나 슬픈 표정은 쓰지 않아요. 우리 앱은 **응원** 앱이에요. 💛
- Grok으로 만든 그림을 앱에 쓸 수 있는지 **Grok 이용약관**을 한 번 읽어 봐요.
