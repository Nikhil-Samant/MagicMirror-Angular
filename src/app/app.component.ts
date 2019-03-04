import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { ConfigService } from './service/configuration/config.service';
import { Configuration } from './global/config.global';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'PiDashboard';
  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getConfigurationFromJSON();
  }
}
