import type { CardRarity } from '../types';

/** 아직 못 만난 친구에게 보여주는 수수께끼 힌트 (확률과 무관) */
export const characterHints: Record<string, string> = {
  'sleepy-otter': '물 위에 누워서 낮잠 자는 걸 좋아해요',
  'picky-cat': '새침하지만 사실은 관심이 많아요',
  'hyper-hamster': '볼주머니에 간식을 가득 넣어요',
  'soft-chick': '노랗고 말랑말랑, 삐약 소리를 내요',
  'walk-dog': '"산책"이라는 말만 들어도 꼬리가 흔들려요',
  'lazy-turtle': '느리지만 끝까지 가요',
  'cloud-bunny': '귀가 길고 구름처럼 폭신해요',
  'sparkle-fox': '꼬리가 풍성하고 눈이 반짝여요',
  'shy-panda': '흰색과 검은색, 대나무를 좋아해요',
  'rascal-raccoon': '눈가에 가면을 쓴 장난꾸러기예요',
  'steady-bear': '꿀을 좋아하는 든든한 친구예요',
  'star-penguin': '날지는 못해도 뒤뚱뒤뚱 잘 걸어요',
  'pure-sheep': '온몸이 솜사탕 같은 털로 덮여 있어요',
  'ocean-octopus': '다리가 여덟 개! 바닷속 재주꾼이에요',
  'tiny-frog': '비 오는 날 폴짝폴짝 신이 나요',
  'sweet-koala': '나무를 꼭 껴안고 하루 종일 쉬어요',
  'dreamy-whale': '바다에서 가장 큰 몸으로 물을 뿜어요',
  'morning-bird': '아침마다 제일 먼저 노래해요',
  'wise-owl': '밤에 눈을 크게 뜨고 생각에 잠겨요',
  'brave-lion': '멋진 갈기를 가진 용감한 친구예요',
  'calm-elephant': '코가 길고 귀가 커다래요',
  'flower-butterfly': '꽃밭을 팔랑팔랑 날아다녀요',
  'mini-deer': '머리에 작은 뿔이 있고 숲에 살아요',
  'happy-pig': '분홍색 코로 킁킁, 늘 기분이 좋아요',
};

/** 요일 담당 친구 (0 = 일요일) */
export const weekdayFriends = [
  { characterKey: 'pure-sheep', emoji: '🐑', text: '일요일은 구름처럼 폭신하게 쉬는 날' },
  { characterKey: 'sleepy-otter', emoji: '🦦', text: '월요일이야. 하품 한 번 하고 천천히 시작하자' },
  { characterKey: 'hyper-hamster', emoji: '🐹', text: '화요일! 볼에 힘 빵빵하게 넣고 출발' },
  { characterKey: 'lazy-turtle', emoji: '🐢', text: '벌써 수요일. 절반이나 왔어, 쉬어 가자' },
  { characterKey: 'steady-bear', emoji: '🐻', text: '목요일엔 내가 뒤에서 든든하게 밀어 줄게' },
  { characterKey: 'sparkle-fox', emoji: '🦊', text: '금요일이다! 오늘은 꼬리가 반짝반짝' },
  { characterKey: 'walk-dog', emoji: '🐶', text: '토요일! 산책 가기 딱 좋은 날이야' },
] as const;

/** 시간대 인사 (KST 시각 기준) */
export function getTimeGreeting(hour: number): { emoji: string; text: string } {
  if (hour >= 5 && hour < 11) return { emoji: '🌤️', text: '좋은 아침! 오늘의 친구가 기다리고 있어요' };
  if (hour >= 11 && hour < 17) return { emoji: '🍙', text: '밥은 먹었어요? 잠깐 쉬었다 가요' };
  if (hour >= 17 && hour < 22) return { emoji: '🌇', text: '오늘 하루 수고했어요. 카드 한 장 어때요?' };
  return { emoji: '🌙', text: '아직 안 잤네요. 살금살금 한 장만 봐요' };
}

