# 카드 사전 (Card Dictionary)

## 카드 구조

```ts
type CuteCardResult = {
  cardId: string;           // '{characterKey}-{번호}' 형식
  characterKey: string;
  characterName: string;
  rarity: "normal" | "special" | "seasonal";
  moodTitle: string;        // 오늘의 무드 제목
  message: string;          // 응원 메시지
  todayPoint: string;       // 오늘의 포인트 (한 줄)
  smallAction: string;      // 작은 행동 제안
  collectionTheme: string;  // 컬렉션 테마
};
```

## 희귀도 분포

MVP 기준 36개 카드 중:
- **normal**: 24개 (캐릭터당 2개)
- **special**: 12개 (캐릭터당 1개)
- **seasonal**: 0개 (추후 계절/이벤트 카드로 확장)

> 확률 시스템은 MVP에서 제외. 완전 랜덤 뽑기.

## 캐릭터별 카드 목록

| 캐릭터 | cardId | 희귀도 | moodTitle |
|--------|--------|--------|-----------|
| 졸린 수달 | sleepy-otter-01 | normal | 오늘은 쉬어도 괜찮아 |
| 졸린 수달 | sleepy-otter-02 | normal | 느긋하게, 천천히 |
| 졸린 수달 | sleepy-otter-03 | special | 포근한 꿈속처럼 |
| 새침 고양이 | picky-cat-01 | normal | 내 기준대로 살아도 돼 |
| 새침 고양이 | picky-cat-02 | normal | 사실 신경 쓰이긴 해 |
| 새침 고양이 | picky-cat-03 | special | 다가오면 좋아해 줄게 |
| 과몰입 햄스터 | hyper-hamster-01 | normal | 오늘도 전력 질주! |
| 과몰입 햄스터 | hyper-hamster-02 | normal | 아이디어가 넘쳐흘러 |
| 과몰입 햄스터 | hyper-hamster-03 | special | 잠깐, 숨 좀 돌려요 |
| 말랑 병아리 | soft-chick-01 | normal | 오늘도 병아리처럼 반짝 |
| 말랑 병아리 | soft-chick-02 | normal | 포근하게 안아줄게 |
| 말랑 병아리 | soft-chick-03 | special | 작은 것도 다 예뻐 |
| 산책 강아지 | walk-dog-01 | normal | 밖으로 나가봐요! |
| 산책 강아지 | walk-dog-02 | normal | 꼬리가 절로 흔들려 |
| 산책 강아지 | walk-dog-03 | special | 함께라서 더 좋아 |
| 느긋한 거북이 | lazy-turtle-01 | normal | 천천히 가는 게 맞아 |
| 느긋한 거북이 | lazy-turtle-02 | normal | 등껍질처럼 단단하게 |
| 느긋한 거북이 | lazy-turtle-03 | special | 오래 보면 더 좋아 |
| 구름 토끼 | cloud-bunny-01 | normal | 구름처럼 가볍게 |
| 구름 토끼 | cloud-bunny-02 | normal | 상상이 현실이 되는 날 |
| 구름 토끼 | cloud-bunny-03 | special | 하늘 위에서 바라보면 |
| 반짝 여우 | sparkle-fox-01 | normal | 오늘은 뭔가 알아낼 것 같아 |
| 반짝 여우 | sparkle-fox-02 | normal | 눈치빠르게 기회 잡기 |
| 반짝 여우 | sparkle-fox-03 | special | 반짝, 아이디어가 왔어 |
| 소심한 판다 | shy-panda-01 | normal | 말 못해도 마음은 있어 |
| 소심한 판다 | shy-panda-02 | normal | 작은 용기, 큰 의미 |
| 소심한 판다 | shy-panda-03 | special | 느리지만 깊은 관계 |
| 장난꾸러기 라쿤 | rascal-raccoon-01 | normal | 오늘은 좀 장난쳐봐도 돼 |
| 장난꾸러기 라쿤 | rascal-raccoon-02 | normal | 뭐든 재밌게 만들어 |
| 장난꾸러기 라쿤 | rascal-raccoon-03 | special | 몰래 좋은 일 해도 돼 |
| 든든한 곰돌이 | steady-bear-01 | normal | 내가 여기 있어 |
| 든든한 곰돌이 | steady-bear-02 | normal | 꾸준함이 가장 강해 |
| 든든한 곰돌이 | steady-bear-03 | special | 포근하게 감싸줄게 |
| 별빛 펭귄 | star-penguin-01 | normal | 오늘 밤은 별이 빛나 |
| 별빛 펭귄 | star-penguin-02 | normal | 나만의 별자리 만들기 |
| 별빛 펭귄 | star-penguin-03 | special | 반짝이는 건 다 이유가 있어 |

## 추후 확장 계획

| 단계 | 카드 수 | 추가 내용 |
|------|---------|-----------|
| 1차 (현재) | 36종 | 12 캐릭터 × 3카드 |
| 2차 | 72종+ | 계절/날씨 캐릭터 12종 추가 |
| 3차 | 108종+ | 직장/학교/소비/취미 캐릭터 12종 추가 |
| 4차 | 144종+ | 이벤트/스페셜 카드 추가 |
| 5차 | 180종+ | 시즌 컬렉션/한정 카드 추가 |
