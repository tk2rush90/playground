import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderDetectorDirective } from './render-detector.directive';



@NgModule({
  declarations: [RenderDetectorDirective],
  exports: [
    RenderDetectorDirective
  ],
  imports: [
    CommonModule
  ]
})
export class RenderDetectorModule { }
