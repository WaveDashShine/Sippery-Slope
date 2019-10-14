import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service'

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class PlayPage {

  cardText: string = '';
  cardCategory: string = '';
  cardType: string = '';

  constructor(private cardService: CardService) {
    this.cardText = 'error retrieving card data';
    this.cardCategory = 'error retrieving category';
    this.cardType = 'error retrieving card type';
  }

  ngOnInit() {
    this.cardService.getRemoteJsonData().subscribe(data => {
      // stubs
      console.log(data)
    })
  }
}
