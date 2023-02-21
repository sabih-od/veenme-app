import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { CommentsComponent } from './comments/comments.component';
import { MentionModule } from 'angular-mentions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    ComponentsModule,
    MentionModule,
  ],
  declarations: [GalleryPage, CommentsComponent, GalleryItemComponent],
})
export class GalleryPageModule {}
