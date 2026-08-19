import type { CuteTodayRecord, Screen } from '../types';
import { CuteCard } from '../components/CuteCard';
import { formatDateKr } from '../utils/date';

interface FinalCardScreenProps {
  todayRecord: CuteTodayRecord | null;
  goTo: (screen: Screen) => void;
}

export function FinalCardScreen({ todayRecord, goTo }: FinalCardScreenProps) {
  if (!todayRecord) {
    return (
      <div className="screen flex flex-col items-center justify-center">
        <p className="text-cute-subtext text-sm">카드 정보를 불러올 수 없어요</p>
        <button onClick={() => goTo('home')} className="mt-4 btn-ghost">홈으로</button>
      </div>
    );
  }

  const finalCard = todayRecord.finalCard ?? todayRecord.firstCard;

  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="px-4 pt-4 pb-2">
        <button onClick={() => goTo('home')} className="btn-ghost -ml-2 mb-2">
          ← 홈으로
        </button>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-cute-text">오늘의 최종 카드</span>
          {todayRecord.usedRedraw && (
            <span className="text-xs bg-cute-primary/10 text-cute-primary px-2 py-0.5 rounded-full">
              재뽑기
            </span>
          )}
        </div>
        <p className="text-xs text-cute-subtext mt-0.5">{formatDateKr(todayRecord.dateKst)}</p>
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 min-h-0 px-4 flex flex-col gap-3 pt-3 overflow-y-auto pb-3">
        <div className="animate-fade-in flex-1 min-h-0">
          <CuteCard card={finalCard} size="lg" fill />
        </div>

        {/* 내일 안내 */}
        <div className="bg-cute-soft rounded-2xl p-3">
          <p className="text-sm text-cute-subtext text-center leading-relaxed">
            🌙 내일 새로운 카드를 뽑을 수 있어요
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-4 pt-3 pb-5 flex flex-col gap-2">
        <button onClick={() => goTo('history')} className="btn-secondary">
          최근 7일 기록 보기
        </button>
        <button onClick={() => goTo('collection')} className="btn-secondary">
          컬렉션 보기
        </button>
      </div>
    </div>
  );
}
