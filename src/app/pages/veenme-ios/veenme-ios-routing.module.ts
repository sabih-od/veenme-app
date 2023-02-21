import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeenmeIosPage } from './veenme-ios.page';

const routes: Routes = [
  {
    path: '',
    component: VeenmeIosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeenmeIosPageRoutingModule {}
