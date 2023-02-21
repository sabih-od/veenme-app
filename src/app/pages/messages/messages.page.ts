import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage extends BasePage implements OnInit {
  list;
  profile;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.getprofile();
  }

  async getData() {
    let res = await this.network.getFollowerList(this.profile.id);
    let _res = await this.network.getFollowingList(this.profile.id);
    let array1: [] = res?.data?.item ?? [];
    let array2 = _res?.data?.item;
    this.list = array2; //[...new Set([...array1, ...array2])];
  }

  async getprofile() {
    const profile = await this.network.profile();
    console.log('USER_PROFILE', profile);
    this.profile = profile.data;
    this.getData();
  }

  showMessages(id) {
    this.nav.push('chat', { receiver_id: id });
  }
}
