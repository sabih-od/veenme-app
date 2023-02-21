import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ExploreItemComponent } from './explore-item/explore-item.component';
import { HomePagePostComponent } from './home-page-post/home-page-post.component';
import { ImageCollageComponent } from './image-collage/image-collage.component';
import { FullSizeGalleryComponent } from './full-size-gallery/full-size-gallery.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ExploreItemComponent,
    HomePagePostComponent,
    ImageCollageComponent,
    FullSizeGalleryComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [
    HeaderComponent,
    ExploreItemComponent,
    HomePagePostComponent,
    ImageCollageComponent,
    FullSizeGalleryComponent,
  ],
})
export class ComponentsModule {}
