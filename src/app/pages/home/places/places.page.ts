import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { PlacesDetailsComponent } from './places-details/places-details.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage extends BasePage implements OnInit {
  page = 1;
  list = [];
  isLoading = true;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const res = await this.network.getPlaces(this.page);
    console.log(res);
    let data = res.data;
    this.list = data;
    this.isLoading = false;
  }

  openDetails(item) {
    this.modals.present(PlacesDetailsComponent, { item });
  }
}
