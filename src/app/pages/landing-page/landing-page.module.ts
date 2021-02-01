import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {PerspectiveContainerModule} from '@playground/components/perspective/perspective-container/perspective-container.module';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    PerspectiveContainerModule
  ]
})
export class LandingPageModule { }
