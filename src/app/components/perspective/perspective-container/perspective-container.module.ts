import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerspectiveContainerComponent } from './perspective-container.component';
import {RenderDetectorModule} from '@playground/components/common/render-detector/render-detector.module';



@NgModule({
  declarations: [PerspectiveContainerComponent],
  exports: [
    PerspectiveContainerComponent
  ],
  imports: [
    CommonModule,
    RenderDetectorModule
  ]
})
export class PerspectiveContainerModule { }
