import type { CuteCollection } from '../types';
import { characters } from '../data/characters';
import { characterHints } from '../data/funContent';
import { CharacterAvatar } from './CharacterAvatar';

interface CharacterCollectionProps {
  collection: CuteCollection;
}

export function CharacterCollection({ collection }: CharacterCollectionProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
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
                : 'bg-cute-soft border-transparent'
              }
            `}
          >
            <div
              className={`
                w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                ${obtained ? '' : 'opacity-60'}
              `}
              style={{
                background: obtained
                  ? `linear-gradient(135deg, ${character.colorFrom}, ${character.colorTo})`
                  : '#E5E8EB',
              }}
            >
              {obtained
                ? <CharacterAvatar characterKey={character.characterKey} emoji={character.emoji} />
                : '❓'}
            </div>

            <p className={`text-xs font-medium text-center leading-tight ${obtained ? 'text-cute-text' : 'text-cute-subtext'}`}>
              {obtained ? character.characterName : '???'}
            </p>

            {/* 못 만난 친구는 힌트 한 줄 */}
            {!obtained && (
              <p className="text-[10px] text-cute-subtext text-center leading-tight line-clamp-3">
                {characterHints[character.characterKey]}
              </p>
            )}
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
