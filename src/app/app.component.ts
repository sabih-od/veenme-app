import { Component } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { NavService } from './services/basic/nav.service';
import { UserService } from './services/user.service';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Router } from '@angular/router';
import { UtilityService } from './services/utility.service';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  notification_count: number;
  // notification_call_interval;
  constructor(
    public utility: UtilityService,
    private modalController: ModalController,
    private router: Router,
    public platform: Platform,
    private user: UserService,
    private nav: NavService,
    private menu: MenuController,
    private network: NetworkService
  ) {
    platform.ready().then(() => {
      this.beInitialize();
    });
    this.checkLogin();
    CapacitorGoogleMaps.initialize({
      key: 'AIzaSyBMJa73RYD3-HOwR9ndGWS3SxH9mp4qkJA',
    });
    this.getLatestNotifications();
    // this.notification_call_interval = setInterval(() => {
    //   this.getLatestNotifications();
    // }, 10000);
  }

  async getLatestNotifications() {
    const { data } = await this.network.getLatestNotification();
    const latest_notifications = data.item;
    this.notification_count = latest_notifications.length;
  }

  checkLogin() {
    this.user.getToken().then((token) => {
      if (token) {
        this.nav.setRoot('home');
      }
    });
  }

  goTo(route) {
    this.nav.setRoot(route);
    this.menu.close();
  }

  logOut() {
    localStorage.removeItem('token');
    this.menu.close();
    this.nav.setRoot('register');
  }

  beInitialize() {
    document.addEventListener(
      'backbutton',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        const url = this.router.url;
        console.log(url);
        this.createBackRoutingLogics(url);
      },
      false
    );
  }

  async createBackRoutingLogics(url) {
    if (
      url.includes('login') ||
      url.includes('signup') ||
      url.includes('dashboard') ||
      url.includes('tutorial')
    ) {
      this.utility.hideLoader();
      const isModalOpen = await this.modalController.getTop();
      if (isModalOpen) {
        this.modalController.dismiss({ data: 'A' });
      } else {
        this.exitApp();
      }
    }
  }

  exitApp() {
    navigator['app'].exitApp();
  }
}
