import { useReducer, useContext, createContext, ReactNode } from 'react';
import { initialGameState, appReducer } from '../reducers/gameReducer';
import { GameState, GameDispatch } from '../types/gameTypes';

type GameStateType = {
    state: GameState;
    dispatch: GameDispatch;
};

const GameContext = createContext<GameStateType>({ state: initialGameState, dispatch: () => null});

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameContextProvider");
    }
    return context;
};

type GameContextProviderProps = {
    children: ReactNode;
};

export const GameContextProvider: React.FC<GameContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialGameState);

    return (
        <GameContext.Provider value={{state, dispatch}}>
            {children}
        </GameContext.Provider>
    );
}