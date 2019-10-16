import { CardService } from './card.service'
import { getTestBed, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('CardService', () => {
    let injector: TestBed;
    let service: CardService;
    let httpMock: HttpTestingController;
    const test_url = "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/3/public/full?alt=json"

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
        expect(data).toBeTruthy();
    })
});