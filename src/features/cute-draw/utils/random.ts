import type { CuteCardResult } from '../types';
import { characters } from '../data/characters';

/**
 * 전체 카드 목록 반환
 */
function getAllCards(): CuteCardResult[] {
  return characters.flatMap((c) => c.cards);
}

/**
 * 무작위 카드 하나 뽑기
 */
export function drawRandomCard(): CuteCardResult {
  const allCards = getAllCards();
  const index = Math.floor(Math.random() * allCards.length);
  return allCards[index];
}

/**
 * 특정 카드를 제외한 무작위 카드 뽑기 (재뽑기용)
 */
export function drawRandomCardExcept(excludeCardId: string): CuteCardResult {
  const allCards = getAllCards().filter((c) => c.cardId !== excludeCardId);
  if (allCards.length === 0) return drawRandomCard();
  const index = Math.floor(Math.random() * allCards.length);
  return allCards[index];
}
