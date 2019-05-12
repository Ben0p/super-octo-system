import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThingsComponent } from './things.component';
import { IoModulesComponent } from './io-modules/io-modules.component';
import { OutputsComponent } from './outputs/outputs.component';

const routes: Routes = [{
  path: '',
  component: ThingsComponent,
  children: [
    {
      path: 'modules',
      component: IoModulesComponent,
    },
    {
      path: 'outputs',
      component: OutputsComponent,
    },
],
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
