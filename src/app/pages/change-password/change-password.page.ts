import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage extends BasePage implements OnInit {
  oldPassword;
  newPassword;
  confirmPassword;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.isNotEmpty()) {
      let data = {
        old_password: this.oldPassword,
        new_password: this.newPassword,
        confirm_password: this.confirmPassword,
      };
      let response = await this.network.changePassword(data);
      if (response && response.success === true) {
        this.utility.alerts.presentToast('Password changed successfully!');
        this.nav.pop();
      } else {
        this.utility.alerts.presentToast(
          response && response.message ? response.message : 'Unknown error'
        );
      }
    } else this.utility.alerts.presentToast('Please fill out fields');
  }

  isNotEmpty(): boolean {
    return (
      this.oldPassword &&
      this.oldPassword != '' &&
      this.newPassword &&
      this.newPassword !== '' &&
      this.confirmPassword &&
      this.confirmPassword !== ''
    );
  }
}
