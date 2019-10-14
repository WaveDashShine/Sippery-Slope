import { Component, OnInit } from '@angular/core';
import { CardService, ICard } from '../services/card.service'

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class PlayPage {

  cardText: string = '';
  cardCategory: string = '';
  cardType: string = '';
  deck: Array<ICard> = [];

  constructor(private cardService: CardService) {
    this.cardText = 'error retrieving card data';
    this.cardCategory = 'error retrieving category';
    this.cardType = 'error retrieving card type';
  }

  ngOnInit() {
    this.deck = this.cardService.getDeck();
    let card: ICard = this.getRandomCard();
    this.cardText = card.text;
    this.cardCategory = card.category;
    this.cardType = card.type;
  }

  getRandomCard(): ICard {
    let cardCount = this.cardService.getCardCount();
    let randomCardId = this.getRandomNumber(1, cardCount);
    return this.cardService.getCardById(randomCardId.toString()); 
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
