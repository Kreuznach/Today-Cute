import { useCuteDraw } from './features/cute-draw/hooks/useCuteDraw';
import { HomeScreen } from './features/cute-draw/screens/HomeScreen';
import { DrawScreen } from './features/cute-draw/screens/DrawScreen';
import { ResultScreen } from './features/cute-draw/screens/ResultScreen';
import { FinalCardScreen } from './features/cute-draw/screens/FinalCardScreen';
import { HistoryScreen } from './features/cute-draw/screens/HistoryScreen';
import { CollectionScreen } from './features/cute-draw/screens/CollectionScreen';

function App() {
  const {
    screen,
    todayRecord,
    pendingCard,
    history,
    collection,
    isDrawing,
    isAdLoading,
    showRedrawModal,
    isRedrawAnimation,
    goTo,
    startDraw,
    confirmDraw,
    finalizeCard,
    requestRedraw,
    confirmRedrawModal,
    cancelRedrawModal,
  } = useCuteDraw();

  // 오늘 카드가 이미 확정된 경우 홈에서 draw로 이동 시 final로 리다이렉트
  const handleStartDraw = () => {
    if (todayRecord?.finalized) {
      goTo('final');
    } else {
      startDraw();
    }
  };

  return (
    <div className="max-w-md mx-auto h-full">
      {screen === 'home' && (
        <HomeScreen
          todayRecord={todayRecord}
          goTo={goTo}
          onStartDraw={handleStartDraw}
        />
      )}
      {screen === 'draw' && (
        <DrawScreen
          isDrawing={isDrawing}
          isRedraw={isRedrawAnimation}
          onDraw={confirmDraw}
          goTo={goTo}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          pendingCard={pendingCard}
          todayRecord={todayRecord}
          isAdLoading={isAdLoading}
          showRedrawModal={showRedrawModal}
          goTo={goTo}
          onFinalize={finalizeCard}
          onRequestRedraw={requestRedraw}
          onConfirmRedraw={confirmRedrawModal}
          onCancelRedraw={cancelRedrawModal}
        />
      )}
      {screen === 'final' && (
        <FinalCardScreen
          todayRecord={todayRecord}
          goTo={goTo}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen
          history={history}
          goTo={goTo}
        />
      )}
      {screen === 'collection' && (
        <CollectionScreen
          collection={collection}
          goTo={goTo}
        />
      )}
    </div>
  );
}

export default App;
