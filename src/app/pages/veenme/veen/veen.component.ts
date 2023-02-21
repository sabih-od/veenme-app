import { Component, Injector, Input, OnInit } from '@angular/core';
import { FullSizeGalleryComponent } from 'src/app/components/full-size-gallery/full-size-gallery.component';
import { BasePage } from '../../base-page/base-page';
import { CommentsComponent } from '../../home/home-page/comments/comments.component';
import { MightFollowComponent } from '../../home/home-page/might-follow/might-follow.component';
import { PeopleAreVeeningComponent } from '../../home/home-page/people-are-veening/people-are-veening.component';

@Component({
  selector: 'app-veen',
  templateUrl: './veen.component.html',
  styleUrls: ['./veen.component.scss'],
})
export class VeenComponent extends BasePage implements OnInit {
  _item;
  @Input() set item(val) {
    this._item = val;
  }

  get item() {
    return this._item;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  close() {
    this.modals.dismiss();
  }

  async itemLikeToggled(item) {
    let response = await this.network.likeUnlikePost(item.id);
    if (response && response.success === true) {
      item.is_like = !item.is_like;
      if (item.is_like === true) item.like_count++;
      else item.like_count--;
    }
  }

  async openComments(item) {
    let res = await this.modals.present(CommentsComponent, { item });
    this.getVeen();
  }

  async openUserProfile(item) {
    console.log(item);
    this.nav.navigateTo('profile', {
      queryParams: { username: item.username },
    });
    this.close();
  }

  async peopleVeening() {
    await this.modals.present(PeopleAreVeeningComponent);
    await this.close();
  }

  async mightFollow() {
    await this.modals.present(MightFollowComponent);
  }

  async openGallery($event) {
    let images = $event;
    console.log(images.length);
    await this.modals.present(FullSizeGalleryComponent, { images: images });
  }

  async getVeen() {
    let veen = await this.network.getVeenById(this.item.id);
    console.log('Veen', veen);
    this.item = {
      ...veen.data,
      user_profile_image: this.item.user_profile_image,
    };
  }
}
