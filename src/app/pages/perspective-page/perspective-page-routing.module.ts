import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerspectivePageComponent } from './perspective-page.component';

const routes: Routes = [{ path: '', component: PerspectivePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerspectivePageRoutingModule { }
