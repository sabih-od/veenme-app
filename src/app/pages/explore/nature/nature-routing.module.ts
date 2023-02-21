import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaturePage } from './nature.page';

const routes: Routes = [
  {
    path: '',
    component: NaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NaturePageRoutingModule {}
