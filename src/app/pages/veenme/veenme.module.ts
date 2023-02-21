import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeenmePageRoutingModule } from './veenme-routing.module';

import { VeenmePage } from './veenme.page';
import { VeenStepsComponent } from './veen-steps/veen-steps.component';
import { GmapComponent } from './gmap/gmap.component';
import { VeenComponent } from './veen/veen.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommentsComponent } from '../home/gallery/comments/comments.component';
import { VeenDetailsComponent } from 'src/app/components/veen-details/veen-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeenmePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    VeenmePage,
    VeenStepsComponent,
    GmapComponent,
    VeenComponent,
    CommentsComponent,
    VeenDetailsComponent
  ],
})
export class VeenmePageModule {}
