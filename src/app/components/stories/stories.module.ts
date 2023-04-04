import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './stories.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [StoriesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],exports:[StoriesComponent]
})
export class StoriesModule { }
