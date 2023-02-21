import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-nature',
  templateUrl: './nature.page.html',
  styleUrls: ['./nature.page.scss'],
})
export class NaturePage extends BasePage implements OnInit {

  nature: any[];
  isLoading = true;

  constructor(
    injector: Injector
  ) { 
    super(injector)
  }

  ngOnInit() {
    this.getNature().then((list) => {
      this.nature = list['item'];
      console.log(this.nature);
      this.isLoading = false;
    })
  }

  getNature() {
    return new Promise<any[]>(async resolve => {
      const { data } = await this.network.getNature();
      resolve(data);
    })
  }

}
