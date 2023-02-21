import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent extends BasePage implements OnInit {
  @Input('item') item;
  comment = '';
  replyComment = '';
  list = [];
  isLoading = true;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log('comments.comp');

    this.getComments();
  }

  async getComments() {
    console.log(this.item);
    let response = await this.network.getPostComments(this.item.id);
    console.log('getComments', response);

    this.list = response.data.item;
    this.isLoading = false;
  }

  // randomListGenerate(){

  //   for(var i = 0; i < this.item.comment_count; i++){
  //     let p = this.makeid(5);
  //     this.list.push({
  //       avatar: p.charAt(0),
  //       name: p
  //     })

  //   }
  // }

  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  close() {
    this.modals.dismiss({ data: 'A' });
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

  async addComment(parentId) {
    if (!this.comment && !parentId) return;
    if (parentId && !this.replyComment) return;

    let data = {
      post_id: this.item.id,
      text: parentId ? this.replyComment : this.comment,
    };
    if (parentId) {
      data['parent_id'] = parentId;
      data['userId'] = 148;
    }

    let response = await this.network.createComment(data);
    console.log(response);

    if (response && response.success === true) {
      this.utility.alerts.presentToast('Comment successfully added');
      this.getComments();
      // this.modals.dismiss({ data: data });
    }
    // this.list.push({
    //   avatar: this.comment.charAt(0),
    //   name: this.comment
    // });

    this.comment = '';
    this.replyComment = '';
  }
}
