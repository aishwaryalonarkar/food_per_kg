import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DefaultModule} from './layouts/default/default.module';
import {SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { MenuHeaderComponent } from './modules/menu-header/menu-header.component';
// import { HomeComponent } from './modules/home/home.component';
// import { FormBuilder, FormGroup } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    // MenuHeaderComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // FormBuilder,
    // FormGroup
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
