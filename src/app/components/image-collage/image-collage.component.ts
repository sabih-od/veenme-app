import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'image-collage',
  templateUrl: './image-collage.component.html',
  styleUrls: ['./image-collage.component.scss'],
})
export class ImageCollageComponent extends BasePage implements OnInit {
  @Input('images') images;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}
}
