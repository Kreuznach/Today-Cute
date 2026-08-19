import type { CuteCardResult } from '../types';
import { characters } from '../data/characters';

interface CuteCardProps {
  card: CuteCardResult;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  fill?: boolean;
}

const rarityLabel: Record<CuteCardResult['rarity'], string> = {
  normal: '일반',
  special: '✨ 스페셜',
  seasonal: '🌸 시즌',
};

const rarityBadgeColor: Record<CuteCardResult['rarity'], string> = {
  normal: 'bg-gray-100 text-gray-500',
  special: 'bg-yellow-50 text-yellow-600',
  seasonal: 'bg-pink-50 text-pink-500',
};

export function CuteCard({ card, size = 'md', animate = false, fill = false }: CuteCardProps) {
  const character = characters.find((c) => c.characterKey === card.characterKey);
  const colorFrom = character?.colorFrom ?? '#E8EAF6';
  const colorTo = character?.colorTo ?? '#C5CAE9';
  const emoji = character?.emoji ?? '⭐';

  const sizeClasses = {
    sm: 'p-4 rounded-2xl',
    md: 'p-5 rounded-3xl',
    lg: 'p-7 rounded-3xl',
  };

  const emojiSizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${sizeClasses[size]}
        ${animate ? 'animate-pop' : ''}
        ${fill ? 'h-full min-h-0 flex flex-col' : ''}
        shadow-md
      `}
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
      }}
    >
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 bg-white transform translate-x-6 -translate-y-6" />
      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-20 bg-white transform -translate-x-4 translate-y-4" />

      {/* 희귀도 뱃지 */}
      {card.rarity !== 'normal' && (
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${rarityBadgeColor[card.rarity]}`}>
          {rarityLabel[card.rarity]}
        </span>
      )}

      {/* 이모지 */}
      <div className={`${emojiSizes[size]} ${size === 'lg' ? 'mb-4' : 'mb-3'} leading-none`}>{emoji}</div>

      {/* 캐릭터명 */}
      <p className="text-sm font-medium text-black/50 mb-1">{card.characterName}</p>

      {/* 무드 타이틀 */}
      <h3 className={`font-bold text-black/80 mb-3 leading-snug ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>
        {card.moodTitle}
      </h3>

      {size !== 'sm' && (
        <>
          {/* 응원 메시지 */}
          <p className={`text-black/60 leading-relaxed mb-4 ${fill ? 'flex-1' : ''} ${size === 'lg' ? 'text-base' : 'text-sm'}`}>{card.message}</p>

          {/* 오늘의 포인트 */}
          <div className="bg-white/40 rounded-xl p-3 mb-2">
            <p className="text-xs text-black/40 mb-0.5">오늘의 포인트</p>
            <p className="text-sm font-semibold text-black/70">{card.todayPoint}</p>
          </div>

          {/* 작은 행동 */}
          <div className="bg-white/40 rounded-xl p-3">
            <p className="text-xs text-black/40 mb-0.5">작은 행동</p>
            <p className="text-sm text-black/70">{card.smallAction}</p>
          </div>
        </>
      )}
    </div>
  );
}
