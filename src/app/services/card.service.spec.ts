import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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
});