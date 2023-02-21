import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsPageRoutingModule } from './reviews-routing.module';

import { ReviewsPage } from './reviews.page';
import { ReviewItemComponent } from './review-item/review-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReviewsPageRoutingModule],
  declarations: [ReviewsPage, ReviewItemComponent],
})
export class ReviewsPageModule {}
