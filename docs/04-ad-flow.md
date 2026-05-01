# 광고 재뽑기 플로우

## 개요

광고 재뽑기는 하루 1회, 결과 화면에서만 제공됩니다.  
사용자가 첫 번째 카드를 확인한 후 광고를 시청하면 한 번 더 뽑을 수 있으며,  
두 번째 카드는 오늘의 최종 카드로 자동 저장됩니다.

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

## 광고 구현 상세

### 현재: Mock 모드

`src/lib/ads.ts`에서 관리합니다.

```ts
// 개발 환경에서는 1.5초 후 자동 성공
if (mockAdMode) {
  return new Promise(resolve => setTimeout(() => resolve('success'), 1500));
}
```

### 실제 연동: Apps in Toss 광고 SDK

1. **광고 그룹 ID 설정**  
   `src/lib/ads.ts` 상단의 `AD_GROUP_ID` 상수에 입력:
   ```ts
   const AD_GROUP_ID = 'YOUR_AD_GROUP_ID_HERE'; // ← 여기에 입력
   ```

2. **사전 로드 (Pre-load)**  
   결과 화면 진입 시 `loadAd()`를 호출해 광고를 미리 로드합니다.  
   (`useCuteDraw.ts`의 `confirmDraw()` 완료 시 자동 호출)

3. **광고 노출**  
   사용자가 확인 버튼 클릭 시 `showAd()`를 호출합니다.

4. **실제 SDK 교체 예시**:
   ```ts
   // loadAd
   await window.AppsInToss?.loadAdMob?.(AD_GROUP_ID);
   
   // showAd
   const result = await window.AppsInToss?.showAdMob?.(AD_GROUP_ID);
   // result: 'completed' | 'cancelled' | undefined
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
