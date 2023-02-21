import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage extends BasePage implements OnInit {

  url = 'https://dev-veenme.thesupportonline.net/terms';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  openURL(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
