import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home-page',
      },
      {
        path: 'veenme',
        loadChildren: () =>
          import('./../veenme/veenme.module').then((m) => m.VeenmePageModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsPageModule),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then((m) => m.GalleryPageModule),
      },
      {
        path: 'places',
        loadChildren: () =>
          import('./places/places.module').then((m) => m.PlacesPageModule),
      },
      {
        path: 'map-page',
        loadChildren: () =>
          import('./map-page/map-page.module').then((m) => m.MapPagePageModule),
      },
      {
        path: 'home-page',
        loadChildren: () =>
          import('./home-page/home-page.module').then(
            (m) => m.HomePagePageModule
          ),
      },
    ],
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('./reviews/reviews.module').then((m) => m.ReviewsPageModule),
  },
  {
    path: 'veenme',
    loadChildren: () =>
      import('./../veenme/veenme.module').then((m) => m.VeenmePageModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery.module').then((m) => m.GalleryPageModule),
  },
  {
    path: 'places',
    loadChildren: () =>
      import('./places/places.module').then((m) => m.PlacesPageModule),
  },
  {
    path: 'map-page',
    loadChildren: () =>
      import('./map-page/map-page.module').then((m) => m.MapPagePageModule),
  },
  {
    path: 'home-page',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePagePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
