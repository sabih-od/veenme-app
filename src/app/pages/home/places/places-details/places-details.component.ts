import { AfterViewInit, Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AddReviewComponent } from 'src/app/components/add-review/add-review.component';
import { mapStyle } from 'src/app/config/mapStyle';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { GeolocationsService } from 'src/app/services/geolocations.service';
declare const google;
@Component({
  selector: 'app-places-details',
  templateUrl: './places-details.component.html',
  styleUrls: ['./places-details.component.scss'],
})
export class PlacesDetailsComponent extends BasePage implements OnInit, AfterViewInit {
  @ViewChild('content') content: IonContent;
  @Input('item') item;
   @ViewChild('map', { static: false }) mapElement: ElementRef;
  reviews = [];
  page = 1;
  detail;
  mapimage = '';
  list = [];
  isLoading = true;
 map: any;
  constructor(injector: Injector, private geolocation: GeolocationsService,) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initializeMapBeforeSetCoordinates();
    });
  }

    initializeMapBeforeSetCoordinates() {
    return new Promise(async (resolve) => {
    
      const mylocation = {
        lat: parseFloat(this.item.latitude),
        lng: parseFloat(this.item.longitude)
      }
       const image = 'assets/icon/veen.png';
      console.log('current location after');
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 14,
        center: mylocation,
        styles: mapStyle,
      });
      console.log("My Location",mylocation);
      var marker = new google.maps.Marker({
      position: mylocation,
      map: this.map,
        title: 'Destination',
       icon: image,
    });

    this.map.setCenter(mylocation);
    });
  }

  async initialize() {
    const res = await this.network.getPlacesById(this.item.place_id);
    console.log(res);
    let data = res.data;
    this.detail = data;
    this.reviews = data.reviews;
    let scrollElement = await this.content.getScrollElement();
    console.log('clientWidth: ', scrollElement.clientWidth);
    let w = scrollElement.clientWidth;
    let h = parseInt((w / 2).toString(), 10);
    //this.mapimage = `https://maps.googleapis.com/maps/api/staticmap?markers=${this.item.latitude},${this.item.longitude}&size=${w}x${h}&key=AIzaSyBMJa73RYD3-HOwR9ndGWS3SxH9mp4qkJA`;
    console.log(this.mapimage);

    const posts = await this.network.getPublicPostsByPlaceId(
      this.item.place_id
    );
    this.list = posts.data.item;
    this.isLoading = false;
  }

  close() {
    this.modals.dismiss({ data: 'A' });
  }

  openUserProfile(item) {
    console.log(item);
    this.nav.navigateTo('profile', { queryParams: { username: item } });
    this.close();
  }

  async addReview() {
    let res = await this.modals.present(AddReviewComponent, {
      place_id: this.item.place_id,
    });
    console.log('addReview', res);

    if (res?.data?.success) this.initialize();
  }
}
