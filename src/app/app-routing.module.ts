import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule),
  },
  {
    path: 'perspective',
    loadChildren: () => import('./pages/perspective-page/perspective-page.module').then(m => m.PerspectivePageModule),
  },
  {
    path: 'audio-visualization',
    loadChildren: () =>
      import('./pages/audio-visualization-page/audio-visualization-page.module').then(m => m.AudioVisualizationPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
