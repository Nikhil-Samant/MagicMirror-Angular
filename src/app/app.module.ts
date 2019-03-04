import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './widget/clock/clock.component';
import { ConfigService } from './service/configuration/config.service';
import { HttpClientModule } from '@angular/common/http';
import { MapperService } from './service/mapper/mapper.service';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    MapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
