import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage extends BasePage implements OnInit {

  historical: any[];
  isLoading = true;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getHistorical().then((list) => {
      this.historical = list['item'];
      console.log(this.historical);
      this.isLoading = false;
    })
  }

  getHistorical() {
    return new Promise<any[]>(async resolve => {
      const { data } = await this.network.getHistorical();
      resolve(data);
    })
  }

}
