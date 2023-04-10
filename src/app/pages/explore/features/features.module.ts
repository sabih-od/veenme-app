import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [CommonModule, IonicModule, FormsModule,     ComponentsModule],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
