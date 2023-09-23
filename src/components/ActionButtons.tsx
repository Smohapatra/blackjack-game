import { useGameContext } from '../contexts/gameContext';
import { useGameActions } from '../hooks';

export const ActionButtons = () => {
    const { state, dispatch } = useGameContext();
    const { handleStay, handleHit } = useGameActions(state, dispatch);

    const { gameOverMessage } = state;

    return (
        <div className='text-center'>
            <button className='btn-blue' onClick={handleStay} disabled={!!gameOverMessage}>Stand</button>
            <button className='btn-blue' onClick={handleHit} disabled={!!gameOverMessage}>Hit</button>
        </div>
    );
}