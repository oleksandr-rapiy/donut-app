import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import {
  Observable,
  catchError,
  delay,
  map,
  of,
  retry,
  retryWhen,
  take,
  tap,
  throwError,
} from 'rxjs';

import { Donut } from '../models/donut.model';

// @Injectable({
//   providedIn: 'root',
// })
// for standalone comp approach
@Injectable()
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Donut[]> {
    if (this.donuts?.length) {
      return of(this.donuts);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Api-Token', crypto.randomUUID());

    const options = {
      headers,
    };

    return this.http.get<Donut[]>(`/api/donuts`, options).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retryWhen((errors) => {
        return errors.pipe(delay(5000), take(2));
      }),
      catchError((err) => this.handleError(err))
    );
  }

  getById(id: string | null): Observable<Donut> {
    return this.getAll().pipe(
      map((donuts: Donut[]) => {
        const donut = donuts.find((x: Donut) => x.id == id);

        if (donut) {
          return donut;
        }

        return {
          name: '',
          icon: '',
          price: 0,
          description: '',
        };
      })
    );
  }

  create(payload: Donut): Observable<Donut> {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      })
    );
  }

  update(payload: Donut): Observable<Donut> {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === donut.id) {
            return donut;
          }

          return item;
        });
      }),
      catchError((err) => this.handleError(err))
    );
  }

  delete(payload: Donut): Observable<Donut> {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter((item) => item.id !== payload.id);
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client error
      console.log('Client', err.message);
    } else {
      // server error
      console.log('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
