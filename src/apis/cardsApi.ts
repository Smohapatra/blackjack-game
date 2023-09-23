export const getNewDeckId = async () => {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();

        return data.deck_id;
    } catch (error) {
        console.log(error);
    }
}

export const drawNewCards = async (deckId: string, count: number) => {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
        const { cards } = await response.json();
        
        return cards;
    } catch (error) {
        console.log(error);
    }
}