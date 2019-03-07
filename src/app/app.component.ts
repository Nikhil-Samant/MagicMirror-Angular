import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { ConfigService } from './service/configService/config.service';
import { Configuration } from './global/config.global';
import { ModuleService } from './service/moduleService/module.service';
import { Modules } from './global/modules.global';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'Smart Mirror Angular';
  private config: Configuration;
  constructor(private configService: ConfigService, private moduleService: ModuleService) {
  }

  ngOnInit(): void {
    this.configService.getConfigurationFromJSON().then(conf => {
      this.config = conf;
      this.LoadWidget();
    });
  }

  LoadWidget() {
    if (this.config.modules.length > 0){
      this.config.modules.forEach(m => {
        if (!isNullOrUndefined(m.component)) {
          this.moduleService.appendModuleToBody(Modules[m.component], m.position);
          console.log('Starting Module: ' + m.module);
        }
      });
  }
  }
}
