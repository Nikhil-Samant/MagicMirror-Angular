import { Injectable } from '@angular/core';
import { Mapper } from '@wufe/mapper';
import { Widget, WidgetConfig } from 'src/app/global/config.global';

@Injectable({
  providedIn: 'root'
})
export class MapperService {
  private mapper = new Mapper();
  constructor() {
    this.generateMaps();
  }
  private generateMaps() {
    this.mapper.createMap<WidgetConfig, WidgetConfig>(WidgetConfig)
    .forMember('displayType', opt => opt.mapFrom(src => src.displayType));
  }
  public mapConfig(defaultConfig: WidgetConfig, actualConfig: WidgetConfig): WidgetConfig {
    return this.mapper.map<WidgetConfig, WidgetConfig>(defaultConfig, actualConfig);
  }
}
