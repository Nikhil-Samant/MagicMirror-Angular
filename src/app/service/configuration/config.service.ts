import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/global/config.global';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private conf: Observable<Configuration>;
  private configUrl = '/app/config/config.json';
  constructor(public http: HttpClient) {
     this.conf = this.getConfFile();
  }

  getConfFile(): Observable<Configuration>{
    return this.http.get<Configuration>(this.configUrl);
  }

  public getConf() {
    return this.conf;
  }
}
