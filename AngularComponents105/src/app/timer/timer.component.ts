/* Difference between this class in AngularComponent101 is we extracted
the functionality of the Timer component to a service to adhere to the
Single Purpose Model. In this case the Service is injectable in other
components/services for resusability.
*/
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation,
  ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {TimerService} from './timer.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  /*
  Component CSS styles are encapsulated into the component's view and don't affect the rest of the application. To control how this encapsulation happens on a per component basis, you can set the view encapsulation mode in the component metadata.

  Emulated view encapsulation (the default) emulates the behavior of shadow DOM by preprocessing (and renaming) the CSS code to effectively scope the CSS to the component's view. In other words, the CSS
  defined in the SCSS file for this view are encapsulated in it's own local scope for widgets of this type.

  For example, adding .buttons {} the CSS will encapsulate the changes to this type of Widget only.
  */
  encapsulation: ViewEncapsulation.Emulated,
  /*
  Declaring TimerService at this level creates a new instance for
  each instance of the TimerComponent (ie: effectively using new Class)
  vs the implied Singleton usage if declared in app.module. Since
  the timer activity logic is pushed to a service. A Singleton will
  affect all timer instances (eg: pressing start starts all widgets' timers)
  */
  providers: [TimerService],
  /*
  The TimerService is injected as a dependancy into this Component. Pause/
  restart operations fire events that are processed based on the following strategies:
  --- .Default: Strategy passes an event (eg: Play/Restart) up to App (root component)
                then Angular passes the event down to all child components in the Compnoent
                tree down to leaves. Only the objects that are bound will respond.
  --- .OnPush:  Strategy passes an event to App (root component), then runs the Diry Check
                cycle only on that branch (ie: passing the evnt down only to the components
                of this branch only). A component will not check it's references unless it
                recieves a Button Click event or the object reference to its input changes.
                In other words, the 'app-display' child Component in the HTML view that's tied
                 to 'this.countdown' will not update it's display without forcing the event via
                markForCheck() below.

                This strategy is useful if your application has many copies of the same widget and
                (eg: Cards), and you don't want events for each card to percolate to other Cards in
                the heirchy that aren't bound to the input instance. In other words, if I press Pause/Play
                on one widget, the event shouldn't fire to the other widgets in the view.
  */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countdownEndSubscription:Subscription = null;
  private countdownSubscription:Subscription = null;
  public countdown:number = 0;

  // Service injected using dependancy injection
  constructor(public timer:TimerService, private cdRef:ChangeDetectorRef) {
   }

  get progress() {
    console.log("Getting progress");
    return (this.countdown)/this.init*100;
  }
  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    this.countdownEndSubscription =
    this.timer.countdownEnd$.subscribe(() => {
      console.log("--Coundown end");
      this.onComplete.emit();
    });

    this.countdownSubscription = this.timer.countdown$.subscribe((data) => {
      this.countdown = data;
      /*
      Forces the event change to be percolated to the Display child component.
      Not including this will not cause the 'app-display' component to react to
      it's countdown change (even though the event fires). Because OnPush Strategy
      only fires checks on click events or input Reference changes.
      */
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }
}
