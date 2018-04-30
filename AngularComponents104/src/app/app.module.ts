import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { DisplayComponent } from "./display/display.component";
import { TimerComponent} from './timer/timer.component';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';
import { TimerService} from './timer/timer.service';
import { TimerNativeComponent} from './timer-native/timer.component';
import { TimerNoneComponent} from './timer-none/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    DisplayComponent,
    TimerNoneComponent,
    TimerNativeComponent,
    TimerComponent,
    AlertViewComponent,
    TabsComponent,
    TabComponent,
    SimpleAlertViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
    /* NOTE: Angular uses Dependancy injection for services. Therefore
     for a Service instantiated at this (ie root) level, the instance
     is passed to all below Components that inject the service via the
     Constructor. In essence, mimicing a Singleton instance for the life
     of the program.

     Therefore, if the service should be a unique instance for widgets
     (ie Component) then the instance should be declared in the Component
     itself as the instance is injected to that services' instance.

     providers: [TimerService],
    */
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
