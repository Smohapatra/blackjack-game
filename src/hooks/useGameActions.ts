import { drawNewCards } from '../apis/cardsApi';
import { calculateScore } from '../utils/gameUtils';
import { GameState, GameDispatch } from '../types/gameTypes';

export const useGameActions = (state: GameState, dispatch: GameDispatch) => {
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

        dispatch({ type: 'SET_DEALER_CARDS', dealerCards: currentDealerCards });
        dispatch({ type: 'SET_DEALER_SCORE', dealerScore: currentDealerScore });
    };

    const handleHit = async () => {
        const newCard = await drawNewCards(state.deckId, 1);
        const updatedPlayerCards = [...state.playerCards, ...newCard];
        const updatedPlayerScore = calculateScore(updatedPlayerCards);

        dispatch({ type: 'SET_PLAYER_CARDS', playerCards: updatedPlayerCards });
        dispatch({ type: 'SET_PLAYER_SCORE', playerScore: updatedPlayerScore });
    };

    return { handleStay, handleHit };
};