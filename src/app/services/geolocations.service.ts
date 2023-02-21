import { Injectable } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Geolocation } from '@capacitor/geolocation';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

// declare var google;

@Injectable({
  providedIn: 'root',
})
export class GeolocationsService {
  // private geolocation: Geolocation
  constructor(
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation
  ) {}

  getCoordsForGeoAddress(address, _default = true) {
    //   var self = this;
    //   return new Promise((resolve) => {
    //     var self = this;
    //     var geocoder = new google.maps.Geocoder();
    //     geocoder.geocode({ address: address }, function (results, status) {
    //       if (status === 'OK') {
    //         if (results[0]) {
    //           var loc = results[0].geometry.location;
    //           var lat = loc.lat();
    //           var lng = loc.lng();
    //           resolve({ lat: lat, lng: lng });
    //         } else {
    //           resolve(null);
    //         }
    //       } else {
    //         console.log({ results, status });
    //         resolve(null);
    //       }
    //     });
    //   });
  }

  getCoordsViaHTML5Navigator() {
    //   return new Promise((resolve) => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         function (position) {
    //           var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           };
    //           resolve(pos);
    //         },
    //         function () {
    //           resolve({ lat: 51.5074, lng: 0.1278 });
    //         }
    //       );
    //     } else {
    //       // Browser doesn't support Geolocation
    //       resolve({ lat: 51.5074, lng: 0.1278 });
    //     }
    //   });
  }

  getCurrentLocationCoordinates() {
    return new Promise(async (resolve) => {
      // // let coords = await this.geolocation.getCurrentPosition();

      this.geolocation
        .getCurrentPosition()
        .then(async (coordinates) => {
          // resp.coords.latitude
          // resp.coords.longitude
          // const coordinates = await Geolocation.getCurrentPosition();
          const lt = coordinates.coords.latitude;
          const lg = coordinates.coords.longitude;

          //await this.reverserGeocode(lt, lg);
          resolve({ lat: lt, lng: lg });
        })
        .catch((error) => {
          console.log('Error getting location', error);
          resolve({ lat: 31.0, lng: -100.0 });
        });
    });
  }

  reverserGeocode(lat, lng) {
    return new Promise((resolve) => {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
      };

      this.nativeGeocoder
        .reverseGeocode(lat, lng, options)
        .then(
          (result: NativeGeocoderResult[]) => {
            console.log(JSON.stringify(result[0]));
            resolve(result[0]);
          },
          (err) => {
            console.log(err);
            resolve(null);
          }
        )
        .catch((error: any) => {
          console.log(error);
          resolve(null);
        });
    });
  }
}
