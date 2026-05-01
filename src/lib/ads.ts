/**
 * 광고 추상화 레이어
 *
 * 개발/테스트 환경: mockAdMode=true → 1.5초 딜레이 후 성공 시뮬레이션
 * 실제 환경: Apps in Toss 광고 SDK로 교체
 *
 * 실제 연동 시:
 * - loadAppsInTossAdMob(adGroupId) 호출로 사전 로드
 * - showAppsInTossAdMob() 호출로 노출
 * - 광고 그룹 ID는 src/lib/ads.ts 상단 AD_GROUP_ID 상수에 설정
 */

// TODO: Apps in Toss 콘솔에서 발급받은 광고 그룹 ID를 아래에 입력하세요
const AD_GROUP_ID = 'YOUR_AD_GROUP_ID_HERE';

const mockAdMode = import.meta.env.DEV || AD_GROUP_ID === 'YOUR_AD_GROUP_ID_HERE';

export type AdResult = 'success' | 'failed' | 'cancelled';

let adLoaded = false;

/**
 * 광고 사전 로드
 * 결과 화면 진입 시 미리 호출해 두면 재뽑기 버튼 클릭 시 빠르게 노출됩니다.
 */
export async function loadAd(): Promise<void> {
  if (mockAdMode) {
    // mock: 즉시 로드 완료 처리
    adLoaded = true;
    return;
  }
  try {
    // 실제 연동 시 아래 코드를 사용하세요:
    // await window.AppsInToss?.loadAdMob?.(AD_GROUP_ID);
    adLoaded = true;
  } catch {
    adLoaded = false;
  }
}

/**
 * 광고 노출
 * 광고 시청 완료 시 'success', 실패 시 'failed', 취소 시 'cancelled' 반환
 */
export async function showAd(): Promise<AdResult> {
  if (mockAdMode) {
    return new Promise((resolve) => {
      // mock: 1.5초 후 성공
      setTimeout(() => {
        resolve('success');
      }, 1500);
    });
  }

  if (!adLoaded) {
    return 'failed';
  }

  try {
    // 실제 연동 시 아래 코드를 사용하세요:
    // const result = await window.AppsInToss?.showAdMob?.(AD_GROUP_ID);
    // if (result === 'completed') return 'success';
    // if (result === 'cancelled') return 'cancelled';
    // return 'failed';
    return 'success';
  } catch {
    return 'failed';
  }
}

export { AD_GROUP_ID };
