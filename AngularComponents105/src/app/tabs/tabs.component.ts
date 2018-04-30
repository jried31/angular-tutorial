import { Component, OnInit, ContentChild, OnDestroy, AfterContentInit } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Tab } from "../tab/tab.interface";

/**
 This example shows how to access the child components and add tabs dynamically
 from the parent component. It's a 2nd most useful tutorial.
 */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy, AfterContentInit {

  // Obtains reference to child component (only references a single tab at a time)
  @ContentChild(TabComponent) tab:TabComponent;
  private tabClickSubscription:any;
  public tabs:Tab[] = [];

  constructor() { }

  // After content has been initialized then the bottom (ie child component)
  // can detect teh content that we want to project to it
  ngAfterContentInit() {
    if(this.tab){
      console.log(this.tab)
      this.addTab(this);
      this.tabClickSubscription = this.tab.onClick.subscribe(() => {
        console.log("Im clicked");
      });
    }
  }

  ngOnDestroy() {
    if(this.tabClickSubscription) {
      this.tabClickSubscription.unsubscribe();
    }
  }
  ngOnInit() {
  }

  addTab(tab:Tab){
    if (this.tabs.length === 0) {
      tab.isActive = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:Tab) {
    for (let tab of this.tabs){
      tab.isActive = false;
    }
    tab.isActive = true;
  }


}
