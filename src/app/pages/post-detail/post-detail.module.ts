import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDetailPageRoutingModule } from './post-detail-routing.module';

import { PostDetailPage } from './post-detail.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HomePagePostComponent } from 'src/app/components/home-page-post/home-page-post.component';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ImageCollageComponent } from 'src/app/components/image-collage/image-collage.component';
import { CommentsComponent } from 'src/app/components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailPageRoutingModule,
  ],
  declarations: [
    PostDetailPage,
    HeaderComponent,
    HomePagePostComponent,
    CommentComponent,
    ImageCollageComponent,
    CommentsComponent,
  ],
})
export class PostDetailPageModule {}
