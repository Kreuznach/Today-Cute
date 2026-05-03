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

v0.2.0 기준 96개 카드 (24 캐릭터 × 4카드):
- **normal**: 48개 (캐릭터당 2개)
- **special**: 24개 (캐릭터당 1개)
- **seasonal**: 24개 (캐릭터당 1개, 계절/이벤트 테마)

> 확률 시스템은 MVP에서 제외. 완전 랜덤 뽑기.

## 캐릭터별 카드 목록

### 기존 12종 캐릭터

| 캐릭터 | cardId | 희귀도 | moodTitle |
|--------|--------|--------|-----------|
| 졸린 수달 | sleepy-otter-01 | normal | 오늘은 쉬어도 괜찮아 |
| 졸린 수달 | sleepy-otter-02 | normal | 느긋하게, 천천히 |
| 졸린 수달 | sleepy-otter-03 | special | 포근한 꿈속처럼 |
| 졸린 수달 | sleepy-otter-04 | seasonal | 겨울 수달처럼 따끈하게 |
| 새침 고양이 | picky-cat-01 | normal | 내 기준대로 살아도 돼 |
| 새침 고양이 | picky-cat-02 | normal | 사실 신경 쓰이긴 해 |
| 새침 고양이 | picky-cat-03 | special | 다가오면 좋아해 줄게 |
| 새침 고양이 | picky-cat-04 | seasonal | 봄 고양이의 햇볕 낮잠 |
| 과몰입 햄스터 | hyper-hamster-01 | normal | 오늘도 전력 질주! |
| 과몰입 햄스터 | hyper-hamster-02 | normal | 아이디어가 넘쳐흘러 |
| 과몰입 햄스터 | hyper-hamster-03 | special | 잠깐, 숨 좀 돌려요 |
| 과몰입 햄스터 | hyper-hamster-04 | seasonal | 가을 햄스터의 수확 준비 |
| 말랑 병아리 | soft-chick-01 | normal | 오늘도 병아리처럼 반짝 |
| 말랑 병아리 | soft-chick-02 | normal | 포근하게 안아줄게 |
| 말랑 병아리 | soft-chick-03 | special | 작은 것도 다 예뻐 |
| 말랑 병아리 | soft-chick-04 | seasonal | 봄비 맞은 병아리처럼 |
| 산책 강아지 | walk-dog-01 | normal | 밖으로 나가봐요! |
| 산책 강아지 | walk-dog-02 | normal | 꼬리가 절로 흔들려 |
| 산책 강아지 | walk-dog-03 | special | 함께라서 더 좋아 |
| 산책 강아지 | walk-dog-04 | seasonal | 여름 산책의 신선함 |
| 느긋한 거북이 | lazy-turtle-01 | normal | 천천히 가는 게 맞아 |
| 느긋한 거북이 | lazy-turtle-02 | normal | 등껍질처럼 단단하게 |
| 느긋한 거북이 | lazy-turtle-03 | special | 오래 보면 더 좋아 |
| 느긋한 거북이 | lazy-turtle-04 | seasonal | 가을 단풍처럼 천천히 물들어 |
| 구름 토끼 | cloud-bunny-01 | normal | 구름처럼 가볍게 |
| 구름 토끼 | cloud-bunny-02 | normal | 상상이 현실이 되는 날 |
| 구름 토끼 | cloud-bunny-03 | special | 하늘 위에서 바라보면 |
| 구름 토끼 | cloud-bunny-04 | seasonal | 첫눈처럼 포근하게 |
| 반짝 여우 | sparkle-fox-01 | normal | 오늘은 뭔가 알아낼 것 같아 |
| 반짝 여우 | sparkle-fox-02 | normal | 눈치빠르게 기회 잡기 |
| 반짝 여우 | sparkle-fox-03 | special | 반짝, 아이디어가 왔어 |
| 반짝 여우 | sparkle-fox-04 | seasonal | 봄의 신호를 먼저 알아채 |
| 소심한 판다 | shy-panda-01 | normal | 말 못해도 마음은 있어 |
| 소심한 판다 | shy-panda-02 | normal | 작은 용기, 큰 의미 |
| 소심한 판다 | shy-panda-03 | special | 느리지만 깊은 관계 |
| 소심한 판다 | shy-panda-04 | seasonal | 겨울 판다의 포근한 굴 |
| 장난꾸러기 라쿤 | rascal-raccoon-01 | normal | 오늘은 좀 장난쳐봐도 돼 |
| 장난꾸러기 라쿤 | rascal-raccoon-02 | normal | 뭐든 재밌게 만들어 |
| 장난꾸러기 라쿤 | rascal-raccoon-03 | special | 몰래 좋은 일 해도 돼 |
| 장난꾸러기 라쿤 | rascal-raccoon-04 | seasonal | 여름 축제처럼 신나게 |
| 든든한 곰돌이 | steady-bear-01 | normal | 내가 여기 있어 |
| 든든한 곰돌이 | steady-bear-02 | normal | 꾸준함이 가장 강해 |
| 든든한 곰돌이 | steady-bear-03 | special | 포근하게 감싸줄게 |
| 든든한 곰돌이 | steady-bear-04 | seasonal | 겨울 동면 전 마지막 충전 |
| 별빛 펭귄 | star-penguin-01 | normal | 오늘 밤은 별이 빛나 |
| 별빛 펭귄 | star-penguin-02 | normal | 나만의 별자리 만들기 |
| 별빛 펭귄 | star-penguin-03 | special | 반짝이는 건 다 이유가 있어 |
| 별빛 펭귄 | star-penguin-04 | seasonal | 겨울 밤하늘의 별자리 |

