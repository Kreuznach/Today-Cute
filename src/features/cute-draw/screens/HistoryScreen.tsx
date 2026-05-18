import type { CuteHistoryItem, Screen } from '../types';
import { HistoryList } from '../components/HistoryList';

interface HistoryScreenProps {
  history: CuteHistoryItem[];
  goTo: (screen: Screen) => void;
}

export function HistoryScreen({ history, goTo }: HistoryScreenProps) {
  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="px-4 pt-4 pb-3">
        <button onClick={() => goTo('home')} className="btn-ghost -ml-2 mb-2">
          ← 홈으로
        </button>
        <h2 className="text-lg font-bold text-cute-text">최근 기록</h2>
        <p className="text-xs text-cute-subtext mt-0.5">최근 7일간의 카드 기록이에요</p>
      </div>

      {/* 목록 */}
      <div className="flex-1 px-4 overflow-y-auto pt-3 pb-5">
        <HistoryList history={history} />
      </div>
    </div>
  );
}
