import { HttpClient } from '@angular/common/http';
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
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { VeenDetailsComponent } from 'src/app/components/veen-details/veen-details.component';
import { mapStyle } from 'src/app/config/mapStyle';
import { GeolocationsService } from 'src/app/services/geolocations.service';
import { BasePage } from '../base-page/base-page';
import { GmapComponent } from './gmap/gmap.component';
import { VeenStepsComponent } from './veen-steps/veen-steps.component';
import { VeenComponent } from './veen/veen.component';

declare const google;

@Component({
  selector: 'app-veenme',
  templateUrl: './veenme.page.html',
  styleUrls: ['./veenme.page.scss'],
})
export class VeenmePage
  extends BasePage
  implements OnInit, AfterViewInit, ViewWillEnter
{
  address: any = '';
  latitude = 0;
  longitude = 0;
  staticMap = '';
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

  @ViewChild('content') content: IonContent;

  constructor(
    injector: Injector,
    private geolocation: GeolocationsService,
    private http: HttpClient
  ) {
    super(injector);
  }
  ionViewWillEnter() {
    this.getNearbyVeens();
    //  this.modals.present(VeenDetailsComponent);
  }

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
        zoom: 14,
        center: mylocation,
        styles: mapStyle,
      });
      console.log(mylocation);
      resolve({ mylocation });
    });
  }
  async initMap(val) {
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
  }

  async getNearbyVeens() {
    const location: any =
      await this.geolocation.getCurrentLocationCoordinates();
    let data = {
      latitude: location.lat, //24.8780324,
      longitude: location.lng, //67.0686896,
    };
    console.log('LOCATION', data);

    let res = await this.network.getNearbyVeens(data);
    console.log(res);
    const image = 'assets/icon/veen.png';
    let self = this;
    if (res && res.data) {
      res.data.forEach((element) => {
        let LatLng = {
          lat: parseFloat(element.latitude),
          lng: parseFloat(element.longitude),
        };
        console.log('LatLng', LatLng);

        let marker = new google.maps.Marker({
          position: LatLng,
          // map: self.map,
          draggable: false,
          icon: image,
          data: element,
          // title: 'Destination'
        });

        marker.addListener('click', async () => {
          this.showVeen(marker.data);
        });
      });
    }
  }

  async showVeen(item) {
    console.log(item);
    let veen = await this.network.getVeenById(item.id);
    console.log('Veen', veen);

    let res = await this.modals.present(VeenDetailsComponent, {
      item: {
        ...veen.data,
        user_profile_image: this.image.getUserImage(item.profile_image),
      },
      // {
      //   ...item,
      //   user_profile_image: this.image.getUserImage(item.profile_image),
      // },
    });
    console.log(res);
  }

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
          // self.utility.presentToast(self.paddress);

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

  ngOnInit() {}

  async openGeomap() {
    // const res = await this.modals.present(GmapComponent);
    // console.log(res);
    // const data = res.data;
    const data = this._location;
    console.log('openGeomap', data);

    if (data && data.address) {
      this.address = data.address;
      this.latitude = data.lat;
      this.longitude = data.lng;
      this.place_id = data.place_id;
      this.moreSteps();
    }
  }

  async moreSteps() {
    await this.modals.present(VeenStepsComponent, {
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      place_id: this.place_id,
    });
  }

  calculateWidthHeight() {
    this.content?.getScrollElement().then((scrollElement) => {
      let width = scrollElement.clientWidth;
      let height = scrollElement.clientHeight;
      this.staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=North+Karachi&zoom=18&scale=1&size=${width}x${height}&maptype=roadmap&key=AIzaSyBMJa73RYD3-HOwR9ndGWS3SxH9mp4qkJA&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7CNorth+Karachi&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7CNorth+Karachi`;
    });
  }

  openModal() {
    //   if (isAction) {
    //     this.modals.dismiss(this._location);
    //     // this._location = this._location;
    //     this.updateLocation.emit(this._location);
    //   } else this.modals.dismiss();
    // }
    const data = this._location;
    console.log('openGeomap', data);

    if (data && data.address) {
      this.address = data.address;
      this.latitude = data.lat;
      this.longitude = data.lng;
      this.place_id = data.place_id;
      this.moreSteps();
    }
  }
}
