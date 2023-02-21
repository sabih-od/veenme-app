import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.page.html',
  styleUrls: ['./landmarks.page.scss'],
})
export class LandmarksPage extends BasePage implements OnInit {

  landmarks: any[];
  isLoading = true;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getLandmarks().then((list) => {
      this.landmarks = list['item'];
      console.log(this.landmarks);
      this.isLoading = false;
    })
  }

  getLandmarks() {
    return new Promise<any[]>(async resolve => {
      const { data } = await this.network.getLandmarks();
      resolve(data);
    })
  }
}
