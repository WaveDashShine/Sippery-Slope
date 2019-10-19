import { DeckManager, ICard } from './deckManager';

describe('Deck Manager', () => {

  let deckManager: DeckManager = new DeckManager();
  let cardsToGenerate: number = 50

  function generateCards(cardsToGenerate: number): Array<ICard> {
    let deck: Array<ICard> = [];
    for (var i = 0; i < cardsToGenerate; i++) {
      let testCard: ICard = {
        id: i.toString(),
        type: 'card' + i.toString(),
        category: 'test' + i.toString(),
        text: 'textCard' + i.toString()
      }
      deck.push(testCard);
    }
    return deck;
  }

  beforeEach(() => {
    deckManager.setDeck(generateCards(cardsToGenerate))
  });

  afterEach(() => {
    let empty_deck: Array<ICard> = [];
    deckManager.setDeck(empty_deck);
  });

  it('should create an instance', () => {
    expect(deckManager).toBeTruthy();
  });

  it('should get card count', () => {
    expect(deckManager.getCardCount()).toEqual(cardsToGenerate);
  });

  it('should be able to insert card into deck', () => {
    let testCard1: ICard = generateCards(1).pop();
    deckManager.insertCard(testCard1);
    expect(deckManager.getCardCount()).toEqual(cardsToGenerate + 1);
    expect(deckManager.getCardById(Number(testCard1.id))).toEqual(testCard1)
  });

  it('should get card by ID', () => {
    let testCard1: ICard = generateCards(2).pop();
    // 0 based indexing
    expect(deckManager.getCardById(1).id).toBe(testCard1.id);
    expect(deckManager.getCardById(1).type).toBe(testCard1.type);
    expect(deckManager.getCardById(1).category).toBe(testCard1.category);
    expect(deckManager.getCardById(1).text).toBe(testCard1.text);
    expect(deckManager.getCardById(999)).toBeFalsy();
  });

  it('should get and set deck', () => {
    let tempDeck: Array<ICard> = deckManager.getDeck();
    let empty_deck: Array<ICard> = [];
    deckManager.setDeck(empty_deck);
    expect(deckManager.getCardCount()).toEqual(0);
    deckManager.setDeck(tempDeck);
    expect(deckManager.getCardCount()).toEqual(tempDeck.length);
  });

  describe('drawing a card', () => {
    it('should draw a card', () => {
      let drawnCard: ICard = deckManager.drawCard()
      expect(drawnCard).toBeDefined();
      expect(deckManager.getCardCount()).toEqual(cardsToGenerate - 1);
      expect(deckManager.getCardById(Number(drawnCard.id))).toBeFalsy();
    });

    it('should not draw from empty deck', () => {
      let empty_deck: Array<ICard> = [];
      deckManager.setDeck(empty_deck);
      expect(deckManager.drawCard()).toBeNull();
    });
  });

  it('should shuffle deck', () => {
    let deck: Array<ICard> = generateCards(cardsToGenerate);
    deckManager.shuffleDeck();
    expect(deckManager.getDeck()).toBeDefined();
    expect(deckManager.getCardCount()).toEqual(deck.length);
    for (var i=0; i < 3; i++) {
      expect(deckManager.getDeck()[i]).not.toEqual(deck[i]);
    }
  });
});

