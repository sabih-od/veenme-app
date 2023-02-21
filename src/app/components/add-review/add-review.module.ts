import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddReviewComponent } from './add-review.component';

@NgModule({
    declarations: [
        AddReviewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        IonicModule,
    ],
    exports: [
        AddReviewComponent,
    ]
})
export class AddReviewModule { }
