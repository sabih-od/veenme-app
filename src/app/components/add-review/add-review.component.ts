import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent extends BasePage implements OnInit {
  rating = 1;
  _place_id;
  review = '';

  @Input() set place_id(val) {
    this._place_id = val;
  }

  get place_id() {
    return this._place_id;
  }
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  changeRating(_rating) {
    this.rating = _rating + 1;
  }

  async postReview() {
    let data = {
      place_id: this._place_id,
      rating: this.rating - 1,
      review: this.review,
    };
    console.log('postReview', data);

    let res = await this.network.postReview(data);
    console.log(res);
    if (res && res.success === true) {
      this.alert.presentToast(res.message ?? 'Success');
      this.close(true);
    }
  }

  close(success) {
    this.modals.dismiss({ success });
  }
}
