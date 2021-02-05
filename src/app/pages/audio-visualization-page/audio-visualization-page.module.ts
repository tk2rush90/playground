import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioVisualizationPageRoutingModule } from './audio-visualization-page-routing.module';
import { AudioVisualizationPageComponent } from './audio-visualization-page.component';
import {AudioVisualizerModule} from '@playground/components/audio-visualization/audio-visualizer/audio-visualizer.module';
import {IconModule} from '@playground/components/common/icon/icon.module';


@NgModule({
  declarations: [AudioVisualizationPageComponent],
  imports: [
    CommonModule,
    AudioVisualizationPageRoutingModule,
    AudioVisualizerModule,
    IconModule
  ]
})
export class AudioVisualizationPageModule { }
