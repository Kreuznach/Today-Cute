import type { CuteCollection, Screen } from '../types';
import { CharacterCollection } from '../components/CharacterCollection';
import { characters } from '../data/characters';

interface CollectionScreenProps {
  collection: CuteCollection;
  goTo: (screen: Screen) => void;
}

export function CollectionScreen({ collection, goTo }: CollectionScreenProps) {
  const obtained = collection.characterKeys.length;
  const total = characters.length;

  return (
    <div className="screen flex flex-col">
      {/* 헤더 */}
      <div className="px-2 pt-3 pb-2">
        <button onClick={() => goTo('home')} className="btn-ghost -ml-2 mb-2">
          ← 홈으로
        </button>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-cute-text">컬렉션</h2>
            <p className="text-xs text-cute-subtext mt-0.5">카드를 뽑으면 캐릭터를 모을 수 있어요</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-cute-primary">{obtained}</p>
            <p className="text-xs text-cute-subtext">/ {total}종</p>
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div className="mt-2 h-2 bg-cute-soft rounded-full overflow-hidden">
          <div
            className="h-full bg-cute-primary rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (obtained / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 컬렉션 그리드 */}
      <div className="flex-1 px-2 overflow-y-auto pt-2 pb-3">
        <CharacterCollection collection={collection} />
      </div>
    </div>
  );
}
