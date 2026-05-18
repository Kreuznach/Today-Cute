import { useState } from 'react';
import type { CuteHistoryItem } from '../types';
import { characters } from '../data/characters';
import { formatDateKr } from '../utils/date';
import { CuteCard } from './CuteCard';

interface HistoryListProps {
  history: CuteHistoryItem[];
}

export function HistoryList({ history }: HistoryListProps) {
  const [selectedItem, setSelectedItem] = useState<CuteHistoryItem | null>(null);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-cute-subtext">
        <span className="text-4xl">📭</span>
        <p className="text-sm">아직 뽑은 카드가 없어요</p>
        <p className="text-xs">오늘 첫 카드를 뽑아봐요!</p>
      </div>
    );
  }

  if (selectedItem) {
    const character = characters.find((c) => c.characterKey === selectedItem.card.characterKey);
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setSelectedItem(null)}
          className="flex items-center gap-1.5 text-cute-subtext text-sm mb-4 active:opacity-60"
        >
          ← 목록으로
        </button>
        <p className="text-xs text-cute-subtext mb-3">{formatDateKr(selectedItem.dateKst)}</p>
        <CuteCard card={selectedItem.card} size="lg" />
        {character && (
          <div className="mt-4 bg-white rounded-2xl p-4 border border-cute-border">
            <p className="text-xs text-cute-subtext mb-1">캐릭터 소개</p>
            <p className="text-sm text-cute-text">{character.baseMood}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {history.slice(0, 7).map((item) => {
        const character = characters.find((c) => c.characterKey === item.card.characterKey);
        return (
          <button
            key={item.dateKst}
            onClick={() => setSelectedItem(item)}
            className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-cute-border active:bg-cute-soft text-left w-full"
          >
            {/* 이모지 */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${character?.colorFrom ?? '#E8EAF6'}, ${character?.colorTo ?? '#C5CAE9'})`,
              }}
            >
              {character?.emoji ?? '⭐'}
            </div>
            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-cute-subtext mb-0.5">{formatDateKr(item.dateKst)}</p>
              <p className="text-lg font-semibold text-cute-text truncate">{item.card.characterName}</p>
              <p className="text-sm text-cute-subtext truncate">{item.card.moodTitle}</p>
            </div>
            <span className="text-cute-subtext text-xs flex-shrink-0">›</span>
          </button>
        );
      })}
    </div>
  );
}
