import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NaturePageRoutingModule } from './nature-routing.module';

import { NaturePage } from './nature.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NaturePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NaturePage]
})
export class NaturePageModule {}
