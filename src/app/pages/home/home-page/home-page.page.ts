import { Component, Injector, OnInit } from '@angular/core';
import { FullSizeGalleryComponent } from 'src/app/components/full-size-gallery/full-size-gallery.component';
import { BasePage } from '../../base-page/base-page';
import { PlacesDetailsComponent } from '../places/places-details/places-details.component';
import { CommentsComponent } from './comments/comments.component';
import { MightFollowComponent } from './might-follow/might-follow.component';
import { PeopleAreVeeningComponent } from './people-are-veening/people-are-veening.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage extends BasePage implements OnInit {
  page = 1;
  list = [];
  might_follow_list = [];
  people_are_veening = [];
  might_follow_loading = false;
  might_follow_page = 1;
  isLoading = true;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    //this.nav.push("messages");
  }

  ionViewWillEnter() {
    this.initialize();
  }

  async initialize() {
    this.isLoading = true;
    const res = await this.network.getPublicPosts(this.page);
    console.log('HomePage Initialize', res);
    let data = res.data;

    this.list = data.item;
    this.isLoading = false;
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
      this.initialize();
    });
  }

  openUserProfile(item) {
    console.log('openUserProfile', item);

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

  openPlace(item) {
    console.log('ITEM is', item);
    this.modals.present(PlacesDetailsComponent, { item });
  }

  openGallery($event) {
    let images = $event;
    this.data.images = images;
    this.nav.push('images');
    //this.modals.present(FullSizeGalleryComponent, { images: images });
  }
}
