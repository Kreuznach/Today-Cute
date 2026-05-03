# 광고 재뽑기 플로우

## 개요

광고 재뽑기는 하루 1회, 결과 화면에서만 제공됩니다.  
사용자가 첫 번째 카드를 확인한 후 광고를 시청하면 한 번 더 뽑을 수 있으며,  
두 번째 카드는 오늘의 최종 카드로 자동 저장됩니다.

## 광고 구성

| 타입 | 용도 | 광고 그룹 ID | 노출 위치 |
|------|------|-------------|-----------|
| 동영상 보상형 | 카드 재뽑기 | `ait.v2.live.be5532d27f574f4b` | 결과 화면 |

> 배너 광고는 현재 미구현 상태입니다. TossAd DOM API 연동이 필요하며, 향후 v0.3.0 범위에서 추가 예정입니다.

## 플로우 다이어그램

```
결과 화면
  │
  ├─ [오늘 카드 확정하기] → 최종 카드 화면 (firstCard 확정)
  │
  └─ [광고 보고 한 번 더 뽑기] (usedRedraw=false일 때만 표시)
        │
        ▼
     안내 모달 표시
     - 광고 시청 후 오늘 카드를 한 번 더 뽑을 수 있어요.
     - 두 번째 카드는 오늘의 최종 카드로 저장돼요.
     - 재뽑기는 하루 1회만 가능해요.
        │
        ├─ [취소] → 결과 화면 유지 (기존 카드 유지)
        │
        └─ [광고 보고 뽑기]
              │
              ▼
           광고 로딩 (개발 환경: 1.5초 딜레이 시뮬레이션)
              │
              ├─ 광고 성공 → 새 카드 뽑기 → 최종 카드 화면 (자동 확정)
              │
              └─ 광고 실패/취소 → 결과 화면 유지 (기존 카드 유지)
```

## 배너 광고 플로우

> 현재 미구현. 향후 TossAd DOM API 연동 시 추가 예정.

## 광고 구현 상세

### 현재: GoogleAdMob API (v0.2.0 기준)

`src/lib/ads.ts`에서 `@apps-in-toss/web-framework`의 `GoogleAdMob` API를 사용합니다.

```ts
import { GoogleAdMob } from '@apps-in-toss/web-framework';

// AIT 환경 여부 확인
const isSupported = GoogleAdMob.loadAppsInTossAdMob.isSupported();

// 광고 사전 로드 (이벤트 기반)
const cleanup = GoogleAdMob.loadAppsInTossAdMob({
  options: { adGroupId: 'ait.v2.live.be5532d27f574f4b' },
  onEvent: (event) => { if (event.type === 'loaded') { cleanup(); resolve(); } },
  onError: () => { cleanup(); resolve(); },
});

// 광고 노출 (이벤트 기반)
GoogleAdMob.showAppsInTossAdMob({
  options: { adGroupId: 'ait.v2.live.be5532d27f574f4b' },
  onEvent: (event) => {
    if (event.type === 'userEarnedReward') rewarded = true;
    if (event.type === 'dismissed') resolve(rewarded ? 'success' : 'cancelled');
    if (event.type === 'failedToShow') resolve('failed');
  },
  onError: () => resolve('failed'),
});
```

**개발 환경 (AIT 미지원 시):** `isAitSupported() === false`이면 1.5초 딜레이 후 자동 `'success'` 반환으로 시뮬레이션.

**테스트 광고 ID:** `'ait-ad-test-rewarded-id'` — 개발 환경 또는 `VITE_AD_ENV=test` 시 자동 적용.

**광고 그룹 ID 설정** (`src/lib/ads.ts`):
```ts
export const REWARD_AD_ID = 'ait.v2.live.be5532d27f574f4b'; // 동영상 보상형 (설정 완료)
```

## 금지 문구

재뽑기 관련 문구에서 절대 사용하지 않을 표현:

| 금지 | 대체 |
|------|------|
| 더 좋은 카드 받기 | 오늘 카드 다시 뽑기 |
| 희귀 확률 업 | (사용 안 함) |
| 행운 강화 | (사용 안 함) |
| 꽝 피하기 | (사용 안 함) |
| 대박 카드 | (사용 안 함) |
| 운세 바꾸기 | (사용 안 함) |
