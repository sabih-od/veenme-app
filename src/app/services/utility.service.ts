import { Injectable } from '@angular/core';
import { AlertsService } from './basic/alerts.service';
import { LoadingService } from './basic/loading.service';
import { StringsService } from './basic/strings.service';
import { GeolocationsService } from './geolocations.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    public loading: LoadingService,
    public alerts: AlertsService,
    public strings: StringsService,
    public geolocations: GeolocationsService,
    private launchNavigator: LaunchNavigator,
  ) { }

  showLoader(msg = 'Please wait...') {
    return this.loading.showLoader(msg);
  }

  hideLoader() {
    return this.loading.hideLoader();
  }

  showAlert(msg, heading = 'Alert') {
    return this.alerts.showAlert(msg , heading);
  }

  presentToast(msg) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(okText = 'OK', cancelText = 'Cancel', title = 'Are You Sure?', message = ''): Promise<boolean> {
    return this.alerts.presentConfirm(okText = okText, cancelText = cancelText, title = title, message = message);
  }

  onkeyupFormatPhoneNumberRuntime(phoneNumber, last = true) {
    return this.strings.formatPhoneNumberRuntime(phoneNumber);
  }


  /* Geolocations */

  public openDirectionInMap(destination) {
    this.launchNavigator.navigate(destination);
  }

  getCoordsForGeoAddress(address, _default = true) {
    return this.geolocations.getCoordsForGeoAddress(address, _default = true)
  }

  getCoordsViaHTML5Navigator() {
    return this.geolocations.getCoordsViaHTML5Navigator();
  }

  getCurrentLocationCoordinates() {
    return this.geolocations.getCurrentLocationCoordinates();
  }



}