/** 계절 한 줄 (1~12월) */
export function getSeasonLine(month: number): { emoji: string; text: string } {
  if (month >= 3 && month <= 5) return { emoji: '🌸', text: '꽃잎이 날리는 날, 친구도 들떠 있어요' };
  if (month >= 6 && month <= 8) return { emoji: '🍉', text: '더운 날엔 수박처럼 시원한 응원' };
  if (month >= 9 && month <= 11) return { emoji: '🍂', text: '낙엽 밟는 소리처럼 바삭한 하루' };
  return { emoji: '⛄', text: '추운 날엔 따끈한 카드 한 장' };
}

/** 연속 방문 일수에 따라 자라는 새싹 (보상 없음, 그림만 바뀜) */
export function getGrowthStage(streak: number): { emoji: string; text: string } {
  if (streak >= 30) return { emoji: '🌳🐦', text: '나무에 새가 놀러 왔어요' };
  if (streak >= 14) return { emoji: '🌳', text: '어느새 작은 나무가 됐어요' };
  if (streak >= 7) return { emoji: '🌻', text: '일주일! 활짝 폈어요' };
  if (streak >= 5) return { emoji: '🌷', text: '꽃봉오리가 생겼어요' };
  if (streak >= 3) return { emoji: '☘️', text: '새싹이 기지개를 켜요' };
  if (streak === 2) return { emoji: '🌿', text: '잎이 두 장이 됐어요' };
  return { emoji: '🌱', text: '새싹이 뿅! 나왔어요' };
}

/** 하루 빠졌을 때도 혼내지 않는 문구 */
export const WELCOME_BACK = { emoji: '🌱', text: '다시 만나서 반가워요. 새싹은 또 자라요' } as const;

export const WEEK_COMPLETE_TEXT = '🎉 이번 주 친구 7명을 다 만났어요';

/** 상자를 여는 동안 보여주는 문구 */
export const boxMessages = [
  '📦 흔들흔들… 누가 들어 있을까?',
  '🐾 안에서 발소리가 들려요',
  '👀 상자 틈으로 누가 쳐다봐요',
  '🎀 리본을 살살 푸는 중이에요',
  '💤 쉿, 자고 있을지도 몰라요',
] as const;

export const REDRAW_TITLE = '한 번 더 만나러 가요!';
export const REDRAW_SUBTITLE = '새 친구가 오는 중이에요';

/** 내일 예고 문구. {n}은 아직 못 만난 친구 수 */
export const tomorrowTeasers = [
  '🌙 내일은 누가 찾아올까요?',
  '🚪 내일 아침, 새 친구가 문을 두드려요',
  '💌 내일 도착할 응원을 포장하는 중이에요',
  '🐾 아직 못 만난 친구가 {n}명 있어요',
  '😴 친구들은 자러 갔어요. 내일 또 만나요',
] as const;

export const rarityInfo: Record<CardRarity, { label: string; badge: string }> = {
  normal: { label: '🌼 매일 카드', badge: 'bg-white/60 text-black/50' },
  special: { label: '💫 속마음 카드', badge: 'bg-yellow-50 text-yellow-600' },
  seasonal: { label: '🍂 계절 카드', badge: 'bg-pink-50 text-pink-500' },
};

export const actionButtonText = { idle: '🤍 해 볼게요', done: '💛 해냈어요!' } as const;

export const compliments = [
  '👏 우와, 진짜 했네요!',
  '🫶 작은 일이 제일 대단해요',
  '🌟 오늘의 나, 조금 멋졌어요',
] as const;

export const emptyTexts = {
  history: { icon: '📖', title: '아직 빈 일기장이에요', sub: '첫 장을 채워 볼까요?' },
  collection: '🐾 발자국만 보여요. 누가 지나갔을까요?',
} as const;

export function pickRandom<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
