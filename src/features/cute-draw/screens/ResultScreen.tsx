import type { CuteCardResult, CuteTodayRecord, Screen } from '../types';
import { CuteCard } from '../components/CuteCard';

interface ResultScreenProps {
  pendingCard: CuteCardResult | null;
  todayRecord: CuteTodayRecord | null;
  isAdLoading: boolean;
  showRedrawModal: boolean;
  goTo: (screen: Screen) => void;
  onFinalize: () => void;
  onRequestRedraw: () => void;
  onConfirmRedraw: () => void;
  onCancelRedraw: () => void;
}

export function ResultScreen({
  pendingCard,
  todayRecord,
  isAdLoading,
  showRedrawModal,
  goTo,
  onFinalize,
  onRequestRedraw,
  onConfirmRedraw,
  onCancelRedraw,
}: ResultScreenProps) {
  const card = pendingCard ?? todayRecord?.firstCard ?? null;
  const canRedraw = todayRecord ? !todayRecord.usedRedraw : false;

  // 결과 화면 진입 시 광고 사전 로드는 useCuteDraw hook에서 처리됨

  if (!card) {
    return (
      <div className="screen flex flex-col items-center justify-center">
        <p className="text-cute-subtext">카드를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <>
      <div className="screen flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center px-4 pt-4 pb-3">
          <button onClick={() => goTo('home')} className="btn-ghost -ml-2">
            ← 홈으로
          </button>
        </div>
        {/* 메인 영역 */}
        <div className="flex-1 min-h-0 px-4 flex flex-col gap-3 pt-3 overflow-y-auto pb-3">
          <p className="text-xs text-cute-subtext shrink-0">오늘의 응원 카드가 도착했어요!</p>
          <div className="animate-slide-up flex-1 min-h-0">
            <CuteCard card={card} size="lg" animate fill />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="px-4 pt-3 pb-5 flex flex-col gap-2">
          <button onClick={onFinalize} className="btn-primary">
            {todayRecord?.finalized ? '최종 카드 확인하기' : '오늘 카드 확정하기'}
          </button>
          {canRedraw && (
            <button
              onClick={onRequestRedraw}
              disabled={isAdLoading}
              className="btn-secondary"
            >
              {isAdLoading ? '광고 준비 중...' : '광고 보고 한 번 더 뽑기'}
            </button>
          )}
        </div>
      </div>

      {/* 재뽑기 안내 모달 */}
      {showRedrawModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8 animate-slide-up">
            <div className="w-10 h-1 bg-cute-border rounded-full mx-auto mb-5" />
            <h3 className="text-base font-bold text-cute-text mb-2">오늘 카드 다시 뽑기</h3>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-cute-subtext">
                <span>•</span>
                <p>광고 시청 후 오늘 카드를 한 번 더 뽑을 수 있어요.</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-cute-subtext">
                <span>•</span>
                <p>두 번째 카드는 오늘의 최종 카드로 저장돼요.</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-cute-subtext">
                <span>•</span>
                <p>재뽑기는 하루 1회만 가능해요.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={onConfirmRedraw} className="btn-primary">
                광고 보고 뽑기
              </button>
              <button onClick={onCancelRedraw} className="btn-secondary">
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 광고 로딩 오버레이 */}
      {isAdLoading && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-6 text-center">
            <div className="flex gap-1.5 justify-center mb-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-cute-primary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-cute-subtext">광고를 불러오고 있어요...</p>
          </div>
        </div>
      )}
    </>
  );
}
