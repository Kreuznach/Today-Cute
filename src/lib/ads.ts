/**
 * 광고 추상화 레이어 — Apps in Toss v2.0.0+
 *
 * 광고 타입:
 *  - 'reward' : 동영상 보상형 광고 (카드 재뽑기)
 *  - 'banner' : 이미지 배너 광고 (메인화면 하단 노출)
 *
 * 개발/테스트: mockAdMode=true → 딜레이 후 성공 시뮬레이션
 * 실제 환경: window.AppsInToss v2 API 사용
 *
 * 실제 연동 API:
 *  - window.AppsInToss.loadAd(adGroupId)          → 사전 로드
 *  - window.AppsInToss.showAd(adGroupId)           → 동영상 광고 노출
 *  - window.AppsInToss.showBannerAd(adGroupId)     → 배너 광고 노출
 *  - window.AppsInToss.hideBannerAd(adGroupId)     → 배너 광고 숨김
 */

// ===== Apps in Toss v2 광고 그룹 ID =====

/** 동영상 보상형 광고 (카드 재뽑기) */
export const REWARD_AD_ID = 'ait.v2.live.be5532d27f574f4b';

/** 배너 광고 (메인화면 하단) — 콘솔 발급 후 교체 */
export const BANNER_AD_ID = 'ait.v2.live.77ed12df738d4d5f';

// ===== Apps in Toss v2 window 인터페이스 선언 =====
declare global {
  interface Window {
    AppsInToss?: {
      /** 광고 사전 로드 (동영상/배너 공통) */
      loadAd?: (adGroupId: string) => Promise<void>;
      /** 동영상 보상형 광고 노출 → 'completed' | 'cancelled' */
      showAd?: (adGroupId: string) => Promise<'completed' | 'cancelled'>;
      /** 배너 광고 노출 */
      showBannerAd?: (adGroupId: string, options?: { position?: 'bottom' | 'top' }) => Promise<void>;
      /** 배너 광고 숨김 */
      hideBannerAd?: (adGroupId: string) => Promise<void>;
    };
  }
}

// ===== 타입 =====
export type AdResult = 'success' | 'failed' | 'cancelled';

/** 광고 ID별 로드 상태 맵 */
const adLoadedMap: Record<string, boolean> = {};

function isMockMode(adId: string): boolean {
  return import.meta.env.DEV || adId.includes('PENDING') || adId === 'YOUR_AD_GROUP_ID_HERE';
}

// ===== 공통 광고 로드 =====

/**
 * 광고 사전 로드 (adId 지정)
 * 결과 화면 진입 시 미리 호출해 두면 광고 클릭 시 빠르게 노출됩니다.
 */
export async function loadAd(adId: string): Promise<void> {
  if (isMockMode(adId)) {
    adLoadedMap[adId] = true;
    return;
  }
  try {
    await window.AppsInToss?.loadAd?.(adId);
    adLoadedMap[adId] = true;
  } catch {
    adLoadedMap[adId] = false;
  }
}

// ===== 동영상 보상형 광고 (카드 재뽑기) =====

/** 동영상 보상형 광고 사전 로드 */
export async function loadRewardAd(): Promise<void> {
  return loadAd(REWARD_AD_ID);
}

/**
 * 동영상 보상형 광고 노출
 * 시청 완료: 'success' / 취소: 'cancelled' / 실패: 'failed'
 */
export async function showRewardAd(): Promise<AdResult> {
  if (isMockMode(REWARD_AD_ID)) {
    return new Promise((resolve) => {
      setTimeout(() => resolve('success'), 1500);
    });
  }
  if (!adLoadedMap[REWARD_AD_ID]) return 'failed';
  try {
    const result = await window.AppsInToss?.showAd?.(REWARD_AD_ID);
    if (result === 'completed') return 'success';
    if (result === 'cancelled') return 'cancelled';
    return 'failed';
  } catch {
    return 'failed';
  }
}

// ===== 배너 광고 (메인화면 하단) =====

/** 배너 광고 노출 */
export async function showBannerAd(): Promise<void> {
  if (isMockMode(BANNER_AD_ID)) return; // 개발 환경: 시각적 플레이스홀더 사용
  try {
    await window.AppsInToss?.showBannerAd?.(BANNER_AD_ID, { position: 'bottom' });
  } catch {
    // 배너 실패는 앱 동작에 영향 없음
  }
}

/** 배너 광고 숨김 */
export async function hideBannerAd(): Promise<void> {
  if (isMockMode(BANNER_AD_ID)) return;
  try {
    await window.AppsInToss?.hideBannerAd?.(BANNER_AD_ID);
  } catch {
    // 무시
  }
}
