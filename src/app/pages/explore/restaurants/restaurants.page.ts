import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage extends BasePage implements OnInit {

  restaurants: any[];
  isLoading = true;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getRestaurants().then((list) => {
      this.restaurants = list['item'];
      console.log(this.restaurants);
      this.isLoading = false;
    })
  }

  getRestaurants() {
    return new Promise<any[]>(async resolve => {
      const { data } = await this.network.getRestaurants();
      resolve(data);
    })
  }

}
