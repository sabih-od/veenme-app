import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'home-page-post',
  templateUrl: './home-page-post.component.html',
  styleUrls: ['./home-page-post.component.scss'],
})
export class HomePagePostComponent extends BasePage implements OnInit {
  @Input('item') item: any;
  @Output('itemLikeToggled') itemLikeToggled: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('openComments') openComments: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('openUserProfile') openUserProfile: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('opengallery') opengallery: EventEmitter<any> =
    new EventEmitter<any>();

  @Output('openPlace') openPlace: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  log(log) {
    console.log(JSON.stringify(log));
    this.openGallery(log);
  }

  openGallery(images) {
    console.log(images.length);
    // alert('Hello World');
    this.data.images = images;
    this.nav.push('images', { images });
    //this.modals.present(FullSizeGalleryComponent, { images: images });
  }
}
