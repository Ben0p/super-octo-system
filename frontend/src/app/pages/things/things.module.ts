import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ThingsRoutingModule, routedComponents } from './things-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ThingsRoutingModule,
  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
})
export class ThingsModule { }
