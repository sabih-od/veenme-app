import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsPageRoutingModule } from './reviews-routing.module';

import { ReviewsPage } from './reviews.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddReviewComponent } from 'src/app/components/add-review/add-review.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ReviewsPage, AddReviewComponent],
})
export class ReviewsPageModule {}
