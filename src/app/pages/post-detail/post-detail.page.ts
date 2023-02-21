import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage extends BasePage implements OnInit {
  post;
  comments;
  isLoading = true;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    let postId = this.nav.getQueryParams().post_id;
    this.getData(postId);
  }

  async getData(id) {
    let res = await this.network.getPost(id);
    console.log('getPost', res);
    this.post = res?.data;

    let _res = await this.network.getPostComments(id);
    console.log('getPostComments', _res);
    this.comments = _res?.data?.item ?? [];
    console.log('Comments', this.comments);
    this.isLoading = false;
    //this.post = res.data;
  }
}
