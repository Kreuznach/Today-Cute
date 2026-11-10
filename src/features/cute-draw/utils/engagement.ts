import type { CuteHistoryItem } from '../types';
import { characters } from '../data/characters';
import { tomorrowTeasers, weekdayFriends } from '../data/funContent';
import { addDaysKst, formatWeekdayKr, getTodayKst } from './date';

export interface WeekStamp {
  dateKst: string;
  weekday: string;
  drawn: boolean;
  isToday: boolean;
  characterKey: string | null;
  emoji: string | null;
}

/** 오늘 포함 최근 7일 도장 (왼쪽이 과거, 오른쪽이 오늘). 뽑은 날은 그날의 친구가 도장이 된다 */
export function getWeekStamps(history: CuteHistoryItem[], todayKst = getTodayKst()): WeekStamp[] {
  const byDate = new Map(history.map((item) => [item.dateKst, item.card.characterKey]));
  return Array.from({ length: 7 }, (_, index) => {
    const dateKst = addDaysKst(todayKst, index - 6);
    const characterKey = byDate.get(dateKst) ?? null;
    return {
      dateKst,
      weekday: formatWeekdayKr(dateKst),
      drawn: characterKey !== null,
      isToday: dateKst === todayKst,
      characterKey,
      emoji: characters.find((c) => c.characterKey === characterKey)?.emoji ?? null,
    };
  });
}

/**
 * 연속 방문 일수.
 * 오늘 기록이 있으면 오늘부터, 없으면 어제부터 거꾸로 센다.
 */
export function getDrawStreak(history: CuteHistoryItem[], todayKst = getTodayKst()): number {
  const drawn = new Set(history.map((item) => item.dateKst));
  let cursor = drawn.has(todayKst) ? todayKst : addDaysKst(todayKst, -1);
  let streak = 0;

  while (drawn.has(cursor)) {
    streak += 1;
    cursor = addDaysKst(cursor, -1);
  }

  return streak;
}

/** 오늘 요일을 맡은 친구와 인사말 */
export function getWeekdayFriend(todayKst = getTodayKst()) {
  const [year, month, day] = todayKst.split('-').map(Number);
  return weekdayFriends[new Date(year, month - 1, day).getDay()];
}

export function getTodayGreeting(todayKst = getTodayKst()): string {
  return getWeekdayFriend(todayKst).text;
}

/** KST 기준 현재 시(0~23)와 월(1~12) */
export function getKstClock(): { hour: number; month: number } {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return { hour: kst.getUTCHours(), month: kst.getUTCMonth() + 1 };
}

/** 날짜마다 하나씩 고정되는 내일 예고 문구 (하루 동안은 바뀌지 않음) */
export function getTomorrowTeaser(metCount: number, total: number, todayKst = getTodayKst()): string {
  const seed = Number(todayKst.replace(/-/g, ''));
  const text = tomorrowTeasers[seed % tomorrowTeasers.length];
  return text.replace('{n}', String(Math.max(total - metCount, 0)));
}
