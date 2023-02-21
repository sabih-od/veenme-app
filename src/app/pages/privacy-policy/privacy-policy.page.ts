import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage extends BasePage implements OnInit {

  url = 'https://dev-veenme.thesupportonline.net/privacy';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  openURL(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
