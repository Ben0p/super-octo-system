import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutputService } from '../../../@core/data/outputs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.scss'],
})
export class OutputsComponent implements OnInit, OnDestroy {


  outputs$: Object;
  interval: any;

  outputState = new FormGroup(
    {
      module: new FormControl('', Validators.required),
      output: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    },
  );

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

  actualState(state, circuit) {
    if (circuit === 'power') {
      state = !state;
      return(state);
    } else {
      return(state);
    }
  }

  refreshData() {
    this.outputs.getOutputs().subscribe(
      outputs => this.outputs$ = outputs,
    );
  }

  setOutput(Module, output, state) {
    clearInterval(this.interval);

    this.outputState.setValue(
      {
        'module' : Module,
        'output' : output,
        'state' : state,
      },
    );

    this.outputs.postOutputs(this.outputState.value).subscribe(results => {
      // console.log(results);
    });

    this.interval = setInterval(() => {}, 1000);
  }
}
