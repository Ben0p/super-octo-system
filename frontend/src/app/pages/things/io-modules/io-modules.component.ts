import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModuleService } from '../../../@core/data/modules';

@Component({
  selector: 'ngx-io-modules',
  templateUrl: './io-modules.component.html',
  styleUrls: ['./io-modules.component.scss'],
})
export class IoModulesComponent implements OnInit, OnDestroy {

  modules$: Object;
  interval: any;


  constructor(
    private modules: ModuleService,
    ) { }

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  refreshData() {
    this.modules.getModules().subscribe(
      modules => this.modules$ = modules,
    );
  }
}
