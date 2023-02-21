import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsPageRoutingModule } from './restaurants-routing.module';

import { RestaurantsPage } from './restaurants.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExplorePageModule } from '../explore.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RestaurantsPage]
})
export class RestaurantsPageModule {}
