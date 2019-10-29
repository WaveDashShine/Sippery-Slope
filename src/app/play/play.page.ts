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
  categoryList: Set<string>;
  categoryFilter: Array<string>;
  interfaceOptions: any = {
    header: 'Filter Categories'
  };

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
        this.initializeCategories(this.playingDeck);
        this.showNextCard(this.playingDeck);
    });
  }

  private showNextCard(deck: DeckManager) {
    let card = this.drawUnfilteredCategory(deck);
    this.activeCard = card;
  }

  private drawUnfilteredCategory(deck: DeckManager): ICard {
    let card = deck.drawCard();
    while ((!this.categoryFilter.includes(card.category)) && this.getCategoryCount(deck) > 0) {
      deck.insertCard(card);
      card = deck.drawCard();
    }
    return card;
  }

  private initializeCategories(deck: DeckManager) {
    this.categoryList = new Set(deck.getDeck().map(card => card.category));
    this.categoryFilter = Array.from(this.categoryList);
  }

  nextCard() {
    if (this.getPlayDeckCategoryCount() > 0) {
      this.discardPile.insertCardOnTop(this.activeCard);
      this.showNextCard(this.playingDeck);
    }
  }

  previousCard() {
    if (this.getDiscardDeckCategoryCount() > 0) {
      this.playingDeck.insertCardOnTop(this.activeCard);
      this.showNextCard(this.discardPile);
    }
  }

  updateActiveCardByCategory() {
    if (!this.categoryFilter.includes(this.activeCard.category)) {
      this.showNextCard(this.playingDeck);
    }
  }

  getPlayDeckCategoryCount() {
    return this.getCategoryCount(this.playingDeck);
  }

  getDiscardDeckCategoryCount() {
    return this.getCategoryCount(this.discardPile);
  }

  private getCategoryCount(deck: DeckManager): number {
    return deck.getDeck().filter(card => this.categoryFilter.includes(card.category)).length;
  }

  restartGame() {
    this.playingDeck.insertCard(this.activeCard);
    for (let discardedCard of this.discardPile.getDeck()) {
      this.playingDeck.insertCard(discardedCard);
    }
    this.playingDeck.shuffleDeck();
    this.discardPile.setDeck(new Array<ICard>());
    this.showNextCard(this.playingDeck);
  }
}
