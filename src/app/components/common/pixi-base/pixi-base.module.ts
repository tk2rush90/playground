import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixiBaseComponent } from './pixi-base.component';



@NgModule({
  declarations: [PixiBaseComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PixiBaseComponent,
  ]
})
export class PixiBaseModule { }
