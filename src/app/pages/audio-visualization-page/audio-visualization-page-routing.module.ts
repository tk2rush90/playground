import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioVisualizationPageComponent } from './audio-visualization-page.component';

const routes: Routes = [{ path: '', component: AudioVisualizationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioVisualizationPageRoutingModule { }
