import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-module-card',
  styleUrls: ['./module-card.component.scss'],
  template: `
    <nb-card (click)=valueChanged() [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})


export class ModuleCardComponent {

  valueChanged() {
    this.on = !this.on;
    if (this.circuit === 'power') {
      this.valueChange.emit(!this.on);
    } else {
      this.valueChange.emit(this.on);
    }
  }

  @Output() valueChange = new EventEmitter();
  @Input() title: string;
  @Input() type: string;
  @Input() on: boolean = true;
  @Input() module: string;
  @Input() output: number;
  @Input() circuit: string;

}
