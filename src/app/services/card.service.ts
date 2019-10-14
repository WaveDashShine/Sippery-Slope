import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

export interface ICard {
    id: string;
    text: string;
    category: string;
    type: string;
}

enum ColumnMap {
    Type = 1,
    Category = 2,
    Text = 3
}

@Injectable({
    providedIn: "root"
})

export class CardService {

    jsonData = null;
    deck: Array<ICard> = [];

    constructor(private http: HttpClient) {
        this.getRemoteJsonData().subscribe(data => {
            this.jsonData = data;
            this.deck = this.generateCardData(this.jsonData);
        });
    }

    getJsonData() {
        return this.jsonData;
    }

    // TODO: investigate promise issues
    getDeck(): Array<ICard> {
        return this.deck;
    }

    getCardCount(): number {
        return this.deck.length;
    }

    getCardById(id: string): ICard {
        return this.deck[Number.parseInt(id)];
    }

    getLocalData() {
        // this.https.get("assets/data/cardData.json");
        return {};
    }

    getRemoteJsonData() {
        return this.http.get(
            "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/1/public/full?alt=json"
        );
    }

    generateCardData(jsonData: JSON): Array<ICard> {
        let entries = jsonData['feed']['entry'];
        let deck: Array<ICard> = [];
        for (let entry of entries) {
            if (deck.length === 0) {
                deck.push(this.generateCardFromEntry(entry));
                continue;
            }

            let entryId: string = this.getIdFromEntry(entry);
            let foundIndex: number = deck.findIndex(card => card.id === entryId)
            if (foundIndex === -1) {
                deck.push(this.generateCardFromEntry(entry));
            }
            else {
                let foundCard: ICard = deck[foundIndex];
                deck[foundIndex] = this.updateCardFromEntry(foundCard, entry);
            }
        }
        return deck;
    }

    generateCardFromEntry(entry): ICard {
        let card: ICard = {
            id: this.getIdFromEntry(entry),
            type: this.getContentFromEntry(entry, ColumnMap.Type),
            category: this.getContentFromEntry(entry, ColumnMap.Category),
            text: this.getContentFromEntry(entry, ColumnMap.Text)
        };
        return card;
    }

    getContentFromEntry(entry, column: ColumnMap): string {
        return this.isColumnMap(entry, column) ? this.getCellTextFromEntry(entry) : null;
    }

    isColumnMap(entry, column: ColumnMap): boolean {
        return this.getCellDataFromEntry(entry)['col'] === column;
    }

    getCellDataFromEntry(entry) {
        return  entry['gs$cell'];
    }

    getCellTextFromEntry(entry): string {
        return this.getCellDataFromEntry(entry)['$t'];
    }

    updateCardFromEntry(foundCard:ICard, entry): ICard {
        let updatedCard: ICard = {
            id: foundCard.id,
            type: foundCard.type || this.getContentFromEntry(entry, ColumnMap.Type),
            category: foundCard.category || this.getContentFromEntry(entry, ColumnMap.Category),
            text: foundCard.text || this.getContentFromEntry(entry, ColumnMap.Text)
        };
        return updatedCard;
    }

    getIdFromEntry(entry): string {
        return this.getCellDataFromEntry(entry)['row'];
    }
}