import { characters } from '../data/characters';
import { formatDateKr } from '../utils/date';
import type { CuteTodayRecord, Screen } from '../types';

interface HomeScreenProps {
  todayRecord: CuteTodayRecord | null;
  goTo: (screen: Screen) => void;
  onStartDraw: () => void;
}

export function HomeScreen({ todayRecord, goTo, onStartDraw }: HomeScreenProps) {
  const finalCard = todayRecord?.finalCard ?? (todayRecord?.finalized ? todayRecord.firstCard : null);
  const character = finalCard
    ? characters.find((c) => c.characterKey === finalCard.characterKey)
    : null;

  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-xl font-bold text-cute-text">오늘의 귀여운 뽑기</h1>
        <p className="text-sm text-cute-subtext mt-0.5">하루 한 번, 오늘의 응원 카드를 뽑아보세요</p>
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 px-5 flex flex-col gap-4 pt-4">
        {/* 오늘 카드 상태 카드 */}
        <div
          className="rounded-3xl p-5 overflow-hidden relative"
          style={character
            ? { background: `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})` }
            : { background: 'linear-gradient(135deg, #3182F6, #60A5FA)' }
          }
        >
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 translate-x-8 -translate-y-8" />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -translate-x-6 translate-y-6" />

          <div className="relative">
            {finalCard && character ? (
              <>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">{character.emoji}</span>
                  <div>
                    <p className="text-white/70 text-xs mb-0.5">{formatDateKr(todayRecord!.dateKst)} 오늘의 카드</p>
                    <p className="text-white font-bold text-base">{finalCard.characterName}</p>
                    <p className="text-white/80 text-sm">{finalCard.moodTitle}</p>
                  </div>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">{finalCard.message.slice(0, 50)}...</p>
              </>
            ) : (
              <>
                <p className="text-white/70 text-xs mb-2">오늘의 카드</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🎁</span>
                  <div>
                    <p className="text-white font-bold text-base">아직 카드를 뽑지 않았어요</p>
                    <p className="text-white/70 text-sm">지금 바로 뽑아봐요!</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 뽑기 버튼 */}
        {!todayRecord?.finalized ? (
          <button
            onClick={onStartDraw}
            className="btn-primary"
          >
            {todayRecord ? '오늘 카드 보기' : '오늘 카드 뽑기'}
          </button>
        ) : (
          <button
            onClick={() => goTo('final')}
            className="btn-primary"
          >
            오늘 카드 보기
          </button>
        )}

        {/* 하단 메뉴 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => goTo('history')}
            className="flex flex-col items-start gap-2 bg-white rounded-2xl p-4 border border-cute-border active:bg-cute-soft"
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-sm font-semibold text-cute-text">최근 기록</p>
              <p className="text-xs text-cute-subtext">7일간의 카드</p>
            </div>
          </button>
          <button
            onClick={() => goTo('collection')}
            className="flex flex-col items-start gap-2 bg-white rounded-2xl p-4 border border-cute-border active:bg-cute-soft"
          >
            <span className="text-2xl">🗂️</span>
            <div>
              <p className="text-sm font-semibold text-cute-text">컬렉션</p>
              <p className="text-xs text-cute-subtext">12종 캐릭터</p>
            </div>
          </button>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-6" />
    </div>
  );
}
