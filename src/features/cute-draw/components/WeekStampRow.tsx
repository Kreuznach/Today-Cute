import type { WeekStamp } from '../utils/engagement';

interface WeekStampRowProps {
  stamps: WeekStamp[];
}

export function WeekStampRow({ stamps }: WeekStampRowProps) {
  return (
    <div className="bg-white rounded-2xl border border-cute-border px-3 py-3">
      <p className="text-xs text-cute-subtext mb-2">이번 주 말랑 도장</p>
      <div className="grid grid-cols-7 gap-1">
        {stamps.map((stamp) => (
          <div key={stamp.dateKst} className="flex flex-col items-center gap-1">
            <span className={`text-[10px] ${stamp.isToday ? 'text-cute-primary font-semibold' : 'text-cute-subtext'}`}>
              {stamp.weekday}
            </span>
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${stamp.drawn
                  ? 'bg-cute-primary text-white'
                  : stamp.isToday
                    ? 'border-2 border-dashed border-cute-primary/50 bg-cute-soft'
                    : 'bg-cute-soft text-cute-subtext/50'
                }
              `}
            >
              {stamp.drawn ? '♡' : stamp.isToday ? '·' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
