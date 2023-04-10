
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsPageRoutingModule } from './restaurants-routing.module';

import { RestaurantsPage } from './restaurants.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExplorePageModule } from '../explore.module';
import { StoriesModule } from 'src/app/components/stories/stories.module';
import { FeaturesModule } from 'src/app/components/features/features.module';

@NgModule({
  imports: [
    CommonModule,
    FeaturesModule,
    FormsModule,
    IonicModule,
    RestaurantsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RestaurantsPage]
})
export class RestaurantsPageModule {}
