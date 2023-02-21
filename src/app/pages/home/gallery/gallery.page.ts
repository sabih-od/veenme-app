import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage extends BasePage implements OnInit {
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
    const res = await this.network.getGallery(this.page);
    console.log(res);
    let data = res.data;
    this.list = data.item;
    this.isLoading = false;
  }

  openComments(item) {
    this.modals.present(CommentsComponent, { item });
  }
}
