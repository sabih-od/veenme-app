import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-full-size-gallery',
  templateUrl: './full-size-gallery.component.html',
  styleUrls: ['./full-size-gallery.component.scss'],
})
export class FullSizeGalleryComponent extends BasePage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  images = [];
  index: number;
  slideOpts = {};

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: this.index,
    }
  }

  public ionViewWillEnter() {
    this.slides.update();
  }

  close() {
    this.modals.dismiss();
  }
}
