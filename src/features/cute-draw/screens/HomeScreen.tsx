import { useEffect, useMemo } from 'react';
import { characters } from '../data/characters';
import { formatDateKr } from '../utils/date';
import { getDrawStreak, getTodayGreeting, getWeekStamps } from '../utils/engagement';
import { WeekStampRow } from '../components/WeekStampRow';
import { showBannerAd, hideBannerAd } from '../../../lib/ads';
import type { CuteCollection, CuteHistoryItem, CuteTodayRecord, Screen } from '../types';

// 미니앱 마지막 업데이트 정보
const APP_UPDATE = {
  date: '2026.08.19',
  description: '풀하이트 레이아웃 · 연속 방문 · 주간 도장',
} as const;

interface HomeScreenProps {
  todayRecord: CuteTodayRecord | null;
  history: CuteHistoryItem[];
  collection: CuteCollection;
  goTo: (screen: Screen) => void;
  onStartDraw: () => void;
}

export function HomeScreen({ todayRecord, history, collection, goTo, onStartDraw }: HomeScreenProps) {
  const finalCard = todayRecord?.finalCard ?? (todayRecord?.finalized ? todayRecord.firstCard : null);
  const character = finalCard
    ? characters.find((c) => c.characterKey === finalCard.characterKey)
    : null;
  const greeting = useMemo(() => getTodayGreeting(), []);
  const stamps = useMemo(() => getWeekStamps(history), [history]);
  const streak = useMemo(() => getDrawStreak(history), [history]);
  const obtained = collection.characterKeys.length;
  const previewCharacters = characters.slice(0, 6);

  // 홈 화면 진입 시 배너 광고 노출, 이탈 시 숨김
  useEffect(() => {
    showBannerAd();
    return () => { hideBannerAd(); };
  }, []);

  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="px-4 pt-5 pb-2 shrink-0">
        <h1 className="text-xl font-bold text-cute-text">오늘의 귀여운 뽑기</h1>
        <p className="text-sm text-cute-subtext mt-0.5">{greeting}</p>
      </div>

      {/* 메인 영역 — 남는 세로 공간을 카드/도장이 나눠 채움 */}
      <div className="flex-1 min-h-0 px-4 flex flex-col gap-3 pt-3 overflow-y-auto">
        {/* 오늘 카드 상태 카드 */}
        <div
          className="rounded-2xl p-5 overflow-hidden relative flex-1 min-h-[168px] flex flex-col justify-between"
          style={character
            ? { background: `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})` }
            : { background: 'linear-gradient(135deg, #3182F6, #60A5FA)' }
          }
        >
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/10 translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -translate-x-6 translate-y-6" />

          <div className="relative">
            {finalCard && character ? (
              <>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-5xl leading-none">{character.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-white/70 text-xs mb-0.5">{formatDateKr(todayRecord!.dateKst)} 오늘의 카드</p>
                    <p className="text-white font-bold text-lg">{finalCard.characterName}</p>
                    <p className="text-white/80 text-sm">{finalCard.moodTitle}</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{finalCard.message}</p>
              </>
            ) : (
              <>
                <p className="text-white/70 text-xs mb-3">오늘의 카드</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl leading-none">🎁</span>
                  <div>
                    <p className="text-white font-bold text-lg">아직 카드를 뽑지 않았어요</p>
                    <p className="text-white/80 text-sm mt-1">하루 한 장의 응원이 기다리고 있어요</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {streak > 0 && (
            <p className="relative text-white/80 text-xs mt-4">
              연속 {streak}일째 카드를 받았어요
            </p>
          )}
        </div>

        <WeekStampRow stamps={stamps} />

        {/* 뽑기 버튼 */}
        {!todayRecord?.finalized ? (
          <button
            onClick={onStartDraw}
            className="btn-primary shrink-0"
          >
            {todayRecord ? '오늘 카드 보기' : '오늘 카드 뽑기'}
          </button>
        ) : (
          <button
            onClick={() => goTo('final')}
            className="btn-primary shrink-0"
          >
            오늘 카드 보기
          </button>
        )}

        {/* 하단 메뉴 */}
        <div className="grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={() => goTo('history')}
            className="flex flex-col items-start gap-1.5 bg-white rounded-2xl p-3 border border-cute-border active:bg-cute-soft"
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-sm font-semibold text-cute-text">최근 기록</p>
              <p className="text-xs text-cute-subtext">7일간의 카드</p>
            </div>
          </button>
          <button
            onClick={() => goTo('collection')}
            className="flex flex-col items-start gap-1.5 bg-white rounded-2xl p-3 border border-cute-border active:bg-cute-soft text-left"
          >
            <span className="text-2xl">🗂️</span>
            <div>
              <p className="text-sm font-semibold text-cute-text">컬렉션</p>
              <p className="text-xs text-cute-subtext">{obtained}/{characters.length}종 모으는 중</p>
            </div>
          </button>
        </div>

        {/* 컬렉션 미리보기 — 미획득 호기심 유발 */}
        <button
          onClick={() => goTo('collection')}
          className="shrink-0 bg-white rounded-2xl border border-cute-border px-3 py-2.5 active:bg-cute-soft text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-cute-subtext">다음에 만날 친구들</p>
            <p className="text-[11px] text-cute-primary font-medium">도감 보기 ›</p>
          </div>
          <div className="flex gap-2">
            {previewCharacters.map((item) => {
              const unlocked = collection.characterKeys.includes(item.characterKey);
              return (
                <div
                  key={item.characterKey}
                  className="flex-1 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: unlocked
                      ? `linear-gradient(135deg, ${item.colorFrom}, ${item.colorTo})`
                      : '#F2F4F6',
                  }}
                >
                  <span className={unlocked ? '' : 'grayscale opacity-50'}>
                    {unlocked ? item.emoji : '❓'}
                  </span>
                </div>
              );
            })}
          </div>
        </button>

        {/* 앱 마지막 업데이트 */}
        <div className="px-0.5 pb-1 shrink-0">
          <p className="text-[11px] text-cute-subtext/60">
            Last Update: {APP_UPDATE.date} · {APP_UPDATE.description}
          </p>
        </div>
      </div>

      {/* 하단 배너 광고 영역 (개발 환경: 플레이스홀더, 실제: AppsInToss SDK가 처리) */}
      {import.meta.env.DEV && (
        <div className="px-4 pb-safe">
          <div className="h-14 bg-cute-soft border border-dashed border-cute-border rounded-xl flex items-center justify-center">
            {/* <p className="text-xs text-cute-subtext">배너 광고 영역 (BANNER_AD_ID 발급 후 활성화)</p> */}
          </div>
        </div>
      )}
    </div>
  );
}
