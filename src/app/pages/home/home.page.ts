import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  static selectedTab: any;

  ngOnInit() {
    let token = localStorage.getItem('token');
  }

  setCurrentTab() {
    HomePage.selectedTab = this.tabs.getSelected();
  }
}
