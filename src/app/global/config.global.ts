export class WidgetConfig {
  displayType: string;
  timeFormat: number;
  displaySeconds: boolean;
  showPeriod: boolean;
  showPeriodUpper: boolean;
  clockBold: boolean;
  showDate: boolean;
  showWeek: boolean;
  dateFormat: string;
}

export class Widget {
  widget: string;
  position: string;
  config: WidgetConfig;

  constructor() {
    this.config = new WidgetConfig();
  }
}

export class Configuration {
  widgets: Widget[];
  constructor() {
    this.widgets = Array<Widget>();
  }
}
