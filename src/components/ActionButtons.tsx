interface ActionButtonsProps {
    handleStay: () => void;
    handleHit: () => void;
    gameOverMessage: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ handleStay, handleHit, gameOverMessage }) => {
    return (
        <div className='text-center'>
            <button className='btn-blue' onClick={handleStay} disabled={!!gameOverMessage}>Stand</button>
            <button className='btn-blue' onClick={handleHit} disabled={!!gameOverMessage}>Hit</button>
        </div>
    );
}