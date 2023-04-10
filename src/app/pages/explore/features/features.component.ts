import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent extends BasePage implements OnInit {
  segment = 'user';

  restaurants: any[];
  historical: any[];
  landmarks: any[];
  nature: any[];
  isLoading = true;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.getRestaurants().then((list) => {
      this.restaurants = list['item'];
      console.log(this.restaurants);
      this.isLoading = false;
    });
    this.getLandmarks().then((list) => {
      this.landmarks = list['item'];
      console.log(this.landmarks);
      this.isLoading = false;
    });
    this.getHistorical().then((list) => {
      this.historical = list['item'];
      console.log(this.historical);
      this.isLoading = false;
    });
    this.getNature().then((list) => {
      this.nature = list['item'];
      console.log(this.nature);
      this.isLoading = false;
    });
  }
  getHistorical() {
    return new Promise<any[]>(async (resolve) => {
      const { data } = await this.network.getHistorical();
      resolve(data);
    });
  }
  getLandmarks() {
    return new Promise<any[]>(async (resolve) => {
      const { data } = await this.network.getLandmarks();
      resolve(data);
    });
  }
  getNature() {
    return new Promise<any[]>(async (resolve) => {
      const { data } = await this.network.getNature();
      resolve(data);
    });
  }

  getRestaurants() {
    return new Promise<any[]>(async (resolve) => {
      const { data } = await this.network.getRestaurants();
      resolve(data);
    });
  }
  changeEffect(item) {
    console.log(item.target.value);
    if (item.target.value == 'user') {
      this.segment = 'user';
    } else if (item.target.value == 'card') {
      this.segment = 'card';
    } else if (item.target.value == 'change') {
      this.segment = 'change';
    }
  }
}
