import { useEffect, useCallback } from 'react';
import { getNewDeckId, drawNewCards } from '../apis/cardsApi';
import { calculateScore } from '../utils/gameUtils';
import { GameDispatch } from '../types/gameTypes';

export const useGameSetup = (dispatch: GameDispatch) => {
    const startNewGame = useCallback(async () => {
        dispatch({ type: 'SET_GAME_LOADING', gameLoading: true });
        dispatch({ type: 'RESET_GAME' });
        const newDeckId = await getNewDeckId();
        dispatch({ type: 'SET_DECK_ID', newDeckId });
    }, [dispatch]);

    const drawInitialCards = useCallback(async (deckId: string) => {
        const cardDeck = await drawNewCards(deckId, 4);
        const playerCards = cardDeck.slice(0, 2);
        const dealerCards = cardDeck.slice(2, 3);
        
        dispatch({ type: 'SET_PLAYER_CARDS', playerCards });
        dispatch({ type: 'SET_DEALER_CARDS', dealerCards });
        dispatch({ type: 'SET_PLAYER_SCORE', playerScore: calculateScore(playerCards) });
        dispatch({ type: 'SET_DEALER_SCORE', dealerScore: calculateScore(dealerCards) });
        dispatch({ type: 'SET_GAME_LOADING', gameLoading: false });
    }, [dispatch]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    return { drawInitialCards, startNewGame };
};