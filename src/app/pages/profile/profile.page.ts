import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonContent, ViewDidEnter } from '@ionic/angular';
import { FullSizeGalleryComponent } from 'src/app/components/full-size-gallery/full-size-gallery.component';
import { VeenDetailsComponent } from 'src/app/components/veen-details/veen-details.component';
import { mapStyle } from 'src/app/config/mapStyle';
import { GeolocationsService } from 'src/app/services/geolocations.service';
import { BasePage } from '../base-page/base-page';
import { CommentsComponent } from '../home/home-page/comments/comments.component';
import { MightFollowComponent } from '../home/home-page/might-follow/might-follow.component';
import { PeopleAreVeeningComponent } from '../home/home-page/people-are-veening/people-are-veening.component';
declare const google;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends BasePage implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('content') content: IonContent;
  isLoading = false;
  profile: any;
  gallery: any;
  following_list: any;
  follower_list: any;
  posts: any;
  isOwnProfile = true;
  showInfoTextField = false;
  showInterestTextField = false;
  isFollowing = false;
  currentUser;
  veens = [];
  map: any;

  segment = 'gallery';

  constructor(injector: Injector, private geolocation: GeolocationsService) {
    super(injector);
  }

  async ngOnInit() {
    await this.init();
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initializeMapBeforeSetCoordinates().then((v) => {
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
    let self = this;
    return new Promise(async (resolve) => {
      const mylocation = await self.geolocation.getCurrentLocationCoordinates();
      self.map = new google.maps.Map(this.mapElement?.nativeElement, {
        zoom: 1,
        center: mylocation,
        styles: mapStyle,
      });
      resolve({ mylocation });
    });
  }

  async showVeens(res) {
    const image = 'assets/icon/veen.png';
    let self = this;
    if (res && res.data) {
      res.data.item.forEach((element) => {
        let LatLng = {
          lat: parseFloat(element.latitude),
          lng: parseFloat(element.longitude),
        };
        let marker = new google.maps.Marker({
          position: LatLng,
          map: self.map,
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
    let veen = await this.network.getVeenById(item.id);

    let res = await this.modals.present(VeenDetailsComponent, {
      item: {
        ...veen.data,
        // user_profile_image: this.image.getUserImage(item.profile_image),
      },
      // {
      //   ...item,
      //   user_profile_image: this.image.getUserImage(item.profile_image),
      // },
    });
    console.log(res);
  }

  async init() {
    this.isLoading = true;
    const profile = await this.network.profile();
    this.currentUser = profile.data;

    const username = this.nav.getQueryParams().username;

    if (username && username != profile.data.username) {
      await this.getUser(username);
    } else {
      this.profile = profile.data;
      this.getUserVeens();
    }

    const gallery = await this.network.getUserGallery(this.profile.id);
    this.gallery = gallery.data.item;

    await this.getFollowingList();
    await this.getFollowerList();

    const posts = await this.network.getPosts();
    this.posts = posts.data.item;
    this.isLoading = false;
  }

  async getFollowingList() {
    const following_list = await this.network.getFollowingList(this.profile.id);
    this.following_list = following_list.data.item;
  }

  async getFollowerList() {
    const follower_list = await this.network.getFollowerList(this.profile.id);
    this.follower_list = follower_list.data.item;
    let isFollowing = this.follower_list.filter(
      (x) => x.user_id === this.currentUser.id
    );
    this.isFollowing = isFollowing && isFollowing.length > 0;
  }

  async getUser(username) {
    let res = await this.network.getUserByUsername(username);
    this.isOwnProfile = false;
    this.profile = res.data;
    this.getUserVeens();
  }

  async getUserVeens() {
    const res = await this.network.getUserVeens(this.profile.id);
    console.log('getUserVeens', res);
    if (res && res.data) {
      this.veens = res.data.item;
      this.showVeens(res);
    }
  }

  followUnfollowUser() {
    if (this.isFollowing) this.unFollowUser(this.profile.id);
    else this.followUser();
  }

  async unFollowUser(id) {
    const res = await this.network.unFollowUser(id);
    this.utility.presentSuccessToast(res.message);
    this.getFollowingList();
    this.isFollowing = false;
  }

  async followUser() {
    const res = await this.network.followUser(this.profile.id);
    this.utility.presentSuccessToast(res.message);
    this.isFollowing = true;
  }

  toggleTextField(field) {
    if (field == 'info') {
      this.showInfoTextField = !this.showInfoTextField;
    } else if (field == 'interest') {
      this.showInterestTextField = !this.showInterestTextField;
    }
  }

  async save(field) {
    const data = {
      info: this.profile.info,
      interset: this.profile.interset,
    };

    this.toggleTextField(field);

    const res = await this.network.updateUserInfo(data);
    this.utility.presentSuccessToast(res.message);
  }

  async changeProfile() {
    if (!this.isOwnProfile) {
      return;
    }

    const res = await this.doGetPicture();
    if (res) {
      this.utility.presentSuccessToast('Image Uploaded');
      this.init();
    }
  }

  async doGetPicture() {
    return new Promise(async (resolve) => {
      let _img = await this.image.getPhotos();
      var blob;
      console.log(_img);
      if (_img && _img.isBase64) {
        blob = await this.image.b64toBlob(
          _img['base64String'],
          'image/' + _img['format']
        );
        let res = await this.imageReceived(blob);
        resolve(res);
      } else {
        setTimeout(async () => {
          console.log(_img.blobs);
          let blob = _img?.blobs[0];
          console.log(blob);
          let res = await this.imageReceived(blob);
          resolve(res);
        }, 1000);
      }
    });
  }

  //End Camera and Album related work
  imageReceived(uri) {
    return new Promise(async (resolve) => {
      if (!uri || uri === '') return;
      let formData = new FormData();
      formData.append('file', uri);
      const response = await this.network.uploadProfilePic(formData);
      console.log(response);
      resolve(response);
    });
  }

  userClicked(item) {
    // this.nav.na
    // this.nav.pop();
    this.nav.setQueryParams({ username: item.username });
    // this.nav.push("profile", {username: item.username})
    // console.log(item);
    this.init();
  }

  async itemLikeToggled(item) {
    let response = await this.network.likeUnlikePost(item.id);
    if (response && response.success === true) {
      item.is_like = !item.is_like;
      if (item.is_like === true) item.like_count++;
      else item.like_count--;
    }
  }

  openComments(item) {
    this.modals.present(CommentsComponent, { item }).then((res) => {
      this.getUserVeens();
    });
  }

  openUserProfile(item) {
    console.log(item);
    this.nav.navigateTo('profile', {
      queryParams: { username: item.username },
    });
  }

  peopleVeening() {
    this.modals.present(PeopleAreVeeningComponent);
  }

  mightFollow() {
    this.modals.present(MightFollowComponent);
  }

  openGallery($event) {
    let images = $event;
    console.log(images.length);
    this.modals.present(FullSizeGalleryComponent, { images: images });
  }
}
