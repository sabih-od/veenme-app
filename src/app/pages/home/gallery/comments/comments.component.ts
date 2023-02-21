import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent extends BasePage implements OnInit {
  // @Input('item') item;
  _item;

  @Input() set item(val) {
    this._item = val;
  }

  get item() {
    return this._item;
  }
  comment = '';
  list = [];
  items: string[] = [
    'Atif',
    'Bilal',
    'Noman',
    'Hassam',
    'Umar',
    'Shoaib',
    'Sheharyar',
    'Danish',
    'Daniyal',
    'Adil',
    'Hamza',
    'Hamdan',
    'Ahsan',
  ];
  canMention = false;
  profile: any;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    //this.randomListGenerate();
    this.getprofile();
    this.getComments();
    console.log('_item', this._item);
  }

  randomListGenerate() {
    for (var i = 0; i < this.item.comment_count; i++) {
      let p = this.makeid(5);
      this.list.push({
        avatar: p.charAt(0),
        name: p,
      });
    }
  }

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

  addComment() {
    if (!this.comment) {
      return;
    }

    this.createComment();
  }

  async createComment() {
    let res = await this.network.createComment({
      post_id: this._item.post_id,
      text: this.comment,
    });
    if (res && res.data) {
      this.utility.presentSuccessToast(res.message);
      this.getComments();
      this.comment = '';
    } else
      this.utility.presentFailureToast(res?.message ?? 'Something went wrong');
  }

  onMentioned(item) {
    this.comment += item;
    this.canMention = false;
  }

  onChanged($event) {
    console.log('Changed');
    console.log(this.comment);
    if (
      this.comment &&
      this.comment.includes('@') &&
      this.comment.substring(this.comment.length - 1) == '@'
    )
      this.canMention = true;
    else this.canMention = false;
  }

  async getprofile() {
    const profile = await this.network.profile();
    console.log('USER_PROFILE', profile);
    this.profile = profile.data;
    this.getFollowerList();
  }

  async getComments() {
    const res = await this.network.getPostComments(this._item.post_id);
    console.log('getComments', res);
    this.list = res.data.item;
  }

  async getFollowerList() {
    const follower_list = await this.network.getFollowerList(this.profile.id);
    console.log(follower_list);
    this.items = follower_list.data.item?.map((x) => x.name);
    console.log(this.items);
  }

  async likeUnlikeComment(item) {
    let res = await this.network.likeUnlikePostComment(
      this._item.post_id,
      item.id
    );
    if (res && res.data) item.is_like = !item.is_like;
  }
}
