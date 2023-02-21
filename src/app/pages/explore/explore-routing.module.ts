import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'restaurants'
      },
      {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
      },
      {
        path: 'landmarks',
        loadChildren: () => import('./landmarks/landmarks.module').then( m => m.LandmarksPageModule)
      },
      {
        path: 'historical',
        loadChildren: () => import('./historical/historical.module').then( m => m.HistoricalPageModule)
      },
      {
        path: 'nature',
        loadChildren: () => import('./nature/nature.module').then( m => m.NaturePageModule)
      }

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
