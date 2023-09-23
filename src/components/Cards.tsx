import { useGameContext } from '../contexts/gameContext';

const BACK_CARD = 'https://deckofcardsapi.com/static/img/back.png';

interface CardsProps {
    user: string;
}

export const Cards: React.FC<CardsProps> = ({ user }) => {
    const { state } = useGameContext();

    let cards = [];
    let score = 0;
    if (user === 'Player') {
        cards = state.playerCards;
        score = state.playerScore;
    } else {
        cards = state.dealerCards;
        score = state.dealerScore;
    }

    return (
        <div className='m-10 space-y-3'>
            <h2 className='text-2xl font-bold'>{user}</h2>
            <div className='flex flex-row flex-wrap justify-center'>
                {cards.map(card => (
                    <img key={card.code} className='w-30 h-40 m-2' src={card.image} alt={card.code} />
                ))}
                {cards.length === 1 && <img className='w-30 h-40 m-2' src={BACK_CARD} alt="back_image"/>}
            </div>
            <h3>Score: {score}</h3>
        </div>
    );
}