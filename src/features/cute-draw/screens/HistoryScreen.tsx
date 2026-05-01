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
      <div className="px-5 pt-5 pb-4">
        <button onClick={() => goTo('home')} className="btn-ghost -ml-2 mb-3">
          ← 홈으로
        </button>
        <h2 className="text-lg font-bold text-cute-text">최근 기록</h2>
        <p className="text-xs text-cute-subtext mt-0.5">최근 7일간의 카드 기록이에요</p>
      </div>

      {/* 목록 */}
      <div className="flex-1 px-5 overflow-y-auto pb-6">
        <HistoryList history={history} />
      </div>
    </div>
  );
}
