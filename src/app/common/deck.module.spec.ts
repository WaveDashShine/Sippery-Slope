import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { DeckModule } from './deck.module'
import { ComponentFixture, async, TestBed } from '@angular/core/testing'

describe('DeckModule', () => {
    let component: DeckModule;
    let fixture: ComponentFixture<DeckModule>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeckModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeckModule);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO: unit tests for deck service
});