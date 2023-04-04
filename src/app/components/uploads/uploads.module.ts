import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadsComponent } from './uploads.component';



@NgModule({
  declarations: [UploadsComponent],
  imports: [
    CommonModule
  ], exports:[UploadsComponent]
})
export class UploadsModule { }
