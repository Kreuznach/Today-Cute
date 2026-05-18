interface DrawBoxProps {
  isDrawing: boolean;
  onDraw: () => void;
}

export function DrawBox({ isDrawing, onDraw }: DrawBoxProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* 카드팩 박스 */}
      <div className="relative">
        <div
          className={`
            w-64 h-80 rounded-3xl flex items-center justify-center
            bg-gradient-to-br from-cute-primary to-blue-400
            shadow-xl cursor-pointer select-none
            transition-all duration-200
            ${isDrawing ? 'animate-shake' : 'active:scale-95 hover:scale-105'}
          `}
          onClick={!isDrawing ? onDraw : undefined}
        >
          {/* 카드팩 장식 */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/10 -translate-x-8 -translate-y-8" />
            <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white/10 translate-x-6 translate-y-6" />
          </div>
          <div className="relative flex flex-col items-center gap-2">
            <span className="text-6xl">{isDrawing ? '✨' : '🎁'}</span>
            <span className="text-white font-bold text-sm tracking-wide">
              {isDrawing ? '뽑는 중...' : '탭해서 뽑기'}
            </span>
          </div>
        </div>

        {/* 반짝이 효과 */}
        {!isDrawing && (
          <>
            <span className="absolute -top-2 -right-2 text-yellow-300 text-lg animate-bounce">✦</span>
            <span className="absolute -bottom-1 -left-3 text-yellow-200 text-sm animate-bounce" style={{ animationDelay: '0.3s' }}>✦</span>
          </>
        )}
      </div>

      {/* 로딩 인디케이터 */}
      {isDrawing && (
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-cute-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
