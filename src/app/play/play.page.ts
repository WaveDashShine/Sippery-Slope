import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service'
import { DeckModule, ICard } from '../common/deck.module'

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class PlayPage implements OnInit {

  activeCard: ICard;
  playingDeck: DeckModule;
  discardPile: DeckModule;

  constructor(private cardService: CardService) {
    this.playingDeck = new DeckModule();
    this.discardPile = new DeckModule();
    this.activeCard = {
      id: '',
      type: '',
      category: '',
      text: ''
    }
    // TODO: error handling
    // this.cardText = 'error retrieving card data';
    // this.cardCategory = 'error retrieving category';
    // this.cardType = 'error retrieving card type';
  }

  ngOnInit() {
    this.cardService.getRemoteJsonData().subscribe(data => {
        this.playingDeck.setDeck(this.cardService.generateCardData(data));
        this.playingDeck.shuffleDeck();
        this.nextQuestion();
    });
  }

  nextQuestion() {
    if (this.playingDeck.getCardCount() > 0) {
      let card = this.playingDeck.drawCard();
      this.activeCard = card;
      this.discardPile.insertCard(card);
    }
  }

  previousQuestion() {
    if (this.discardPile.getCardCount() > 0) {
      let card = this.discardPile.drawCard();
      this.activeCard = card;
      this.playingDeck.insertCard(card);
    }
  }
}
