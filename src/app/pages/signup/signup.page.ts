import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import { StringsService } from 'src/app/services/basic/strings.service';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends BasePage implements OnInit {
  signupObj = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    gender: 'm',
  };

  loading = false;

  aForm: FormGroup;

  constructor(injector: Injector, private strings: StringsService) {
    super(injector);
    this.setupForm();
  }

  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      fname: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],
      lname: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      dob: ['', Validators.compose([Validators.required])],
      gender: [
        this.signupObj.gender,
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit() {}

  async singUp() {
    if (this.aForm.invalid) {
      this.utility.presentFailureToast('Pleae fill all fields properly');
      return;
    }

    const formdata = this.aForm.value;

    console.log(formdata);

    formdata['phone'] = '+1' + this.strings.getOnlyDigits(formdata['phone']);

    console.log(formdata);

    this.loading = true;

    const { data } = await this.network.register(formdata);

    console.log(data);

    if (data) {
      const res = await this.user.setToken(data.token);
      console.log('RES', res);

      if (res) {
        this.modals.dismiss({ data: res });
      }
      // await Browser.open({ url: `https://dev-veenme.thesupportonline.net/testtoken/${data.token}` });
    }

    this.loading = false;

    this.utility.presentSuccessToast('Success');
  }

  onTelephoneChange(ev) {
    if (ev.inputType !== 'deleteContentBackward') {
      const utel = this.utility.onkeyupFormatPhoneNumberRuntime(
        ev.target.value,
        false
      );
      console.log(utel);
      ev.target.value = utel;
      this.aForm.controls['phone'].patchValue(utel);
      // ev.target.value = utel;
    }
  }
}
