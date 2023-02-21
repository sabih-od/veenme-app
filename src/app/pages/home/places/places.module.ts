import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlacesDetailsComponent } from './places-details/places-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PlacesPage, PlacesDetailsComponent]
})
export class PlacesPageModule {}
