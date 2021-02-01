import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SubscriptionService} from '@playground/services/common/subscription.service';
import {ToastModule} from '@playground/components/common/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [
    SubscriptionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
