import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SubscriptionService} from '@playground/services/common/subscription.service';
import {ToastModule} from '@playground/components/common/toast/toast.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const {
  prefix,
  production,
} = environment;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ServiceWorkerModule.register(`${prefix}/ngsw-worker.js`, { enabled: production }),
  ],
  providers: [
    SubscriptionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
