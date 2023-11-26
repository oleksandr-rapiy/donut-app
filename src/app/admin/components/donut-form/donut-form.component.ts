import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-form',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  template: `
    <form class="donut-form" #form="ngForm" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          required
          minlength="5"
          [ngModel]="donut.name"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #name="ngModel"
        />

        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.minlength">
            Minimum length of a name 5!
          </div>
          <div class="donut-form-error" *ngIf="name.errors?.required">
            Name is required
          </div>
        </ng-container>
      </label>

      <label>
        <span>Icon</span>
        <select
          name="icon"
          class="input input--select"
          required
          [ngModel]="donut.icon"
          #icon="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>

        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="donut-form-error" *ngIf="icon.errors?.required">
            Icon is required
          </div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          required
          [ngModel]="donut.price"
          #price="ngModel"
        />

        <ng-container *ngIf="price.invalid && price.touched">
          <div class="donut-form-error" *ngIf="price.errors?.required">
            Price is required
          </div>
        </ng-container>
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="donut.description"
          #description="ngModel"
        ></textarea>

        <ng-container *ngIf="description.invalid && description.touched">
          <div class="donut-form-error" *ngIf="description.errors?.required">
            Description is required
          </div>
        </ng-container>
      </label>

      <button
        type="submit"
        class="btn btn--green"
        *ngIf="!isEdit"
        (click)="handleCreate(form)"
      >
        Create
      </button>

      <button
        type="submit"
        class="btn btn--green"
        [disabled]="form.untouched"
        *ngIf="isEdit"
        (click)="handleUpdate(form)"
      >
        Update
      </button>

      <button
        type="submit"
        class="btn btn--gray"
        *ngIf="isEdit"
        (click)="handleDelete()"
      >
        Delete
      </button>

      <button
        type="submit"
        class="btn btn--gray"
        (click)="resetForm(form)"
        *ngIf="form.touched || isEdit"
      >
        Reset Form
      </button>

      <div class="donut-form-working" *ngIf="isWorking">Working...</div>
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-items: center;
          margin-bottom: 5px;

          label {
            display: flex;
            align-items: center;
            margin-bottom: 0;

            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }

        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }

        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  icons: string[] = [
    'just-chocolate',
    'glazed-fudge',
    'caramel-swirl',
    'sour-supreme',
    'strawberry-glaze',
    'zesty-lemon',
  ];

  isWorking: boolean = false;

  @Input() donut!: Donut;
  @Input() isEdit!: boolean;

  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  handleCreate(form: NgForm) {
    this.showIsWorking();

    if (form.valid) {
      this.create.emit(form.value);

      this.hideIsWorking();
      return;
    }

    form.form.markAllAsTouched();
  }

  handleUpdate(form: NgForm) {
    this.showIsWorking();

    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value });

      this.hideIsWorking();
      return;
    }

    form.form.markAllAsTouched();
  }

  handleDelete() {
    this.showIsWorking();

    this.delete.emit(this.donut);

    this.hideIsWorking();
  }

  resetForm(form: NgForm) {
    setTimeout(() => {
      form.resetForm();
    }, 1000);
  }

  showIsWorking() {
    this.isWorking = true;
  }

  hideIsWorking() {
    setTimeout(() => {
      this.isWorking = false;
    }, 1000);
  }
}
