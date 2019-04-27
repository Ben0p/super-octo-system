import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutputService } from '../../../@core/data/outputs';

@Component({
  selector: 'ngx-io-modules',
  templateUrl: './io-modules.component.html',
  styleUrls: ['./io-modules.component.scss'],
})
export class IoModulesComponent implements OnInit, OnDestroy {

  outputs$: Object;
  interval: any;

  constructor(
    private outputs: OutputService,
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
    this.outputs.getOutputs().subscribe(
      outputs => this.outputs$ = outputs,
    );
  }
}
