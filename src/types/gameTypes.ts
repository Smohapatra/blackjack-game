export type Card = {
    value: string;
    suit: string;
    image: string;
    code: string;
}

export interface CardsProps {
    user: string;
    cards: Card[];
    score: number;
}

export type GameState = {
    deckId: string,
    playerCards: Card[],
    dealerCards: Card[],
    playerScore: number,
    dealerScore: number,
    playerHasStayed: boolean,
    gameOverMessage: string,
    gameLoading: boolean
};

export type GameAction = 
    | { type: 'SET_DECK_ID', newDeckId: string }
    | { type: 'SET_PLAYER_CARDS', playerCards: Card[] }
    | { type: 'SET_DEALER_CARDS', dealerCards: Card[] }
    | { type: 'SET_PLAYER_SCORE', playerScore: number }
    | { type: 'SET_DEALER_SCORE', dealerScore: number }
    | { type: 'SET_PLAYER_HAS_STAYED', playerHasStayed: boolean }
    | { type: 'SET_GAME_FINAL_MESSAGE', gameOverMessage: string }
    | { type: 'RESET_GAME' }
    | { type: 'SET_GAME_LOADING', gameLoading: boolean };
