import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  static selectedTab;

  ngOnInit() {}

  setCurrentTab() {
    ExplorePage.selectedTab = this.tabs.getSelected();
  }

}
