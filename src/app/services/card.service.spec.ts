import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CardService } from './card.service'
import { ComponentFixture, async, TestBed } from '@angular/core/testing'

describe('CardService', () => {
    let component: CardService;
    let fixture: ComponentFixture<CardService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO: unit tests for card service
    // use worksheet 3 of the spreadsheet set up json for test cases
    it('should get json', () => {
        let data = this.http.get(
            "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/3/public/full?alt=json"
        );
        expect(data).toBeTruthy();
    })
});