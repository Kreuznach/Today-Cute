import { useState, useCallback, useEffect } from 'react';
import type {
  CuteTodayRecord,
  CuteHistoryItem,
  CuteCollection,
  CuteCardResult,
  Screen,
} from '../types';
import {
  getTodayRecord,
  createTodayRecord,
  finalizeTodayRecord,
  markRedrawUsed,
  getHistory,
  getCollection,
} from '../storage/cuteDrawStorage';
import { drawRandomCard, drawRandomCardExcept } from '../utils/random';
import { loadAd, showAd } from '../../../lib/ads';

export interface UseCuteDrawReturn {
  screen: Screen;
  todayRecord: CuteTodayRecord | null;
  pendingCard: CuteCardResult | null;
  history: CuteHistoryItem[];
  collection: CuteCollection;
  isDrawing: boolean;
  isAdLoading: boolean;
  showRedrawModal: boolean;

  goTo: (screen: Screen) => void;
  startDraw: () => void;
  confirmDraw: () => void;
  finalizeCard: () => void;
  requestRedraw: () => void;
  confirmRedrawModal: () => void;
  cancelRedrawModal: () => void;
}

export function useCuteDraw(): UseCuteDrawReturn {
  const [screen, setScreen] = useState<Screen>('home');
  const [todayRecord, setTodayRecord] = useState<CuteTodayRecord | null>(null);
  const [pendingCard, setPendingCard] = useState<CuteCardResult | null>(null);
  const [history, setHistory] = useState<CuteHistoryItem[]>([]);
  const [collection, setCollection] = useState<CuteCollection>({ characterKeys: [], cardIds: [] });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [showRedrawModal, setShowRedrawModal] = useState(false);

  // 초기 상태 로드
  useEffect(() => {
    const record = getTodayRecord();
    setTodayRecord(record);
    setHistory(getHistory());
    setCollection(getCollection());

    // 오늘 카드가 이미 확정된 경우 홈 유지
    // (홈 화면에서 상태에 따라 버튼 변경)
  }, []);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
  }, []);

  // 뽑기 화면 진입
  const startDraw = useCallback(() => {
    setScreen('draw');
  }, []);

  // 실제 카드 뽑기 (뽑기 화면에서 버튼 클릭)
  const confirmDraw = useCallback(() => {
    if (isDrawing) return;
    setIsDrawing(true);

    // 1.2초 애니메이션 후 카드 결정
    setTimeout(() => {
      const card = drawRandomCard();
      setPendingCard(card);
      // 오늘 기록 생성 (firstCard로 저장, 아직 finalized=false)
      const record = createTodayRecord(card);
      setTodayRecord(record);
      setIsDrawing(false);
      setScreen('result');

      // 결과 화면 진입 시 광고 사전 로드
      loadAd().catch(() => {/* 무시 */});
    }, 1200);
  }, [isDrawing]);

  // 카드 확정 (재뽑기 없이 현재 카드로 확정)
  const finalizeCard = useCallback(() => {
    if (!todayRecord) return;
    const updated = finalizeTodayRecord(todayRecord, todayRecord.finalCard ?? pendingCard ?? todayRecord.firstCard);
    setTodayRecord(updated);
    setHistory(getHistory());
    setCollection(getCollection());
    setScreen('final');
  }, [todayRecord, pendingCard]);

  // 재뽑기 요청 (모달 표시)
  const requestRedraw = useCallback(() => {
    if (!todayRecord || todayRecord.usedRedraw) return;
    setShowRedrawModal(true);
  }, [todayRecord]);

  // 재뽑기 모달 확인 → 광고 시청
  const confirmRedrawModal = useCallback(async () => {
    setShowRedrawModal(false);
    if (!todayRecord) return;

    setIsAdLoading(true);
    const result = await showAd();
    setIsAdLoading(false);

    if (result === 'success') {
      const currentCardId = pendingCard?.cardId ?? todayRecord.firstCard.cardId;
      const newCard = drawRandomCardExcept(currentCardId);
      const updated = markRedrawUsed(todayRecord, newCard);
      setTodayRecord(updated);
      setPendingCard(newCard);
      setHistory(getHistory());
      setCollection(getCollection());
      setScreen('final');
    }
    // 실패/취소 시 기존 카드 유지, 화면 유지
  }, [todayRecord, pendingCard]);

  // 재뽑기 모달 취소
  const cancelRedrawModal = useCallback(() => {
    setShowRedrawModal(false);
  }, []);

  return {
    screen,
    todayRecord,
    pendingCard,
    history,
    collection,
    isDrawing,
    isAdLoading,
    showRedrawModal,
    goTo,
    startDraw,
    confirmDraw,
    finalizeCard,
    requestRedraw,
    confirmRedrawModal,
    cancelRedrawModal,
  };
}
