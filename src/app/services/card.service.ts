import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ICard } from '../common/deckManager'

export enum ColumnMap {
    Type = 1,
    Category = 2,
    Text = 3
}

@Injectable({
    providedIn: "root"
})

export class CardService {

    default_url: string = "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/1/public/full?alt=json"

    constructor(private http: HttpClient) {
    }

    getLocalData() {
        // this.https.get("assets/data/cardData.json");
        alert('get local JSON data is not implemented');
        return {};
    }

    getRemoteJsonData(url: string = this.default_url) {
        return this.http.get(
            url
        );
    }

    generateCardData(jsonData): Array<ICard> {
        let entries = this.getEntriesFromData(jsonData);
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

    getEntriesFromData(jsonData) {
        return jsonData['feed']['entry'];
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

    isColumnMap(entry, columnType: ColumnMap): boolean {
        return this.getCellDataFromEntry(entry)['col'] === columnType.toString();
    }

    getCellDataFromEntry(entry) {
        return  entry['gs$cell'];
    }

    getCellTextFromEntry(entry): string {
        return this.getCellDataFromEntry(entry)['$t'];
    }

    updateCardFromEntry(foundCard:ICard, entry): ICard {
        let updatedCard: ICard = {
            id: foundCard.id || this.getIdFromEntry(entry),
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