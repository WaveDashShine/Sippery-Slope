import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: "root"
})

export class CardService {

    deck: Array<ICard> = [];
    cardCount: number = 0;

    constructor(private http: HttpClient) {
        this.deck = this.generateCardData();
        this.cardCount = this.refreshCardCount();
    }

    getLocalData() {
        // this.https.get("assets/data/cardData.json");
        return {};
    }

    // consider transforming this data so the retrieval is faster
    getRemoteJsonData() {
        return this.http.get(
            "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/1/public/full?alt=json"
        );
    }

    generateCardData(): Array<ICard> {
        return [];
    }
    
    getCardCount(): number {
        return this.cardCount;
    }

    refreshCardCount(): number {
        return this.deck.length;
    }

}

interface ICard {
    id: number;
    Text: string;
    Category: string;
    Type: string;
}
