import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {PerspectiveContainerModule} from '@playground/components/perspective/perspective-container/perspective-container.module';
import {TitleModule} from '@playground/components/landing/title/title.module';
import {ListItemModule} from '@playground/components/landing/list-item/list-item.module';
import {IconModule} from '@playground/components/common/icon/icon.module';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    PerspectiveContainerModule,
    TitleModule,
    ListItemModule,
    IconModule
  ]
})
export class LandingPageModule { }
