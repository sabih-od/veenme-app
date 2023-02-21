import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';
import { CommentsComponent } from './comments/comments.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PeopleAreVeeningComponent } from './people-are-veening/people-are-veening.component';
import { MightFollowComponent } from './might-follow/might-follow.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommentComponent } from 'src/app/components/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    HomePagePage,
    CommentsComponent,
    PeopleAreVeeningComponent,
    MightFollowComponent,
    CommentComponent,
  ],
})
export class HomePagePageModule {}
