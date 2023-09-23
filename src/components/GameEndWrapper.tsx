interface GameEndWrapperProps {
    gameOverMessage: string;
    startNewGame: () => void;
}

export const GameEndWrapper: React.FC<GameEndWrapperProps> = ({ gameOverMessage, startNewGame }) => {
    return !!gameOverMessage && (
        <div>
            <h2>Game Over. {gameOverMessage}</h2>
            <div className='text-center'>
                <button className='btn-blue' onClick={startNewGame}>Play Again</button>
            </div>
        </div>
    );
}