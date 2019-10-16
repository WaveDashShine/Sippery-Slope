import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ICard } from '../common/deckManager'

enum ColumnMap {
    Type = 1,
    Category = 2,
    Text = 3
}

@Injectable({
    providedIn: "root"
})

export class CardService {

    constructor(private http: HttpClient) {
    }

    getLocalData() {
        // this.https.get("assets/data/cardData.json");
        alert('get local JSON data is not implemented');
        return {};
    }

    getRemoteJsonData() {
        return this.http.get(
            "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/1/public/full?alt=json"
        );
    }

    generateCardData(jsonData): Array<ICard> {
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