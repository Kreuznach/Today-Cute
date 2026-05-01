// ===== 카드 결과 타입 =====
export type CardRarity = 'normal' | 'special' | 'seasonal';

export interface CuteCardResult {
  cardId: string;
  characterKey: string;
  characterName: string;
  rarity: CardRarity;
  moodTitle: string;
  message: string;
  todayPoint: string;
  smallAction: string;
  collectionTheme: string;
}

// ===== 캐릭터 타입 =====
export interface CuteCharacter {
  characterKey: string;
  characterName: string;
  baseMood: string;
  visualHint: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  cards: CuteCardResult[];
}

// ===== 저장 타입 =====
export interface CuteTodayRecord {
  dateKst: string;        // 'YYYY-MM-DD' KST
  firstCard: CuteCardResult;
  finalCard: CuteCardResult | null;
  usedRedraw: boolean;
  finalized: boolean;
  createdAt: string;      // ISO
  finalizedAt: string | null;
}

export interface CuteHistoryItem {
  dateKst: string;
  card: CuteCardResult;
  finalized: boolean;
}

export interface CuteCollection {
  characterKeys: string[];
  cardIds: string[];
}

// ===== 화면 타입 =====
export type Screen =
  | 'home'
  | 'draw'
  | 'result'
  | 'final'
  | 'history'
  | 'collection';

// ===== 앱 상태 =====
export interface AppState {
  screen: Screen;
  pendingCard: CuteCardResult | null;
  todayRecord: CuteTodayRecord | null;
  history: CuteHistoryItem[];
  collection: CuteCollection;
}
