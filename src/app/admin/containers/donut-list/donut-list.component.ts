import { RouterModule } from '@angular/router';
import { DonutService } from './../../service/donut.service';
import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'donut-list',
  standalone: true,
  imports: [RouterModule, DonutCardComponent, NgIf, NgForOf],
  providers: [DonutService],
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green"
          >New Donut <img src="assets/img/icon/plus.svg" />
        </a>
      </div>
      <ng-container *ngIf="donuts?.length; then cards; else nothing">
      </ng-container>

      <ng-template #cards>
        <donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></donut-card>
      </ng-template>

      <!-- <donut-single></donut-single> -->

      <!-- <ng-template ngFor [ngForOf]="donuts" let-donut>
        <donut-card [donut]="donut"></donut-card>
      </ng-template> -->

      <ng-template #nothing>
        <p>No Donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .donut-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  /**
   *
   */
  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService.getAll().subscribe((donuts) => {
      this.donuts = donuts;
    });
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
