import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './service/configService/config.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { ModuleService } from './service/moduleService/module.service';
import { ClockComponent } from './module/clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StorageServiceModule
  ],
  providers: [
    ConfigService,
    ModuleService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClockComponent]
})
export class AppModule { }
