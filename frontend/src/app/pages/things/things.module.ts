import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ThingsRoutingModule, routedComponents } from './things-routing.module';

import { StatusCardComponent } from '../../@components/status-card/status-card.component';
import { ModuleCardComponent } from '../../@components/module-card/module-card.component';
import { OutputsComponent } from './outputs/outputs.component';

@NgModule({
  imports: [
    ThemeModule,
    ThingsRoutingModule,
  ],
  exports: [

  ],
  declarations: [
    ...routedComponents,
    StatusCardComponent,
    ModuleCardComponent,
    OutputsComponent,
  ],
})
export class ThingsModule { }
