import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage extends BasePage implements OnInit {
  images = [];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.images = this.data.images;
    console.log('PARAMs', this.images);
  }
}
