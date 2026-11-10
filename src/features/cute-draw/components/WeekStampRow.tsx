import type { WeekStamp } from '../utils/engagement';
import { WEEK_COMPLETE_TEXT } from '../data/funContent';
import { CharacterAvatar } from './CharacterAvatar';

interface WeekStampRowProps {
  stamps: WeekStamp[];
}

export function WeekStampRow({ stamps }: WeekStampRowProps) {
  const complete = stamps.every((stamp) => stamp.drawn);

  return (
    <div className="bg-white rounded-2xl border border-cute-border px-3 py-3">
      <p className="text-xs text-cute-subtext mb-2">
        {complete ? WEEK_COMPLETE_TEXT : '이번 주 만난 친구들 🐾'}
      </p>
      <div className="grid grid-cols-7 gap-1">
        {stamps.map((stamp) => (
          <div key={stamp.dateKst} className="flex flex-col items-center gap-1">
            <span className={`text-[10px] ${stamp.isToday ? 'text-cute-primary font-semibold' : 'text-cute-subtext'}`}>
              {stamp.weekday}
            </span>
            <div
              className={`
                w-9 h-9 rounded-full flex items-center justify-center text-lg
                ${stamp.drawn
                  ? 'bg-cute-primary/10'
                  : stamp.isToday
                    ? 'border-2 border-dashed border-cute-primary/50 bg-cute-soft'
                    : 'bg-cute-soft text-cute-subtext/50'
                }
              `}
            >
              {stamp.drawn && stamp.characterKey && stamp.emoji ? (
                <CharacterAvatar characterKey={stamp.characterKey} emoji={stamp.emoji} />
              ) : stamp.isToday ? (
                <span className="animate-bounce-slow">🎁</span>
              ) : (
                <span className="text-sm">·</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
