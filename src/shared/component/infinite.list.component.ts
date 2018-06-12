import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'infinite-list',
  template: `
    <div  id="infinite-scroll-list" 
          infinite-scroll 
          [infiniteScrollDistance]="10"
          [infiniteScrollThrottle]="10"
          (scrolled)="onScrollDown()"
          [scrollWindow]="false" 
          style="overflow: auto; 
          height:calc(100vh - 60px);">
          <ng-content > </ng-content>
         
    </div>
    `,
  styles: ['']
})
export class InfiniteListComponent {

  @Output()
  outputEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  items: any;
  infiniteScrollListItems: any[] = [];

  max: number = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const items = (changes as any).items || [];
    if ((changes as any).items != undefined && (items.previousValue != items.currentValue)) {
      document.getElementById('infinite-scroll-list').scrollTop = 0;
      this.max = 0;
      this.infiniteScrollListItems = [];
      this.onScrollDown();
    }
  }


  onScrollDown() {
    if (!this.items || this.max > this.items.length) {
      return;
    }
    this.max = this.infiniteScrollListItems.length + 50;
    this.max = this.max > this.items.length ? this.items.length : this.max;
    for (let i = this.infiniteScrollListItems.length - 1; i < this.max - 1; i++) {
      this.infiniteScrollListItems.push(this.items[i + 1]);
    }
    this.outputEvent.emit(this.infiniteScrollListItems);
  }
}