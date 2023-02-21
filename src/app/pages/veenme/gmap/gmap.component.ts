import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GeolocationsService } from 'src/app/services/geolocations.service';
import { BasePage } from '../../base-page/base-page';
declare const google;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent extends BasePage implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('searchbox', { read: ElementRef }) searchbar: ElementRef;
  @Input() newAddress = false;
  @Input() isDirections = false;
  @Output('updateLocation') updateLocation: EventEmitter<any> =
    new EventEmitter<any>();
  place_id;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  myLatLng: any;
  mmarker: any;
  paddress: string;
  searchQuery = '';
  items: string[];
  isBothDirectionsAvailable = false;
  iOrigin;
  _location: any;
  iDestination;

  constructor(injector: Injector, private geolocation: GeolocationsService) {
    super(injector);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initializeMapBeforeSetCoordinates().then((v) => {
        this.initMap(v);

        // setTimeout(async () => {

        //   // const active = localStorage.getItem('google_map');
        //   // if (!active) {
        //   //   const flag = await this.utility.presentConfirm('Thanks', 'Remind Later', 'How To Use', 'In the search field, type in the new address and press enter. You can also hold your finger and drag to new location, then press the + symbol in the top right corner');
        //   //   localStorage.setItem('google_map', `${flag}`);
        //   // }

        // }, 1000);
      });
    });
  }

  initializeMapBeforeSetCoordinates() {
    return new Promise(async (resolve) => {
      console.log('current location before');
      const mylocation = await this.geolocation.getCurrentLocationCoordinates();
      console.log('current location after');
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: mylocation,
      });

      console.log(mylocation);
      resolve({ mylocation });
      // this.geolocation.getCoordsForGeoAddress(this.myAddress)
      //   .then(coords => {
      //     resolve({
      //       mylocation,
      //       destinatioLocation: coords
      //     });
      //   }, err => {
      //     console.log(err);
      //     this.utility.presentFailureToast('Destination Not Found for given address');
      //     resolve({
      //       mylocation,
      //       destinatioLocation: null
      //     });
      //   });
    });
  }

  initMap(val) {
    var self = this;

    // this.map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 13,
    //   center: localatlong
    // });

    console.log('Here is init function', val);
    // if (this.isDirections == false) {
    this.mmarker = new google.maps.Marker({
      position: val.mylocation,
      map: this.map,
      draggable: true,
      title: 'Destination',
    });

    this.map.setCenter(val.mylocation);

    this.getMarkerLocation();

    google.maps.event.addListener(this.mmarker, 'dragend', (event) => {
      const lt = event.latLng.lat();
      const lg = event.latLng.lng();
      const coords = { lat: lt, lng: lg };
      self.getMarkerLocation(coords);
    });

    setTimeout(() => {
      this.setSearchBox();
    }, 1000);

    // }
  }

  setSearchBox() {
    const self = this;
    const searchInput =
      this.searchbar.nativeElement.querySelector('.searchbar-input');
    console.log('Search input', searchInput);
    const searchBox = new google.maps.places.SearchBox(searchInput);
    let markers = [];

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      self.mmarker.setMap(null);
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          // console.log("Returned place contains no geometry");
          return;
        }

        // Create a marker for each place.
        self.mmarker = new google.maps.Marker({
          position: place.geometry.location,
          map: self.map,
          draggable: true,
          // title: 'Destination'
        });

        this.getMarkerLocation();

        google.maps.event.addListener(this.mmarker, 'dragend', (event) => {
          const lt = event.latLng.lat();
          const lg = event.latLng.lng();
          const coords = { lat: lt, lng: lg };
          self.getMarkerLocation(coords);
        });

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      self.map.fitBounds(bounds);
    });
  }

  getGeoAddress(coords) {
    const self = this;
    const geocoder = new google.maps.Geocoder();
    const latlng = coords;
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          self.paddress = results[0].formatted_address;
          self.utility.presentToast(self.paddress);
        } else {
          self.utility.presentToast('No results found');
        }
      } else {
        self.utility.presentToast('Geocoder failed due to: ' + status);
      }
    });
  }

  // getDirection() {
  //   this.utility.openDirectionInMap(this.myAddress);
  // }

  getMarkerLocation(_coords?) {
    const lt = this.mmarker.position.lat();
    const lg = this.mmarker.position.lng();

    let latlng;

    if (_coords) {
      latlng = _coords;
    } else {
      latlng = { lat: lt, lng: lg };
      console.log(latlng);
    }
    // const coords = { lat: lt, lng: lg };

    const self = this;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        // console.log(results);
        if (results[0]) {
          self.paddress = results[0].formatted_address;
          self.utility.presentToast(self.paddress);

          console.log(results);

          if (results[0]) {
            this.place_id = results[0].place_id;
          }

          if (self.newAddress == true) {
            const _addressComponets = results[0].address_components;
            // console.log(_addressComponets)
            const countryObject = _addressComponets.filter((x) =>
              x.types.includes('country')
            )[0];
            const country = countryObject ? countryObject.long_name : '';
            const stateObject = _addressComponets.filter((x) =>
              x.types.includes('administrative_area_level_1')
            )[0];
            const state = stateObject ? stateObject.long_name : '';
            const cityObject = _addressComponets.filter((x) =>
              x.types.includes('administrative_area_level_2')
            )[0];
            const city = cityObject ? cityObject.long_name : '';
            const streetObject = _addressComponets.filter((x) =>
              x.types.includes('route')
            )[0];
            const street = streetObject ? streetObject.long_name : '';

            // console.log(country);

            const threepartAddress = {
              country,
              state,
              city,
              street,
            };
            const coords2 = {
              lat: lt,
              lng: lg,
              address: self.paddress,
              place_id: this.place_id,
              parts: threepartAddress,
            };
            this._location = coords2;
            // self.utility.presentToast('Location Set :' + self.paddress);
            // self.closeModal(coords2);
          } else {
            const coords3 = {
              lat: lt,
              lng: lg,
              address: self.paddress,
              place_id: this.place_id,
            };
            this._location = coords3;
            // self.utility.presentToast('Location Set :' + self.paddress);
            // self.closeModal(coords3);
          }
        } else {
          self.utility.presentToast('No results found');
        }
      } else {
        self.utility.presentToast('Geocoder failed due to: ' + status);
      }
    });
  }

  closeModal(isAction) {
    if (isAction) {
      this.modals.dismiss(this._location);
      // this._location = this._location;
      this.updateLocation.emit(this._location);
    } else this.modals.dismiss();
  }
}
