import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/app/service/configuration/config.service';
import * as moment from 'moment';
import { Widget, Configuration, WidgetConfig } from 'src/app/global/config.global';
import { MapperService } from 'src/app/service/mapper/mapper.service';

@Component({
  selector: 'app-clock',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.less']
})
export class ClockComponent implements OnInit {

  public timeString: string;
  public dateString: string;
  public seconds: string;
  public period: string;
  public week: number;
  private widgetProperties: Widget = new Widget();

  private defaults: WidgetConfig =  {
    displayType: 'digital',
    timeFormat: 12,
    displaySeconds: true,
    showPeriod: true,
    showPeriodUpper: true,
    clockBold: false,
    showDate: true,
    showWeek: false,
    dateFormat: 'dddd, LL'
  };

  constructor(private configService: ConfigService, private mapperService: MapperService) {
  }

  ngOnInit() {
    this.widgetProperties.config = this.defaults;
    const configObservable = this.configService.getConf();
    configObservable.subscribe((conf: Configuration) => {
      //this.widgetProperties.config = conf.widgets.find((c: { widget: string; }) => c.widget === 'clock').config;
      //let test = this.mapperService.mapConfig(this.defaults,this.widgetProperties.config);
      //console.log(test);
    });
    console.log('Starting Clock Widget');
    this.loopTime();
    setInterval(() => {
       this.loopTime();
    }, 1000);
  }
  loopTime() {
    const now = moment();
    let hourSymbol = 'HH';
    if (this.widgetProperties.config.timeFormat !== 24) {
      hourSymbol = 'hh';
    }
    this.timeString = now.format(hourSymbol + ':mm');

    if (this.widgetProperties.config.showDate){
      this.dateString = now.format(this.widgetProperties.config.dateFormat);
    }
    if (this.widgetProperties.config.showWeek) {
      this.week =  now.week();
    }
    this.seconds = now.format('ss');
    if (this.widgetProperties.config.showPeriodUpper) {
      this.period = now.format('A');
    } else {
      this.period = now.format('a');
    }
    // if (this.defaults.displaySeconds) {
    //   timeWrapper.appendChild(secondsWrapper);
    // }
    // if (this.config.showPeriod && this.config.timeFormat !== 24) {
    //   timeWrapper.appendChild(periodWrapper);
    // }
  }
}
