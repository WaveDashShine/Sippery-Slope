import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { DeckManager, ICard } from '../common/deckManager';

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class PlayPage implements OnInit {

  activeCard: ICard;
  playingDeck: DeckManager;
  discardPile: DeckManager;

  constructor(private cardService: CardService) {
    this.playingDeck = new DeckManager();
    this.discardPile = new DeckManager();
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
        let card = this.playingDeck.drawCard();
        this.activeCard = card;
    });
  }

  nextQuestion() {
    if (this.playingDeck.getCardCount() > 0) {
      this.discardPile.insertCardOnTop(this.activeCard);
      let card = this.playingDeck.drawCard();
      this.activeCard = card;
    }
  }

  previousQuestion() {
    if (this.discardPile.getCardCount() > 0) {
      this.playingDeck.insertCardOnTop(this.activeCard);
      let card = this.discardPile.drawCard();
      this.activeCard = card;
    }
  }
}
