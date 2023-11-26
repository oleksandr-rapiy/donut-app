import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app">
      <header class="header">
        <img src="/assets/img/logo.svg" class="logo" alt="Ultimate donuts" />
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app {
        background: #fff;
        border-radius: 8px;
        max-width: 400px;
        width: 94%;
        margin: 25px auto;
        padding: 25px;
        border: 4px solid #ef9fc7;
      }

      .header {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
      }

      .logo {
        width: 100px;
        height: 88px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  titile!: string;
  counter: number = 0;

  ngOnInit() {
    console.log('Hello World!');

    this.titile = 'Hello from ngOnInit';
  }

  updateTitile() {
    ++this.counter;
    this.titile = `Hello from here: \nwith Id = ${this.counter}`;
  }

  resetTitile() {
    this.titile = 'Hello from ngOnInit';
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement;

    this.titile = value;
  }
}
