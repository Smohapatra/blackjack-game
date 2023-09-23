import { Card } from '../types/gameTypes';

const evaluateCardValue = (value: string) => {
    switch (value) {
        case 'ACE':
            return 1;
        case 'JACK':
        case 'QUEEN':
        case 'KING':
            return 10;
        default:
            return Number(value);
    }
}

export const calculateScore = (cards: Array<Card>) => {
    let score = 0;
    let aceCount = 0;

    cards.forEach(card => {
        const value = evaluateCardValue(card.value);
        if (value === 1) {
            aceCount++;
        }
        score += value;
    });

    if (score <= 11 && aceCount > 0) {
        score += 10;
    }
    return score;
}

export const evalauateGameState = (playerScore: number, dealerScore: number, playerHasStayed: boolean) => {
    if (playerScore === 21 && dealerScore === 21) {
        return 'tie';
    } else if (dealerScore > 21) {
        return 'win';
    } else if (playerScore > 21) {
        return 'lose';
    } else if (playerScore === 21 && dealerScore !== 21) {
        return 'win';
    } else if ((playerScore !== 21 && dealerScore === 21) || (playerScore > 21 && dealerScore <= 21)){
        return 'lose';
    } else if (playerHasStayed) {
        if (playerScore > dealerScore) {
            return 'win';
        } else if (playerScore < dealerScore) {
            return 'lose';
        } else {
            return 'tie';
        }
    }
};