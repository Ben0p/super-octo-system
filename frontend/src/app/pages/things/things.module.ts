import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ThingsRoutingModule, routedComponents } from './things-routing.module';

import { StatusCardComponent } from '../../@components/status-card/status-card.component';

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
  ],
})
export class ThingsModule { }
