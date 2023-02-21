import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeenmeIosPageRoutingModule } from './veenme-ios-routing.module';

import { VeenmeIosPage } from './veenme-ios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeenmeIosPageRoutingModule
  ],
  declarations: [VeenmeIosPage]
})
export class VeenmeIosPageModule {}
