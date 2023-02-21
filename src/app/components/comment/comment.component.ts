import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent extends BasePage implements OnInit {
  @Input() item;

  constructor(injector: Injector) {
    super(injector);
  }

  async likeUnlikeComment(item, post_id) {
    //console.log(post_id,item.id);

    let response = await this.network.likeUnlikePostComment(post_id, item.id);
    console.log(response);

    if (response && response.success === true) {
      item.is_like = !item.is_like;
      if (item.is_like === true) item.like_count++;
      else item.like_count--;
    }
  }

  ngOnInit() {}
}
