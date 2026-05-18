import { DrawBox } from '../components/DrawBox';
import type { Screen } from '../types';

interface DrawScreenProps {
  isDrawing: boolean;
  isRedraw?: boolean;
  onDraw: () => void;
  goTo: (screen: Screen) => void;
}

export function DrawScreen({ isDrawing, isRedraw, onDraw, goTo }: DrawScreenProps) {
  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center px-4 pt-4 pb-3">
        <button
          onClick={() => goTo('home')}
          className="btn-ghost -ml-2 mr-2"
          disabled={isDrawing}
        >
          ← 뒤로
        </button>
        <h2 className="text-base font-bold text-cute-text">
          {isRedraw ? '아직 더 운이 남았어요!' : '오늘의 카드 뽑기'}
        </h2>
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 px-4 flex flex-col pt-3">
        {/* 설명 */}
        <p className="text-sm text-cute-subtext pb-3">
          {isRedraw
            ? '새로운 카드를 뽑는 중이에요'
            : '카드팩을 탭해서 오늘의 응원 카드를 뽑아보세요'}
        </p>

        {/* 뽑기 박스 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <DrawBox isDrawing={isDrawing} onDraw={onDraw} />
        </div>

        {/* 안내 - 재뽑기 중에는 숨김 */}
        {!isRedraw && (
          <div className="bg-cute-soft rounded-2xl p-3 mb-6">
            <p className="text-xs text-cute-subtext text-center leading-relaxed">
              오늘 하루 한 번 카드를 뽑을 수 있어요.<br />
              결과 확인 후 광고를 보면 한 번 더 뽑을 수 있어요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
