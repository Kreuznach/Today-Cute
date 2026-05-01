import type { CuteCollection } from '../types';
import { characters } from '../data/characters';

interface CharacterCollectionProps {
  collection: CuteCollection;
}

export function CharacterCollection({ collection }: CharacterCollectionProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {characters.map((character) => {
        const obtained = collection.characterKeys.includes(character.characterKey);
        return (
          <div
            key={character.characterKey}
            className={`
              relative rounded-2xl p-3 flex flex-col items-center gap-1.5 border
              transition-all
              ${obtained
                ? 'bg-white border-cute-border shadow-sm'
                : 'bg-cute-soft border-transparent opacity-60'
              }
            `}
          >
            {/* 이모지 */}
            <div
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
                ${obtained ? '' : 'grayscale blur-[1px]'}
              `}
              style={{
                background: obtained
                  ? `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})`
                  : '#E5E8EB',
              }}
            >
              {obtained ? character.emoji : '❓'}
            </div>

            {/* 이름 */}
            <p className={`text-xs font-medium text-center leading-tight ${obtained ? 'text-cute-text' : 'text-cute-subtext'}`}>
              {obtained ? character.characterName : '???'}
            </p>

            {/* 획득 뱃지 */}
            {obtained && (
              <span className="absolute top-1.5 right-1.5 text-xs text-green-400">✓</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
