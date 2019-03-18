import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThingsComponent } from './things.component';
import { IoModulesComponent } from './io-modules/io-modules.component';

const routes: Routes = [{
  path: '',
  component: IoModulesComponent,
  children: [{
    path: 'io',
    component: IoModulesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThingsRoutingModule { }

export const routedComponents = [
  ThingsComponent,
  IoModulesComponent,
];
