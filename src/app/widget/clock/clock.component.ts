import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/app/service/configuration/config.service';
import * as moment from 'moment';
import { Widget } from 'src/app/global/config.global';

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
  private widget: Widget = new Widget();

  private defaults: any =  {
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

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    const conf = this.configService.getConf();
    this.widget = conf.widgets.find((c: { widget: string; }) => c.widget === 'clock');
    this.widget.config = Object.assign(this.defaults, this.widget.config);
    console.log('Starting Clock Widget');
    this.loopTime();
    setInterval(() => {
       this.loopTime();
    }, 1000);
  }
  loopTime() {
    const now = moment();
    let hourSymbol = 'HH';
    if (this.widget.config.timeFormat !== 24) {
      hourSymbol = 'hh';
    }
    this.timeString = now.format(hourSymbol + ':mm');

    if (this.widget.config.showDate){
      this.dateString = now.format(this.widget.config.dateFormat);
    }
    if (this.widget.config.showWeek) {
      this.week =  now.week();
    }
    this.seconds = now.format('ss');
    if (this.widget.config.showPeriodUpper) {
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
