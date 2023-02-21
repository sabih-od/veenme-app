import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../pages/base-page/base-page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-web',
  templateUrl: './web.page.html',
  styleUrls: ['./web.page.scss'],
})
export class WebPage extends BasePage implements OnInit, AfterViewInit {

  token = '';
  url = '';
  loaded = false;
  constructor(injector: Injector, public sanitizer: DomSanitizer, private iab: InAppBrowser, public activatedRoute: ActivatedRoute) {
    super(injector);



  }
  ngAfterViewInit(): void {

    console.log(this.getParams());
    this.token = this.getQueryParams().token;
    this.url = this.getQueryParams().url;

    // this.url = url ? url : 'https://dev-veenme.thesupportonline.net/testtoken/' + this.token;
    // console.log(this.url);

    this.loaded = true;
    // const browser = this.iab.create(this.url,'_self',

    //   {
    //     location : 'no',//Or 'no'
    //     hidden : 'yes', //Or  'yes'
    //     zoom : 'no',//Android only ,shows browser zoom controls
    //     hideurlbar:'yes',//Or 'no'
    //     hidenavigationbuttons: 'no',
    //     toolbar: 'no'
    //   }


    // ); /*3*/

  }

  openURL(){

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

  }

  ngOnInit() {
  }

  getParams() {
    return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }



}
