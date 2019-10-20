import { CardService, ColumnMap } from './card.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICard } from '../common/deckManager';
import jsonData from '../test/test.json';

describe('CardService', () => {
    let injector: TestBed;
    let service: CardService;
    let httpMock: HttpTestingController;
    const test_url: string = "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/3/public/full?alt=json"

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CardService]
        });

        injector = getTestBed();
        service = injector.get(CardService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should get json', () => {
        let data = service.getRemoteJsonData(test_url);
        expect(data).toBeTruthy('could not get json from url');
    });

    describe('Parse JSON', () => {

        it('should generate card data', () => {
            let deck: Array<ICard> = service.generateCardData(jsonData);
            expect(deck).toBeTruthy('could not generate deck from json');
        });
    
        it('should generate entry data', () => {
            let entries = service.getEntriesFromData(jsonData);
            expect(entries).toBeTruthy('could not parse entry data');
        });

        it('should generate card from entry data', () => {
            let entries = service.getEntriesFromData(jsonData);
            for (let entry of entries) {
                let test_card: ICard = service.generateCardFromEntry(entry);
                expect(test_card).toBeTruthy('card was not generated from entry');
            }
        });
    
        it('should get content from entry', () => {
            let entries = service.getEntriesFromData(jsonData);
            let categoryCount: number = 0;
            let textCount: number = 0;
            let typeCount: number = 0;
            for (let entry of entries) {
                if (service.getContentFromEntry(entry, ColumnMap.Category)) categoryCount++;
                if (service.getContentFromEntry(entry, ColumnMap.Text)) textCount++;
                if (service.getContentFromEntry(entry, ColumnMap.Type)) typeCount++;
            }
            expect(categoryCount).toEqual(textCount);
            expect(categoryCount).toEqual(typeCount, 'uneven number of column entries detected');
        });
    
        it('should match column map', () => {
            let entries = service.getEntriesFromData(jsonData);
            let categoryCount: number = 0;
            let textCount: number = 0;
            let typeCount: number = 0;
            for (let entry of entries) {
                if (service.isColumnMap(entry, ColumnMap.Category)) categoryCount++;
                if (service.isColumnMap(entry, ColumnMap.Text)) textCount++;
                if (service.isColumnMap(entry, ColumnMap.Type)) typeCount++;
            }
            expect(categoryCount).toEqual(textCount);
            expect(categoryCount).toEqual(typeCount, 'uneven number of column entries detected');
        });

        it('should get cell data from entry', () => {
            let entries = service.getEntriesFromData(jsonData);
            console.log(entries);
            for (let entry of entries) {
                expect(service.getCellDataFromEntry(entry)).toBeTruthy('cell data was not obtained from entry');
            }
        });

        it('should get cell text from entry', () => {
            let entries = service.getEntriesFromData(jsonData);
            for (let entry of entries) {
                let cellText: string = service.getCellTextFromEntry(entry);
                expect(cellText).toBeTruthy('cell text was not obtained from entry');
            }
        });

        it('should update card from entry', () => {
            let entries = service.getEntriesFromData(jsonData);
            let card: ICard = {
                id: null,
                text: null,
                category: null,
                type: null
            }
            for (let entry of entries) {
                card = service.updateCardFromEntry(card, entry);
            }
            expect(card.id).toBeTruthy('id was not updated from entry');
            expect(card.text).toBeTruthy('text was not updated from entry');
            expect(card.category).toBeTruthy('category was not updated entry');
            expect(card.type).toBeTruthy('type was not updated entry');
        });
    });

});