import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ICard {
    id: string;
    text: string;
    category: string;
    type: string;
}

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: []
  })
export class DeckModule {
    deck: Array<ICard> = [];

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
        return this.deck[id];
    }

    getRandomCard(): ICard {
        let cardCount = this.getCardCount();
        let randomCardId = this.getRandomNumber(0, cardCount - 1);
        return this.getCardById(randomCardId);
      }
    
      getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

}