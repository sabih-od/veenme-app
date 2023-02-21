import { Component, Injector, OnInit } from '@angular/core';
import { AddReviewComponent } from 'src/app/components/add-review/add-review.component';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage extends BasePage implements OnInit {
  page = 1;
  list = [];
  isLoading = true;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const res = await this.network.getReiews(this.page);
    console.log(res);
    let data = res.data;
    this.list = data.item;
    this.isLoading = false;
  }

  openUserProfile(item) {
    console.log(item);
    this.nav.navigateTo('profile', {
      queryParams: { username: item.username },
    });
  }

  addReview() {
    this.modals.present(AddReviewComponent);
  }
}
