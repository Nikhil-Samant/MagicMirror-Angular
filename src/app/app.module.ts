import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './service/configService/config.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { ModuleService } from './service/moduleService/module.service';
import { ClockComponent } from './module/clock/clock.component';
import { CalendarComponent } from './module/calendar/calendar.component';
import { WeatherComponent } from './module/weather/weather.component';
import { WeatherService } from './service/weatherService/weather.service';
import { NewsComponent } from './module/news/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    CalendarComponent,
    WeatherComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StorageServiceModule,
    BrowserAnimationsModule
  ],
  providers: [
    ConfigService,
    ModuleService,
    WeatherService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ClockComponent,
    CalendarComponent,
    WeatherComponent,
    NewsComponent
  ]
})
export class AppModule { }
