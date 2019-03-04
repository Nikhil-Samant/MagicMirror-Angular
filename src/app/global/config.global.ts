export class Widget {
  widget: string;
  position: string;
  config: any;
}

export class Configuration {
  widgets: Widget[];
  constructor() {
    this.widgets = Array<Widget>();
  }
}
