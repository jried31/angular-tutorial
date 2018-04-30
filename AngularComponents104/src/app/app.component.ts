import { Component } from '@angular/core';

/**
JERRID: this project is very useful. It discusses how to make an alert modal
where one would reuse components defined in the parent view ... this applies
directly to the current project

this shows how to use template access variables to access content in a parrent component
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isAddTimerVisible:boolean = false;
  public isEndTimerAlertVisible:boolean = false;
  public time:number = 0;
  public timers:Array<number> = [];

  constructor() {
    // Starting seconds for iterator for timer in the html view
    // It'll iterate a for loop creating 3 new components with the start init
    // times below.
    this.timers = [3, 20, 122];
  }

  // Simple method showing how one can reference observable
  logCountdownEnd() {
    console.log("Countdown finished");
  }

  public showAddTimer() {
    this.isAddTimerVisible = true;
  }

  public hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert() {
    this.isEndTimerAlertVisible = true;
  }

  public hideEndTimerAlert() {
    this.isEndTimerAlertVisible = false;
  }

  public submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }
}
