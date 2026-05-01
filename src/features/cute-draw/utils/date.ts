/**
 * KST(UTC+9) 기준 오늘 날짜 문자열 반환
 * 형식: 'YYYY-MM-DD'
 */
export function getTodayKst(): string {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(now.getTime() + kstOffset);
  return kstDate.toISOString().slice(0, 10);
}

/**
 * dateKst가 오늘 KST 날짜인지 확인
 */
export function isToday(dateKst: string): boolean {
  return dateKst === getTodayKst();
}

/**
 * 'YYYY-MM-DD' 형식의 날짜를 한국어로 포맷
 */
export function formatDateKr(dateKst: string): string {
  const [year, month, day] = dateKst.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return `${month}월 ${day}일 (${weekdays[date.getDay()]})`;
}

/**
 * 최근 N일 날짜 목록 반환 (KST 기준, 오늘 포함)
 */
export function getRecentDates(days: number): string[] {
  const dates: string[] = [];
  const kstOffset = 9 * 60 * 60 * 1000;
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() + kstOffset - i * 24 * 60 * 60 * 1000);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}
