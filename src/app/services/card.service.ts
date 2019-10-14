import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: "root"
})

export class CardService {

    constructor(private http: HttpClient) {}

    getLocalData() {
        // this.https.get("assets/data/cardData.json");
        return {};
    }

    getRemoteJsonData() {
        return this.http.get(
            "https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/1/public/full?alt=json"
        )
    }

}