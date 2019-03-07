export class Module {
  module: string;
  position: string;
  component: string;
  config: any;
}

export class Configuration {
  modules: Module[];
  constructor() {
    this.modules = Array<Module>();
  }
}
