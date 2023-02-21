import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage extends BasePage implements OnInit {
  isLoading = true;
  messages = [];
  user;
  text;
  receiver_id;
  @ViewChild('content') private content: IonContent;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.getprofile();
    this.receiver_id = this.nav.getQueryParams()?.receiver_id;
  }

  async getprofile() {
    const profile = await this.network.profile();
    console.log('USER_PROFILE', profile);
    this.user = profile.data;
    this.getData();
  }

  async getData() {
    let res = await this.network.getMessages(this.receiver_id);
    console.log('USER is', this.user);
    this.messages = res?.data?.item?.sort((a, b) => {
      return (
        new Date(b.created).getMilliseconds() -
        new Date(a.created).getMilliseconds()
      );
    });
    this.isLoading = false;
    this.scrollToBottom();
  }

  async sendMessage() {
    if (!this.text) return;
    let res = await this.network.sendMessage({
      message: this.text,
      receiver_id: this.receiver_id,
    });
    if (res && res.data) this.getData();
  }

  scrollToBottom() {
    let self = this;
    setTimeout(() => {
      self.content.scrollToBottom();
    }, 500);
  }
}
