import { Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
) { }

appendModuleToBody(component: any, position: string) {
  // 1. Create a component reference from the component
  const componentRef = this.componentFactoryResolver
    .resolveComponentFactory(component)
    .create(this.injector);

  // 2. Attach component to the appRef so that it's inside the ng component tree
  this.appRef.attachView(componentRef.hostView);

  // 3. Get DOM element from component
  const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement;

  // 4. Append DOM element to the body
  document.getElementById(position).appendChild(domElem);
}
}
