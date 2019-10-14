import { Component, OnInit } from '@angular/core';
import { CardService } from "../services/card.service"

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss']
})
export class PlayPage {

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cardService.getRemoteJsonData().subscribe(data => {
      // stubs
      console.log(data)
    })
  }
}
