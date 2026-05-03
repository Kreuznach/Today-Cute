import { GoogleAdMob } from '@apps-in-toss/web-framework';

/**
 * 광고 추상화 레이어 — Apps in Toss GoogleAdMob API
 *
 * 광고 타입:
 *  - 'reward' : 동영상 보상형 광고 (카드 재뽑기)
 *
 * 개발/미지원 환경: isSupported()=false → 1.5초 딜레이 후 성공 시뮬레이션
 * 실제 환경: GoogleAdMob.loadAppsInTossAdMob / showAppsInTossAdMob 사용
 *
 * 참고:
 *  - VITE_AD_ENV=test        → 공식 테스트 ID 강제 사용
 *  - VITE_AD_ENV=production  → 프로덕션 ID 강제 사용
 *  - 미설정                  → DEV 빌드면 테스트 ID, 아니면 프로덕션 ID
 */

/** 동영상 보상형 광고 그룹 ID (Apps in Toss 콘솔에서 발급) */
export const REWARD_AD_ID = 'ait.v2.live.be5532d27f574f4b';

/** 공식 테스트 전용 광고 ID — 실제 ID로 테스트하면 정책 위반 */
const AD_ID_TEST = 'ait-ad-test-rewarded-id';

export type AdResult = 'success' | 'failed' | 'cancelled';

function getAdId(): string {
  const adEnv = import.meta.env.VITE_AD_ENV;
  if (adEnv === 'test') return AD_ID_TEST;
  if (adEnv === 'production') return REWARD_AD_ID;
  return import.meta.env.DEV ? AD_ID_TEST : REWARD_AD_ID;
}

function isAitSupported(): boolean {
  try {
    return GoogleAdMob.loadAppsInTossAdMob.isSupported() === true;
  } catch {
    return false;
  }
}

// ===== 동영상 보상형 광고 =====

/** 광고 사전 로드. 결과 화면 진입 시 호출해 시청 시 빠르게 노출합니다. */
export async function loadRewardAd(): Promise<void> {
  if (!isAitSupported()) return; // 미지원 환경: skip

  return new Promise<void>((resolve) => {
    const cleanup = GoogleAdMob.loadAppsInTossAdMob({
      options: { adGroupId: getAdId() },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          cleanup();
          resolve();
        }
      },
      onError: () => {
        cleanup();
        resolve(); // 로드 실패는 무시 (show 단계에서 처리)
      },
    });
  });
}

/**
 * 동영상 보상형 광고 노출
 * - 미지원/개발 환경: 1.5초 딜레이 후 'success'
 * - 지원 환경: 광고 노출 → userEarnedReward 수신 시 'success'
 */
export async function showRewardAd(): Promise<AdResult> {
  if (!isAitSupported()) {
    await new Promise<void>((r) => setTimeout(r, 1500));
    return 'success';
  }

  return new Promise<AdResult>((resolve) => {
    let rewarded = false;
    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId: getAdId() },
      onEvent: (event) => {
        if (event.type === 'userEarnedReward') rewarded = true;
        if (event.type === 'dismissed') resolve(rewarded ? 'success' : 'cancelled');
        if (event.type === 'failedToShow') resolve('failed');
      },
      onError: () => resolve('failed'),
    });
  });
}

// ===== 배너 광고 (stub) =====
// GoogleAdMob은 전면 보상형 광고 전용입니다.
// 배너는 TossAd DOM API가 필요하나 현재 미구현 상태이므로 stub 처리합니다.

export async function showBannerAd(): Promise<void> {}
export async function hideBannerAd(): Promise<void> {}