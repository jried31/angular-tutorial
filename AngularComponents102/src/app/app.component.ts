import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  // Simple method showing how one can reference observable
  logCountdownEnd() {
    console.log("Countdown finished");
  }
}
