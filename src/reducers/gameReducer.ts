import { GameState, GameAction } from "../types/gameTypes";

export const initialGameState: GameState = {
    deckId: '',
    playerCards: [],
    dealerCards: [],
    playerScore: 0,
    dealerScore: 0,
    playerHasStayed: false,
    gameOverMessage: '',
    gameLoading: true,
};

export const appReducer: React.Reducer<GameState, GameAction> = (state, action) => {
    switch (action.type) {
        case 'SET_DECK_ID':
            return { ...state, deckId: action.newDeckId }; 
        case 'SET_PLAYER_CARDS':
            return { ...state, playerCards: action.playerCards };
        case 'SET_DEALER_CARDS':
            return { ...state, dealerCards: action.dealerCards };
        case 'SET_PLAYER_SCORE':
            return { ...state, playerScore: action.playerScore };
        case 'SET_DEALER_SCORE':
            return { ...state, dealerScore: action.dealerScore };
        case 'SET_PLAYER_HAS_STAYED':
            return { ...state, playerHasStayed: action.playerHasStayed };
        case 'SET_GAME_FINAL_MESSAGE': {
            let finalMessage = '';
            if (action.gameOverMessage === 'win') {
                finalMessage = 'You win !! 🎉';
            } else if (action.gameOverMessage === 'lose') {
                finalMessage = 'You lose !! 😢';
            } else if (action.gameOverMessage === 'tie') {
                finalMessage = 'You tie !! 🤝';
            }
            return { ...state, gameOverMessage: finalMessage } as GameState;
        }
        case 'RESET_GAME':
            return initialGameState;
        case 'SET_GAME_LOADING':
            return { ...state, gameLoading: action.gameLoading };
        default:
            return state;
    }
}
