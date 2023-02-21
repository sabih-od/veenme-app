import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import { BasePage } from '../base-page/base-page';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {
  aForm: FormGroup;
  loading = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      email: [
        '', //mihejag949@cupbest.com
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '', //admin123
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
    });
  }

  async openSignup() {
    let res = await this.modals.present(SignupPage);
    if (res?.data?.data == true) {
      setTimeout(() => {
        this.nav.push('home/home-page');
        this.modals.dismiss({ respon: true });
      }, 200);
    }
  }

  async login() {
    if (this.aForm.invalid) {
      this.utility.presentFailureToast('Pleae fill all fields properly');
      return;
    }
    const formdata = this.aForm.value;
    this.loading = true;
    const { data } = await this.network.login(formdata);
    if (data) {
      const res = await this.user.setToken(data.token);
      localStorage.setItem('token', data.token);
      if (res) {
        this.modals.dismiss({ respon: res });
      }
    }
    this.loading = false;
  }
}
