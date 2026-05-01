import { DrawBox } from '../components/DrawBox';
import type { Screen } from '../types';

interface DrawScreenProps {
  isDrawing: boolean;
  onDraw: () => void;
  goTo: (screen: Screen) => void;
}

export function DrawScreen({ isDrawing, onDraw, goTo }: DrawScreenProps) {
  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center px-5 pt-5 pb-3">
        <button
          onClick={() => goTo('home')}
          className="btn-ghost -ml-2 mr-2"
          disabled={isDrawing}
        >
          ← 뒤로
        </button>
        <h2 className="text-base font-bold text-cute-text">오늘의 카드 뽑기</h2>
      </div>

      {/* 설명 */}
      <div className="px-5 pb-6">
        <p className="text-sm text-cute-subtext">
          카드팩을 탭해서 오늘의 응원 카드를 뽑아보세요
        </p>
      </div>

      {/* 뽑기 박스 */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <DrawBox isDrawing={isDrawing} onDraw={onDraw} />
      </div>

      {/* 안내 */}
      <div className="px-5 pb-8">
        <div className="bg-cute-soft rounded-2xl p-4">
          <p className="text-xs text-cute-subtext text-center leading-relaxed">
            오늘 하루 한 번 카드를 뽑을 수 있어요.<br />
            결과 확인 후 광고를 보면 한 번 더 뽑을 수 있어요.
          </p>
        </div>
      </div>
    </div>
  );
}
