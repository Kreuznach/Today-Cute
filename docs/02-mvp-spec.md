# MVP 상세 명세

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite 5 |
| 스타일 | Tailwind CSS 3 |
| 저장소 | localStorage |
| 광고 | mock 모드 (추후 Apps in Toss 광고 API) |

## 파일 구조

```
src/
├── main.tsx                              # 진입점
├── App.tsx                               # 화면 라우팅
├── index.css                             # 글로벌 스타일
├── lib/
│   └── ads.ts                            # 광고 추상화 레이어
└── features/cute-draw/
    ├── types.ts                          # 타입 정의
    ├── data/
    │   └── characters.ts                 # 12종 캐릭터 + 36개 카드 데이터
    ├── utils/
    │   ├── date.ts                       # KST 날짜 유틸리티
    │   └── random.ts                     # 카드 랜덤 뽑기
    ├── storage/
    │   └── cuteDrawStorage.ts            # localStorage CRUD
    ├── hooks/
    │   └── useCuteDraw.ts                # 핵심 상태 관리 훅
    ├── components/
    │   ├── CuteCard.tsx                  # 카드 UI 컴포넌트
    │   ├── DrawBox.tsx                   # 뽑기 박스 애니메이션
    │   ├── CharacterCollection.tsx       # 컬렉션 그리드
    │   └── HistoryList.tsx               # 기록 목록
    └── screens/
        ├── HomeScreen.tsx                # 홈
        ├── DrawScreen.tsx                # 뽑기
        ├── ResultScreen.tsx              # 결과 + 재뽑기 모달
        ├── FinalCardScreen.tsx           # 최종 카드
        ├── HistoryScreen.tsx             # 최근 기록
        └── CollectionScreen.tsx          # 컬렉션
```

## localStorage 스키마

### `cute_today_record`

```ts
{
  dateKst: string;      // 'YYYY-MM-DD' KST
  firstCard: CuteCardResult;
  finalCard: CuteCardResult | null;
  usedRedraw: boolean;
  finalized: boolean;
  createdAt: string;    // ISO
  finalizedAt: string | null;
}
```

### `cute_history`

```ts
CuteHistoryItem[] // 최대 30개, 날짜 내림차순
```

### `cute_collection`

```ts
{
  characterKeys: string[];
  cardIds: string[];
}
```

## 핵심 제약 로직

| 제약 | 구현 위치 |
|------|----------|
| 하루 1회 뽑기 | `getTodayRecord()` → dateKst 비교 |
| 재뽑기 1회 제한 | `usedRedraw` 플래그 |
| 재뽑기 후 강제 확정 | `markRedrawUsed()` → finalized=true |
| 광고 실패 시 기존 카드 유지 | `showAd()` result !== 'success'이면 유지 |
| KST 기준 날짜 계산 | `getTodayKst()` UTC+9 offset |

## 빌드 산출물

```
dist/
├── index.html                (~0.8KB)
├── assets/index-*.css        (~19KB, gzip ~4KB)
├── assets/index-*.js         (~33KB, gzip ~12KB)  ← 앱 코드
└── assets/react-*.js         (~141KB, gzip ~45KB) ← React 청크
```

총 번들 크기: **~193KB raw / ~61KB gzip**
