import { useReducer, useEffect } from 'react';
import { initialGameState, appReducer } from '../reducers/gameReducer';
import { evalauateGameState } from '../utils/gameUtils';
import { useGameSetup, useGameActions } from '../hooks';
import { Cards, ActionButtons, GameEndWrapper }  from './';
import '../App.css';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialGameState);
  const { playerCards, dealerCards, playerScore, dealerScore, gameOverMessage, gameLoading, deckId, playerHasStayed } = state;
  const { drawInitialCards, startNewGame } = useGameSetup(dispatch);
  const { handleStay, handleHit } = useGameActions(state, dispatch);

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
          <Cards user='Dealer' cards={dealerCards} score={ dealerScore } />
          <Cards user='Player' cards={playerCards} score={ playerScore } />
          <ActionButtons handleStay={handleStay} handleHit={handleHit} gameOverMessage={gameOverMessage} />
        </>
        )}
      </div>
      <GameEndWrapper gameOverMessage={gameOverMessage} startNewGame={startNewGame}/>
    </div>
  );
}

export default App;
