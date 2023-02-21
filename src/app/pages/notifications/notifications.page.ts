import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage implements OnInit {

  isLoading = true;
  notifications: any;

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    await this.getNotifications();
  }
  
  openUserProfile(item) {
    console.log(item);
    this.nav.navigateTo('profile', { queryParams: { username: item.username } })
  }

  async getNotifications() {
    const res = await this.network.getNotifications();
    console.log(res);
    this.notifications = res.data.item;
    this.isLoading = false;
  }

  showPost(item) {
    console.log("Post_detail", item);
    this.nav.push('post-detail', { post_id: item.id });
    
  }
}
