import { Component, Injector } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { StringsService } from 'src/app/services/basic/strings.service';
import { BasePage } from '../base-page/base-page';
import { LoginPage } from '../login/login.page';
import { SignupPage } from '../signup/signup.page';

import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage extends BasePage {
  // step = 1;
  isLoggedIn = false;
users = {
    id: '',
    name: '',
    email: '',
    picture: {
        data: {
            url: ''
        }
    }
};

  constructor(
    injector: Injector,
    private strings: StringsService,
    private googlePlus: GooglePlus,
    private fb: Facebook
  ) {
    super(injector);
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }
  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }


  async loginWithGoogle() {
    console.log('loginWithGoogle');

    try {
      const resResult = await this.googlePlus.login({}); // { user: null };
      console.log('loginWithGoogle', resResult);

      if (resResult && resResult.email) {
        let res = {
          user: {
            displayName: resResult['displayName']
              ? resResult['displayName']
              : resResult['userId'],
            email: resResult['email'],
            uid: resResult['userId'],
          },
        };

        this.signUpwithSocial(res, 'google');
      }
    } catch (err) {
      console.error(err);
    }
  }

  // async loginWithFacebook() {
  //   try {
  //     const FACEBOOK_PERMISSIONS = [
  //       'email',
  //       'user_birthday',
  //       'user_photos',
  //       'user_gender',
  //     ];

  //     var accessToken = null;
  //     var result = await FacebookLogin.getCurrentAccessToken();

  //     console.log(result);

  //     if (!result || !result.accessToken) {
  //       result = await FacebookLogin.login({
  //         permissions: FACEBOOK_PERMISSIONS,
  //       });

  //       if (result.accessToken) {
  //         // Login successful.
  //         console.log(`Facebook access token is ${result.accessToken.token}`);

  //         accessToken = result.accessToken;
  //       }
  //     } else {
  //       accessToken = result.accessToken;
  //     }

  //     const resResult = await FacebookLogin.getProfile({
  //       fields: ['id', 'name', 'email', 'gender'],
  //     });

  //     console.log('Facebook user is', resResult);

  //     let res = {
  //       user: {
  //         displayName: resResult['name'] ? resResult['name'] : resResult['id'],
  //         email: resResult['email']
  //           ? resResult['email']
  //           : resResult['id'] + '@email.com',
  //         uid: resResult['id'],
  //         dob: new Date(2003, 1, 1, 0, 0, 0, 0).toUTCString(),
  //       },
  //     };

  //     console.log(res);
  //     if (res) {
  //       this.signUpwithSocial(res, 'fb');
  //       // await Browser.open({ url: `https://dev-veenme.thesupportonline.net/testtoken/${token}` });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async openLogin() {
    const res = await this.modals.present(LoginPage);
    console.log(res);
    if (res.data.data != 'A') {
      this.nav.setRoot('home');
    }
  }

  async openSignup() {
    const res = await this.modals.present(SignupPage);
    this.nav.setRoot('home');
  }

  signUpwithSocial(data, social) {
    return new Promise(async (resolve) => {
      console.log(data);

      if (social == 'google') {
        const user = data.user;

        let name = this.strings.parseName(user.displayName);

        var obj1 = {
          fname: name['firstName'],
          lname: name['lastName'],
          email: user.email ? user.email : user.uid + '@email.com',
          phone: '+1',
          dob: new Date(2003, 1, 1, 0, 0, 0, 0).toISOString(),
          gender: 'm',
        };

        const dd = await this.network.sociallogin(obj1);
        console.log(dd);
        const d = dd.data;
        if (d) {
          const res = await this.user.setToken(d.token);
          localStorage.setItem('token', d.token);
          this.nav.setRoot('home');
          // await Browser.open({ url: `https://dev-veenme.thesupportonline.net/testtoken/${data.token}` });
        }
      }

      if (social == 'fb') {
        const user = data.user;
        let name = this.strings.parseName(user.displayName);

        var obj1 = {
          fname: name['firstName'],
          lname: name['lastName'],
          email: user.email ? user.email : user.uid + '@email.com',
          phone: '+1',
          dob: new Date(2003, 1, 1, 0, 0, 0, 0).toISOString(),
          gender: 'm',
        };

        const dd = await this.network.sociallogin(obj1);
        const d = dd.data;
        if (d) {
          const res = await this.user.setToken(d.token);
          localStorage.setItem('token', d.token);
          this.nav.setRoot('home');
          // await Browser.open({ url: `https://dev-veenme.thesupportonline.net/testtoken/${data.token}` });
        }
      }
    });
  }
}
