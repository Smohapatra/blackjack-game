import { useEffect } from 'react';
import { evalauateGameState } from '../utils/gameUtils';
import { useGameSetup } from '../hooks';
import { useGameContext, GameContextProvider } from '../contexts/gameContext';
import { Cards, ActionButtons, GameEndWrapper }  from './';
import '../App.css';

function AppContent() {
  const { state, dispatch } = useGameContext();
  const { playerScore, dealerScore, gameLoading, deckId, playerHasStayed } = state;
  const { drawInitialCards, startNewGame } = useGameSetup(dispatch);

  useEffect(() => {
    startNewGame();
  }, [])

  useEffect(() => {
    if(deckId) drawInitialCards(deckId);
  }, [deckId])

  useEffect(() => {
    const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
    if (gameOverMessage) {
      dispatch({ type: 'SET_GAME_FINAL_MESSAGE', gameOverMessage });
    }
  }, [playerScore, dealerScore, playerHasStayed]);

  return (
    <div className='game-wrapper'>
      <div className='game-window'>
        <h1>Blackjack Game</h1>
        {gameLoading ? <h3>Loading...</h3> : (
        <>
          <Cards user='Dealer' />
          <Cards user='Player' />
          <ActionButtons />
        </>
        )}
      </div>
      <GameEndWrapper startNewGame={startNewGame}/>
    </div>
  );
}

function App() {
  return (
    <GameContextProvider>
      <AppContent />
    </GameContextProvider>
  );
}

export default App;
