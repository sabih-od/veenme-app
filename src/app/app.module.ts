import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilityService } from './services/utility.service';
import { LoginPageModule } from './pages/login/login.module';
import { SignupPageModule } from './pages/signup/signup.module';
import { FormBuilder } from '@angular/forms';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { MentionModule } from 'angular-mentions';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    LoginPageModule,
    SignupPageModule,
    MentionModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    FormBuilder,
    UtilityService,
    WebView,
    InAppBrowser,
    UtilityService,
    Geolocation,
    LaunchNavigator,
    NativeGeocoder,
    GooglePlus,
    Camera,
    File,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
