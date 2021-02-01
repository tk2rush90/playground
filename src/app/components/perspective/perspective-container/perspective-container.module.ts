import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerspectiveContainerComponent } from './perspective-container.component';



@NgModule({
  declarations: [PerspectiveContainerComponent],
  exports: [
    PerspectiveContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PerspectiveContainerModule { }
