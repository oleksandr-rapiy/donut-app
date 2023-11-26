import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [DonutFormComponent],
  providers: [DonutService],
  template: `
    <div class="">
      <donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      >
      </donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private donutService: DonutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.data['isEdit'];
    const id = this.route.snapshot.paramMap.get('id');

    this.donutService.getById(id).subscribe((donut: Donut) => {
      this.donut = donut;
    });
  }

  onCreate(donut: Donut) {
    this.donutService
      .create(donut)
      .subscribe((donut: Donut) =>
        this.router.navigate(['admin', 'donuts', donut.id])
      );
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (error) => console.error('OnUpdate error', error),
    });
  }

  onDelete(donut: Donut) {
    if (confirm(`Really delete ${this.donut.name}?`)) {
      this.donutService
        .delete(donut)
        .subscribe(() => this.router.navigate(['admin']));
    }
  }
}
