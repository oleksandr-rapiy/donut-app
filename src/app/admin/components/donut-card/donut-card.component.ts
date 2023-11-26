import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { CurrencyPipe, NgClass, NgFor, NgForOf, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'donut-card',
  standalone: true,
  imports: [RouterModule, NgClass, NgSwitch, NgSwitchCase, CurrencyPipe, NgForOf],

  // encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <a
      class="donut-card"
      [routerLink]="donut.id"
      [ngClass]="{
        'donut-card-promo': donut.promo === 'new'
      }"
    >
      <img
        src="/assets/img/{{ donut.icon }}.svg"
        [alt]="donut.name"
        class="donut-card-icon"
      />
      <div>
        <p class="donut-card-name">
          {{ donut.name }}

          <ng-container [ngSwitch]="donut.promo">
            <span *ngSwitchCase="'new'" class="donut-card-label">NEW</span>
            <span *ngSwitchCase="'limited'" class="donut-card-label"
              >LIMITED</span
            >
            <!-- <span *ngSwitchDefault class="donut-card-label">REGULAR</span> -->
          </ng-container>
        </p>
        <p class="donut-card-price">
          {{ donut.price / 100 | currency : 'USD' : 'symbol' }}
        </p>
      </div>
    </a>
  `,
  styles: [
    `
      // style a host component
      // :host {
      //   display: flex;
      //   align-items: center;
      //   background: #f7f7f7;
      //   border-radius: 5px;
      //   margin-bottom: 5px;
      //   padding: 5px 15px;
      //   transition: transform 0.2s ease-in-out;

      //   &:hover {
      //     cursor: pointer;
      //     transform: translateY(-3px);
      //   }

      // }

      .donut-card {
        display: flex;
        align-items: center;
        background: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px 15px;
        transition: transform 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
          transform: translateY(-3px);
        }
        &-name {
          font-size: 16px;
        }

        &-price {
          font-size: 14px;
          color: #c14583;
        }

        &-icon {
          width: 50px;
          margin-right: 10px;
        }

        &-promo {
          border: 2px solid #eee;
        }

        &-label {
          border: 1px solid #c14583;
          border-radius: 4px;
          padding: 0px 4px;
          margin-left: 5px;
          font-size: 12px;
          color: #c14583;
        }
      }
    `,
  ],
})
export class DonutCardComponent {
  @Input() donut!: Donut;

  constructor() {}
}
