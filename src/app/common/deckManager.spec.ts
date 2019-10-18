import { DeckManager, ICard } from './deckManager';

describe('Deck Manager', () => {

  let deckManager: DeckManager = new DeckManager();
  let testCard1: ICard = {
    id: '1',
    type: 'card1',
    category: 'test1',
    text: 'textCard1'
  }
  let testCard2: ICard = {
    id: '2',
    type: 'card2',
    category: 'test2',
    text: 'textCard2'
  }
  let testCard3: ICard = {
    id: '3',
    type: 'card3',
    category: 'test3',
    text: 'textCard3'
  }

  beforeEach(() => {
    deckManager.insertCard(testCard1);
    deckManager.insertCard(testCard2);
  });

  afterEach(() => {
    let empty_deck: Array<ICard> = [];
    deckManager.setDeck(empty_deck);
  });

  it('should create an instance', () => {
    expect(deckManager).toBeTruthy();
  });

  it('should be able to insert card into deck', () => {
    expect(deckManager.getCardCount()).toEqual(2);
  });

  it('should get card by ID', () => {
    expect(deckManager.getCardById(1)).toBe(testCard1);
    expect(deckManager.getCardById(2)).toBe(testCard2);
    expect(deckManager.getCardById(99)).toBeFalsy();
  });

  it('should get and set deck', () => {
    let tempDeck: Array<ICard> = deckManager.getDeck();
    let empty_deck: Array<ICard> = [];
    deckManager.setDeck(empty_deck);
    expect(deckManager.getCardCount()).toEqual(0);
    deckManager.setDeck(tempDeck);
    expect(deckManager.getCardCount()).toEqual(tempDeck.length);
  });

  it('should draw a card', () => {
    expect(deckManager.drawCard()).toEqual(testCard1);
    let empty_deck: Array<ICard> = [];
    deckManager.setDeck(empty_deck);
    expect(deckManager.drawCard()).toBeNull();
  });

  it('should shuffle deck', () => {
    let deck_before_shuffle: Array<ICard> = deckManager.getDeck();
    spyOn(Math, 'random');
    deckManager.shuffleDeck();
    expect(Math.random).toHaveBeenCalled();
    expect(deckManager.getDeck).toBeDefined();
    expect(deckManager.getCardCount()).toEqual(deck_before_shuffle.length);
  });
});

