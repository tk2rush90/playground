import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerspectivePageRoutingModule } from './perspective-page-routing.module';
import { PerspectivePageComponent } from './perspective-page.component';
import {PerspectiveContainerModule} from '@playground/components/perspective/perspective-container/perspective-container.module';


@NgModule({
  declarations: [PerspectivePageComponent],
  imports: [
    CommonModule,
    PerspectivePageRoutingModule,
    PerspectiveContainerModule
  ]
})
export class PerspectivePageModule { }
