import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "Loan Calculator";
  menuList: any[] = [];
  sessionUser: any = {};
  showLoading: Boolean;
  constructor() {
    // this.menuList = this.getUserMenuList();
  }
  outputEvent($event: any) {
    console.log($event);
  }
}
