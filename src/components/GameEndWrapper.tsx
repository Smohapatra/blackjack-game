import { useGameContext } from '../contexts/gameContext';

interface GameEndWrapperProps {
    startNewGame: () => void;
}

export const GameEndWrapper: React.FC<GameEndWrapperProps> = ({ startNewGame }) => {
    const { state } = useGameContext();
    const { gameOverMessage } = state;

    return !!gameOverMessage && (
        <div>
            <h2>Game Over. {gameOverMessage}</h2>
            <div className='text-center'>
                <button className='btn-blue' onClick={startNewGame}>Play Again</button>
            </div>
        </div>
    );
}