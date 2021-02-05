import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioVisualizerComponent } from './audio-visualizer.component';
import {StrokeButtonModule} from '@playground/components/common/stroke-button/stroke-button.module';
import { HiddenAudioDirective } from './hidden-audio/hidden-audio.directive';
import {RenderDetectorModule} from '@playground/components/common/render-detector/render-detector.module';
import {IconModule} from '@playground/components/common/icon/icon.module';
import { AudioLoadingComponent } from './audio-loading/audio-loading.component';
import { AudioColorPickerComponent } from './audio-color-picker/audio-color-picker.component';
import { AudioColorItemComponent } from './audio-color-picker/audio-color-item/audio-color-item.component';



@NgModule({
  declarations: [AudioVisualizerComponent, HiddenAudioDirective, AudioLoadingComponent, AudioColorPickerComponent, AudioColorItemComponent],
  exports: [
    AudioVisualizerComponent
  ],
  imports: [
    CommonModule,
    StrokeButtonModule,
    RenderDetectorModule,
    IconModule
  ]
})
export class AudioVisualizerModule { }
