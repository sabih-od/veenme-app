import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FeaturesComponent } from 'src/app/pages/explore/features/features.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
