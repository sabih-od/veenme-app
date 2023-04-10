import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [FeaturesComponent]
})
export class FeaturesModule { }
