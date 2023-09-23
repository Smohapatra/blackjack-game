import '../App.css';
import { useReducer, useEffect } from 'react';
import { getNewDeckId, drawNewCards } from '../apis/cardsApi';
import { initialGameState, appReducer } from '../reducers/gameReducer';
import { calculateScore, evalauateGameState } from '../utils/gameUtils';
import { Cards }  from './Card';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialGameState);

  const startNewGame = async () => {
    dispatch({ type: 'SET_GAME_LOADING', gameLoading: true });
    dispatch({ type: 'RESET_GAME' });
    const newDeckId = await getNewDeckId();
    dispatch({ type: 'SET_DECK_ID', newDeckId });
  }

  useEffect(() => {
    startNewGame();
  }, [])

  useEffect(() => {
    const drawCards = async () => {
      const cardDeck = await drawNewCards(state.deckId, 4);
      const playerCards = cardDeck.slice(0, 2);
      const dealerCards = cardDeck.slice(2, 3);

      dispatch({ type: 'SET_PLAYER_CARDS', playerCards });
      dispatch({ type: 'SET_DEALER_CARDS', dealerCards });
      dispatch({ type: 'SET_PLAYER_SCORE', playerScore: calculateScore(playerCards) });
      dispatch({ type: 'SET_DEALER_SCORE', dealerScore: calculateScore(dealerCards) });
      dispatch({ type: 'SET_GAME_LOADING', gameLoading: false });
    }

    if(state.deckId){
      drawCards();
    }
  }, [state.deckId])

  useEffect(() => {
    const gameOverMessage = evalauateGameState(state.playerScore, state.dealerScore, state.playerHasStayed);

    if (gameOverMessage) {
      dispatch({ type: 'SET_GAME_FINAL_MESSAGE', gameOverMessage });
    }
  }, [state.playerScore, state.dealerScore, state.playerHasStayed]);

  // Handle stay
  const handleStay = async () => {
    dispatch({ type: 'SET_PLAYER_HAS_STAYED', playerHasStayed: true });

    const { dealerCards, dealerScore, deckId } = state;
    const currentDealerCards = [...dealerCards];
    let currentDealerScore = dealerScore;

    while (currentDealerScore < 17) {
      const newDealerCard = await drawNewCards(deckId, 1);
      currentDealerCards.push(newDealerCard[0]);
      currentDealerScore = calculateScore(currentDealerCards);
    }

    dispatch({type: 'SET_DEALER_CARDS', dealerCards: currentDealerCards});
    dispatch({type: 'SET_DEALER_SCORE', dealerScore: currentDealerScore});
  };

  // Handle hit
  const handleHit = async () => {
    const newCard = await drawNewCards(state.deckId, 1);
    const playerCards = [...state.playerCards, ...newCard];
    const playerScore = calculateScore(playerCards);

    dispatch({ type: 'SET_PLAYER_CARDS', playerCards });
    dispatch({ type: 'SET_PLAYER_SCORE', playerScore });
  };

  const { playerCards, dealerCards, playerScore, dealerScore, gameOverMessage, gameLoading } = state;
  return (
    <div className='game-wrapper'>
      <div className='game-window'>
        <h1>Blackjack Game</h1>
        {gameLoading ? (
          <h3>Loading...</h3>
        ) : (
        <>
          <Cards user='Dealer' cards={dealerCards} score={ dealerScore } />
          <Cards user='Player' cards={playerCards} score={ playerScore } />
          <div className='text-center'>
            <button className='btn-blue' onClick={handleStay} disabled={!!gameOverMessage}>Stand</button>
            <button className='btn-blue' onClick={handleHit} disabled={!!gameOverMessage}>Hit</button>
          </div>
        </>
        )}
      </div>
      {!!gameOverMessage && (
        <div>
          <h2>Game Over. {gameOverMessage}</h2>
          <div className='text-center'>
            <button className='btn-blue' onClick={startNewGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
