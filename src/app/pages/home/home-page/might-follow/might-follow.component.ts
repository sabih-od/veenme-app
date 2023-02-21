import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-might-follow',
  templateUrl: './might-follow.component.html',
  styleUrls: ['./might-follow.component.scss'],
})
export class MightFollowComponent extends BasePage implements OnInit {
  might_follow_list: any = [];
  might_follow_loading = false;
  might_follow_page = 1;
  isLoading = true;
  searchText = '';
  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    console.log(this.searchText);
    const might_follow = await this.network.getMightFollowList(
      this.might_follow_page,
      this.searchText
    );
    this.isLoading = false;
    this.might_follow_list = might_follow.data.item;
  }

  close() {
    this.modals.dismiss();
  }

  async loadMoreMightFollow() {
    this.might_follow_loading = true;
    this.might_follow_page++;
    console.log(this.might_follow_page);
    let res = await this.network.getMightFollowList(
      this.might_follow_page,
      this.searchText
    );
    console.log(res);
    this.might_follow_list = this.might_follow_list.concat(res.data.item);
    this.might_follow_loading = false;
  }

  async followUser(user) {
    console.log(user);
    const res = await this.network.followUser(user.id);
    this.utility.presentSuccessToast(res.message);
    this.getData();
  }

  openUserProfile(item) {
    console.log(item);
    this.modals.dismiss({ data: 'A' });
    this.nav.navigateTo('profile', {
      queryParams: { username: item.username },
    });
  }
}
