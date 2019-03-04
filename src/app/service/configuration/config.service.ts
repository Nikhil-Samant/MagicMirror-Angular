import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from 'src/app/global/config.global';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig: Configuration;
  private configUrl = '/app/config/config.json';
  private CONFIG_KEY = 'AppKey';
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public http: HttpClient) {
  }

  async getConfigurationFromJSON() {
    this.appConfig = await this.http.get<Configuration>(this.configUrl).toPromise();
    this.saveConfigInLocal(this.CONFIG_KEY, this.appConfig);
  }

  public getConf(): Configuration {
    return this.getConfigFromLocal(this.CONFIG_KEY);
  }

  private saveConfigInLocal(key, val): void {
    console.log('App config Storing completed');
    this.storage.set(key, val);
    this.appConfig = this.storage.get(key);
  }

  private getConfigFromLocal(key): Configuration {
    this.appConfig = this.storage.get(key);
    return this.appConfig;
  }
}
