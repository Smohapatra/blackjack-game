import { describe, it, expect } from 'vitest';
import { calculateScore, evalauateGameState } from '../utils/gameUtils';
import { Card } from '../types/gameTypes';

describe('calculateScore function', () => {
    it('calculates score correctly without face cards or aces', () => {
        const cards: Array<Card> = [
            { value: '2', suit: 'HEARTS', image: '', code: '' },
            { value: '3', suit: 'SPADES', image: '', code: '' },
            { value: '4', suit: 'DIAMONDS', image: '', code: '' },
        ];
        const score = calculateScore(cards);
        expect(score).toEqual(9);
    });

    it('calculates score correctly with face cards but without aces', () => {
        const cards: Array<Card> = [
            { value: '10', suit: 'HEARTS', image: '', code: '' },
            { value: 'JACK', suit: 'SPADES', image: '', code: '' },
            { value: 'KING', suit: 'DIAMONDS', image: '', code: '' },
        ];
        const score = calculateScore(cards);
        expect(score).toEqual(30);
    });

    it('calculates score correctly with aces but without going over 21', () => {
        const cards: Array<Card> = [
            { value: 'ACE', suit: 'HEARTS', image: '', code: '' },
            { value: '2', suit: 'SPADES', image: '', code: '' },
            { value: '3', suit: 'DIAMONDS', image: '', code: '' },
        ];
        const score = calculateScore(cards);
        expect(score).toEqual(16);
    });

    it('calculates score correctly with aces and without going over 21', () => {
        const cards: Array<Card> = [
            { value: 'ACE', suit: 'HEARTS', image: '', code: '' },
            { value: 'KING', suit: 'SPADES', image: '', code: '' },
            { value: 'QUEEN', suit: 'DIAMONDS', image: '', code: '' },
        ];
        const score = calculateScore(cards);
        expect(score).toEqual(21);
    });

    it('calculates score correctly without cards', () => {
        const cards: Array<Card> = [];

        const score = calculateScore(cards);
        expect(score).toEqual(0);
    });
});

describe('evalauateGameState function', () => {
    it('evaluates game state correctly when player score is 21', () => {
        const playerScore = 21;
        const dealerScore = 10;
        const playerHasStayed = false;

        const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
        expect(gameOverMessage).toEqual('win');
    });

    it('evaluates game state correctly when player score is over 21', () => {
        const playerScore = 22;
        const dealerScore = 10;
        const playerHasStayed = false;

        const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
        expect(gameOverMessage).toEqual('lose');
    });

    it('evaluates game state correctly when player score is less than 21 and player has stayed', () => {
        const playerScore = 20;
        const dealerScore = 10;
        const playerHasStayed = true;

        const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
        expect(gameOverMessage).toEqual('win');
    });

    it('evaluates game state correctly when player score is less than 21 and player has not stayed', () => {
        const playerScore = 20;
        const dealerScore = 10;
        const playerHasStayed = false;

        const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
        expect(gameOverMessage).toEqual(undefined);
    });

    it('evaluates game state correctly when dealer score is 21', () => {
        const playerScore = 10;
        const dealerScore = 21;
        const playerHasStayed = false;

        const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
        expect(gameOverMessage).toEqual('lose');
    });

    it('evaluates game state correctly when dealer score is over 21', () => {
        const playerScore = 10;
        const dealerScore = 22;
        const playerHasStayed = false;

        const gameOverMessage = evalauateGameState(playerScore, dealerScore, playerHasStayed);
        expect(gameOverMessage).toEqual('win');
    });
});