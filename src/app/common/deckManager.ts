export interface ICard {
    id: string;
    text: string;
    category: string;
    type: string;
}

export class DeckManager {
    private deck: Array<ICard> = [];

    constructor() {
        this.deck = [];
    }

    getDeck(): Array<ICard> {
        return this.deck;
    }

    setDeck(deck: Array<ICard>) {
        this.deck = deck;
    }

    getCardCount(): number {
        return this.deck.length;
    }

    getCardById(id: number): ICard {
        return this.deck.find(card => card.id === id.toString());
    }

    // ES6 version of the Fisher-Yates algorithm
    // picks one random element for each original array element
    // and excludes it from the next draw
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawCard(): ICard {
        return this.deck.length > 0 ? this.deck.pop() : null;
    }

    insertCard(newCard: ICard, position: number = 0) {
        this.deck.splice(position, 0, newCard);
    }
}
