import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  expanded: boolean;

  constructor() {
    this.expanded = false;
  }

  expandItem(): void {
    this.expanded = !this.expanded;
  }

}
