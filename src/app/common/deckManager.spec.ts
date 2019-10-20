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
    expect(deckManager.getCardCount()).toEqual(cardsToGenerate, 'failed to get card count');
  });

  it('should be able to insert card into deck', () => {
    let testCard1: ICard = generateCards(1).pop();
    deckManager.insertCard(testCard1);
    expect(deckManager.getCardCount()).toEqual(cardsToGenerate + 1, 'failed to insert card');
    expect(deckManager.getCardById(Number(testCard1.id))).toEqual(testCard1, 'failed to find card after insertion')
  });

  it('should get card by ID', () => {
    let testCard1: ICard = generateCards(2).pop();
    // 0 based indexing
    expect(deckManager.getCardById(1).id).toBe(testCard1.id, 'fail to get card id');
    expect(deckManager.getCardById(1).type).toBe(testCard1.type, 'fail to get card type');
    expect(deckManager.getCardById(1).category).toBe(testCard1.category, 'fail to get card category');
    expect(deckManager.getCardById(1).text).toBe(testCard1.text, 'fail to get card text');
    expect(deckManager.getCardById(999)).toBeNull('fail to find card should return null');
  });

  it('should get and set deck', () => {
    let tempDeck: Array<ICard> = deckManager.getDeck();
    expect(tempDeck).toBeTruthy('failed to get deck')
    let empty_deck: Array<ICard> = [];
    deckManager.setDeck(empty_deck);
    expect(deckManager.getCardCount()).toEqual(0, 'failed to set to empty deck');
    deckManager.setDeck(tempDeck);
    expect(deckManager.getCardCount()).toEqual(tempDeck.length, 'failed to set deck');
  });

  describe('drawing a card', () => {
    it('should draw a card', () => {
      let drawnCard: ICard = deckManager.drawCard()
      expect(drawnCard).toBeDefined('expect draw card to be defined');
      expect(deckManager.getCardCount()).toEqual(cardsToGenerate - 1, 'draw card should decrease card count');
      expect(deckManager.getCardById(Number(drawnCard.id))).toBeNull('should return null if no card found');
    });

    it('should not draw from empty deck', () => {
      let empty_deck: Array<ICard> = [];
      deckManager.setDeck(empty_deck);
      expect(deckManager.drawCard()).toBeNull("should not draw from empty deck");
    });
  });

  it('should shuffle deck', () => {
    let deck: Array<ICard> = generateCards(cardsToGenerate);
    deckManager.shuffleDeck();
    expect(deckManager.getDeck()).toBeDefined();
    expect(deckManager.getCardCount()).toEqual(deck.length);
    let cardSamePositionCount: number = 0;
    for (var i=0; i < deck.length; i++) {
      if (deckManager.getDeck()[i] === deck[i]) {
        cardSamePositionCount++;
      };
    }
    expect(cardSamePositionCount).toBeLessThanOrEqual(deck.length*0.2, "Shuffle was not random enough");
  });
});

