import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';



@NgModule({
  declarations: [TitleComponent],
  exports: [
    TitleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TitleModule { }
