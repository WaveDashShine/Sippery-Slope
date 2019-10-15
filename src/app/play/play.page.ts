import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service'
import { DeckModule, ICard } from '../common/deck.module'

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class PlayPage implements OnInit {

  cardText: string = '';
  cardCategory: string = '';
  cardType: string = '';

  constructor(private cardService: CardService, private deckModule: DeckModule) {
    // TODO: error handling
    // this.cardText = 'error retrieving card data';
    // this.cardCategory = 'error retrieving category';
    // this.cardType = 'error retrieving card type';
  }

  ngOnInit() {
    this.cardService.getRemoteJsonData().subscribe(data => {
        this.deckModule.setDeck(this.cardService.generateCardData(data));
        this.deckModule.shuffleDeck();
        let card: ICard = this.deckModule.drawCard();
        this.cardText = card.text;
        this.cardCategory = card.category;
        this.cardType = card.type;
    });
  }

  nextQuestion() {

  }

  previousQuestion() {

  }
}
