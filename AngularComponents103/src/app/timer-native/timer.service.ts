/*
All business logic of timer are pushed into a service to adhere to the
single purpose principle
*/
import {Injectable, Output, Input, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

// Injectables are recommended to incldue by default because
// it allows this service to inject other services (should
// this component do it in the future). Meaning it may include
// another service or be injected from another service.
@Injectable()
export class TimerService {

  // See http://reactivex.io/rxjs for info about Subject class
  /* Subject has the ability to create events and handle subscribers
  However, one should be cautious about Direct Access to this object.
  You want to give access ONLY generally to the Observable part of the
  Subject. */
  private countdownEndSource = new Subject<void>();

  /* Components shouldn't subscribe directly to the Subject in your
  service therefore, we create the variable below to ONLY expose just
  the observable part because you DON"T want to create Events from
  outside the Service!*/
  public countdownEnd$ = this.countdownEndSource.asObservable();


  /* BehaviorSubjects ALWAYS have a value (which is difference from Subjects.
  Countdown must always have a value and we don't want the View to
  ping/bind to the variable itself. We want to use observables to update
  when broadcasted so we do a BehaviorSubject.
  However, we dont' want to expose the BehaviorSubject directly because
  it allows events to be generated outside the class.*/
  private countdownSource = new BehaviorSubject<number>(0);

  public countdown$ = this.countdownSource.asObservable();
  private countdownTimerRef:any = null;
  public paused:boolean = true;
  private init:number = 0;

  constructor() {}

  destroy():void{
    this.clearTimeout();
  }

  // Init is an optional argument
  restartCountdown(init?){
    if(init) {
      this.init = init;
    }

    if(this.init && this.init > 0){
      this.paused = true;
      this.clearTimeout();
      // Reset countdown to init value
      this.countdownSource.next(this.init);
    }
  }

  toggleCountdown() {
    this.paused = !this.paused;

    if (!this.paused) {
      this.doCountdown();
    } else {
      this.clearTimeout();
    }
  }

  private doCountdown(){
    this.countdownTimerRef = setTimeout(()=>{
      this.countdownSource.next(this.countdownSource.getValue() - 1);
      this.processCountdown();
    }, 1000);
  }

  private processCountdown(){
    if(this.countdownSource.getValue() <= 0){
      // Emits an event
      this.countdownEndSource.next();
    }
    else{
      this.doCountdown();
    }
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }
}