### 신규 12종 캐릭터

| 캐릭터 | cardId | 희귀도 | moodTitle |
|--------|--------|--------|-----------|
| 순수한 양 | pure-sheep-01 | normal | 복슬복슬한 하루 |
| 순수한 양 | pure-sheep-02 | normal | 무리와 함께 걷는 힘 |
| 순수한 양 | pure-sheep-03 | special | 순수함이 무기야 |
| 순수한 양 | pure-sheep-04 | seasonal | 봄 양털 깎기처럼 상쾌하게 |
| 신기한 문어 | ocean-octopus-01 | normal | 여덟 가지 방향으로! |
| 신기한 문어 | ocean-octopus-02 | normal | 색깔을 바꾸는 용기 |
| 신기한 문어 | ocean-octopus-03 | special | 먹물처럼 진한 인상 |
| 신기한 문어 | ocean-octopus-04 | seasonal | 여름 바다처럼 시원하게 |
| 씩씩한 개구리 | tiny-frog-01 | normal | 높이 뛰어올라! |
| 씩씩한 개구리 | tiny-frog-02 | normal | 비 와도 괜찮아 |
| 씩씩한 개구리 | tiny-frog-03 | special | 작지만 목소리는 크게 |
| 씩씩한 개구리 | tiny-frog-04 | seasonal | 장마 후의 맑은 하늘 |
| 달콤한 코알라 | sweet-koala-01 | normal | 나무처럼 든든하게 |
| 달콤한 코알라 | sweet-koala-02 | normal | 낮잠이 최고야 |
| 달콤한 코알라 | sweet-koala-03 | special | 유칼립투스처럼 상쾌하게 |
| 달콤한 코알라 | sweet-koala-04 | seasonal | 가을 유칼립투스의 진한 향기 |
| 꿈꾸는 고래 | dreamy-whale-01 | normal | 깊은 바다처럼 깊게 |
| 꿈꾸는 고래 | dreamy-whale-02 | normal | 노래로 마음 전하기 |
| 꿈꾸는 고래 | dreamy-whale-03 | special | 수면 위로 올라오는 순간 |
| 꿈꾸는 고래 | dreamy-whale-04 | seasonal | 겨울 바다의 장엄함 |
| 아침 새 | morning-bird-01 | normal | 오늘도 먼저 노래해 |
| 아침 새 | morning-bird-02 | normal | 하늘을 나는 자유 |
| 아침 새 | morning-bird-03 | special | 둥지로 돌아오는 따뜻함 |
| 아침 새 | morning-bird-04 | seasonal | 봄의 첫 노래 |
| 지혜로운 부엉이 | wise-owl-01 | normal | 관찰하고 기다려 |
| 지혜로운 부엉이 | wise-owl-02 | normal | 밤이 되어야 보이는 것 |
| 지혜로운 부엉이 | wise-owl-03 | special | 말보다 깊은 침묵 |
| 지혜로운 부엉이 | wise-owl-04 | seasonal | 가을 밤의 지혜 |
| 용감한 사자 | brave-lion-01 | normal | 오늘은 내가 주인공 |
| 용감한 사자 | brave-lion-02 | normal | 무리를 이끄는 마음 |
| 용감한 사자 | brave-lion-03 | special | 포효 한 번으로 바뀌는 것 |
| 용감한 사자 | brave-lion-04 | seasonal | 사바나의 여름, 당당하게 |
| 평온한 코끼리 | calm-elephant-01 | normal | 기억하는 것의 힘 |
| 평온한 코끼리 | calm-elephant-02 | normal | 무리를 지키는 따뜻함 |
| 평온한 코끼리 | calm-elephant-03 | special | 흔들리지 않는 중심 |
| 평온한 코끼리 | calm-elephant-04 | seasonal | 우기의 코끼리처럼 여유롭게 |
| 꽃나비 | flower-butterfly-01 | normal | 변화는 아름다워 |
| 꽃나비 | flower-butterfly-02 | normal | 꽃에서 꽃으로 |
| 꽃나비 | flower-butterfly-03 | special | 나비 효과의 시작 |
| 꽃나비 | flower-butterfly-04 | seasonal | 봄꽃처럼 활짝 피어 |
| 아기 사슴 | mini-deer-01 | normal | 첫 발걸음의 설렘 |
| 아기 사슴 | mini-deer-02 | normal | 조심스럽게, 하지만 용감하게 |
| 아기 사슴 | mini-deer-03 | special | 뿔이 자라는 만큼 |
| 아기 사슴 | mini-deer-04 | seasonal | 가을 숲의 첫 눈 |
| 행복한 돼지 | happy-pig-01 | normal | 지금이 충분해 |
| 행복한 돼지 | happy-pig-02 | normal | 맛있는 것에서 행복 찾기 |
| 행복한 돼지 | happy-pig-03 | special | 복을 나눠줄게 |
| 행복한 돼지 | happy-pig-04 | seasonal | 풍년처럼 풍요로운 가을 |

## 추후 확장 계획

| 단계 | 카드 수 | 추가 내용 |
|------|---------|-----------|
| 1차 (v0.1.0) | 36종 | 12 캐릭터 × 3카드 |
| 2차 (v0.2.0 현재) | 96종 | 24 캐릭터 × 4카드 (seasonal 추가) |
| 3차 | 144종+ | 직장/학교/소비/취미 캐릭터 12종 추가 |
| 4차 | 192종+ | 이벤트/스페셜 카드 추가 |
| 5차 | 240종+ | 시즌 컬렉션/한정 카드 추가 |
