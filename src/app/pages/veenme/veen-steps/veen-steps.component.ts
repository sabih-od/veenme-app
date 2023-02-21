import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-veen-steps',
  templateUrl: './veen-steps.component.html',
  styleUrls: ['./veen-steps.component.scss'],
})
export class VeenStepsComponent extends BasePage implements OnInit {
  @Input() address: any = '';
  @Input() latitude = 0;
  @Input() longitude = 0;
  @Input() place_id = '';
  step = 1;
  activities: any;
  selectedCategoryId: number = 1;
  activityId: number = 1;
  comment: any = '';
  images = [];
  visibility = 'public';

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    await this.getActivities();
  }

  async getActivities(): Promise<any> {
    const { data } = await this.network.getActivities();
    this.activities = data.item;
    console.log(this.activities);
  }

  async veenNow() {
    let fileIds = [];

    this.images.forEach((element) => {
      fileIds.push(element['id']);
    });

    let data = {
      body: this.comment,
      activity_id: this.activityId,
      category_id: this.selectedCategoryId,
      location: this.address,
      longitude: this.longitude.toString(),
      latitude: this.latitude.toString(),
      place_id: this.place_id,
      files: fileIds,
      type: ['street_address'],
      visibility: this.visibility,
    };

    let result = await this.network.createPost(data);
    if (result && result.success === true) {
      await this.utility.showAlert('Success', 'Veen Posted');
      this.close();
    }
  }

  close() {
    this.modals.dismiss();
    this.nav.push('home/home-page');
  }

  categorySelected(id) {
    this.selectedCategoryId = id;
  }

  visibilitySelected(visibility) {
    this.visibility = visibility;
  }

  activitySelected(id) {
    this.activityId = id;
  }

  //option Select Camera or Album
  async doGetPicture() {
    let _img = await this.image.getPhotos();
    var blob;
    console.log(_img);
    if (_img && _img.isBase64) {
      blob = await this.image.b64toBlob(
        _img['base64String'],
        'image/' + _img['format']
      );
      this.imageReceived(blob);
    } else {
      setTimeout(() => {
        console.log(_img.blobs);
        _img?.blobs.forEach((x) => {
          blob = x;
          console.log(blob);
          this.imageReceived(blob);
        });
      }, 1000);
    }
  }

  //End Camera and Album related work
  async imageReceived(uri) {
    if (!uri || uri === '') return;
    console.log('HERE', uri);
    let formData = new FormData();
    formData.append('file', uri);
    const response = await this.network.uploadImage(formData);
    console.log(response);
    this.images.push(response.data);
  }
}
