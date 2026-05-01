import type {
  CuteTodayRecord,
  CuteHistoryItem,
  CuteCollection,
  CuteCardResult,
} from '../types';
import { getTodayKst } from '../utils/date';

const KEYS = {
  TODAY: 'cute_today_record',
  HISTORY: 'cute_history',
  COLLECTION: 'cute_collection',
} as const;

// ===== 오늘 기록 =====

export function getTodayRecord(): CuteTodayRecord | null {
  try {
    const raw = localStorage.getItem(KEYS.TODAY);
    if (!raw) return null;
    const record = JSON.parse(raw) as CuteTodayRecord;
    // KST 날짜가 오늘인 경우만 유효
    if (record.dateKst !== getTodayKst()) return null;
    return record;
  } catch {
    return null;
  }
}

export function saveTodayRecord(record: CuteTodayRecord): void {
  localStorage.setItem(KEYS.TODAY, JSON.stringify(record));
}

export function createTodayRecord(firstCard: CuteCardResult): CuteTodayRecord {
  const record: CuteTodayRecord = {
    dateKst: getTodayKst(),
    firstCard,
    finalCard: null,
    usedRedraw: false,
    finalized: false,
    createdAt: new Date().toISOString(),
    finalizedAt: null,
  };
  saveTodayRecord(record);
  return record;
}

export function finalizeTodayRecord(
  record: CuteTodayRecord,
  finalCard?: CuteCardResult,
): CuteTodayRecord {
  const updated: CuteTodayRecord = {
    ...record,
    finalCard: finalCard ?? record.firstCard,
    finalized: true,
    finalizedAt: new Date().toISOString(),
  };
  saveTodayRecord(updated);
  // 히스토리에도 추가
  addToHistory({
    dateKst: updated.dateKst,
    card: updated.finalCard!,
    finalized: true,
  });
  // 컬렉션 업데이트
  updateCollection(updated.finalCard!);
  return updated;
}

export function markRedrawUsed(
  record: CuteTodayRecord,
  newCard: CuteCardResult,
): CuteTodayRecord {
  const updated: CuteTodayRecord = {
    ...record,
    usedRedraw: true,
    finalCard: newCard,
    finalized: true,
    finalizedAt: new Date().toISOString(),
  };
  saveTodayRecord(updated);
  // 히스토리 추가
  addToHistory({
    dateKst: updated.dateKst,
    card: newCard,
    finalized: true,
  });
  // 컬렉션 업데이트
  updateCollection(newCard);
  return updated;
}

// ===== 히스토리 =====

export function getHistory(): CuteHistoryItem[] {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw) as CuteHistoryItem[];
  } catch {
    return [];
  }
}

function addToHistory(item: CuteHistoryItem): void {
  const history = getHistory();
  // 같은 날짜 기존 항목 제거 후 앞에 추가
  const filtered = history.filter((h) => h.dateKst !== item.dateKst);
  const updated = [item, ...filtered].slice(0, 30); // 최대 30일
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
}

// ===== 컬렉션 =====

export function getCollection(): CuteCollection {
  try {
    const raw = localStorage.getItem(KEYS.COLLECTION);
    if (!raw) return { characterKeys: [], cardIds: [] };
    return JSON.parse(raw) as CuteCollection;
  } catch {
    return { characterKeys: [], cardIds: [] };
  }
}

function updateCollection(card: CuteCardResult): void {
  const collection = getCollection();
  const characterKeys = collection.characterKeys.includes(card.characterKey)
    ? collection.characterKeys
    : [...collection.characterKeys, card.characterKey];
  const cardIds = collection.cardIds.includes(card.cardId)
    ? collection.cardIds
    : [...collection.cardIds, card.cardId];
  localStorage.setItem(KEYS.COLLECTION, JSON.stringify({ characterKeys, cardIds }));
}

// ===== 전체 초기화 (개발용) =====
export function clearAllData(): void {
  localStorage.removeItem(KEYS.TODAY);
  localStorage.removeItem(KEYS.HISTORY);
  localStorage.removeItem(KEYS.COLLECTION);
}
