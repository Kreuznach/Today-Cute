import type { CuteHistoryItem } from '../types';
import { addDaysKst, formatWeekdayKr, getTodayKst } from './date';

export interface WeekStamp {
  dateKst: string;
  weekday: string;
  drawn: boolean;
  isToday: boolean;
}

/** 오늘 포함 최근 7일 도장 (왼쪽이 과거, 오른쪽이 오늘) */
export function getWeekStamps(history: CuteHistoryItem[], todayKst = getTodayKst()): WeekStamp[] {
  const drawn = new Set(history.map((item) => item.dateKst));
  return Array.from({ length: 7 }, (_, index) => {
    const dateKst = addDaysKst(todayKst, index - 6);
    return {
      dateKst,
      weekday: formatWeekdayKr(dateKst),
      drawn: drawn.has(dateKst),
      isToday: dateKst === todayKst,
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

const WEEKDAY_GREETINGS = [
  '일요일은 말랑하게, 천천히',
  '월요일도 작게 시작해봐요',
  '화요일, 오늘의 응원이 도착했어요',
  '수요일은 중간쯤, 숨 고르기',
  '목요일, 조금만 더 포근하게',
  '금요일의 작은 반짝임을 챙겨요',
  '토요일은 느긋해도 괜찮아요',
] as const;

export function getTodayGreeting(todayKst = getTodayKst()): string {
  const [year, month, day] = todayKst.split('-').map(Number);
  const weekday = new Date(year, month - 1, day).getDay();
  return WEEKDAY_GREETINGS[weekday];
}
