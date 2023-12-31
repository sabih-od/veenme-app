import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';

import { RegisterPageRoutingModule } from './register-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    FormsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
