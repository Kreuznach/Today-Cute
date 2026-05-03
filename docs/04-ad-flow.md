# 광고 재뽑기 플로우

## 개요

광고 재뽑기는 하루 1회, 결과 화면에서만 제공됩니다.  
사용자가 첫 번째 카드를 확인한 후 광고를 시청하면 한 번 더 뽑을 수 있으며,  
두 번째 카드는 오늘의 최종 카드로 자동 저장됩니다.

## 광고 구성

| 타입 | 용도 | 광고 그룹 ID | 노출 위치 |
|------|------|-------------|-----------|
| 동영상 보상형 | 카드 재뽑기 | `ait.v2.live.be5532d27f574f4b` | 결과 화면 |
| 이미지 배너형 | 브랜드 노출 | `ait.v2.live.PENDING` *(발급 대기)* | 메인화면 하단 |

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
           광고 로딩 (mockAdMode: 1.5초 딜레이)
              │
              ├─ 광고 성공 → 새 카드 뽑기 → 최종 카드 화면 (자동 확정)
              │
              └─ 광고 실패/취소 → 결과 화면 유지 (기존 카드 유지)
```

## 배너 광고 플로우

```
홈 화면 진입
  │
  └─ showBannerAd() 호출 → AppsInToss SDK가 하단에 배너 렌더링
        │
        └─ 홈 화면 이탈 시 hideBannerAd() 호출
```

## 광고 구현 상세

### 현재: Mock 모드

`src/lib/ads.ts`에서 관리합니다.

```ts
// 개발 환경 또는 PENDING ID일 때 mock 모드 활성화
function isMockMode(adId: string): boolean {
  return import.meta.env.DEV || adId.includes('PENDING');
}

// 동영상 광고: 1.5초 후 자동 성공
if (isMockMode(REWARD_AD_ID)) {
  return new Promise(resolve => setTimeout(() => resolve('success'), 1500));
}

// 배너 광고: 개발 환경에서는 HTML 플레이스홀더로 표시 (HomeScreen.tsx)
```

### 실제 연동: Apps in Toss v2 API

**광고 그룹 ID 설정** (`src/lib/ads.ts`):
```ts
export const REWARD_AD_ID = 'ait.v2.live.be5532d27f574f4b'; // 동영상 보상형 (설정 완료)
export const BANNER_AD_ID = 'ait.v2.live.PENDING';           // 배너 (발급 후 교체)
```

**동영상 보상형 광고 연동:**
```ts
// 사전 로드
await window.AppsInToss?.loadAd?.(REWARD_AD_ID);

// 노출 (result: 'completed' | 'cancelled')
const result = await window.AppsInToss?.showAd?.(REWARD_AD_ID);
```

**배너 광고 연동:**
```ts
// 노출 (메인화면 하단)
await window.AppsInToss?.showBannerAd?.(BANNER_AD_ID, { position: 'bottom' });

// 숨김 (화면 이탈 시)
await window.AppsInToss?.hideBannerAd?.(BANNER_AD_ID);
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
