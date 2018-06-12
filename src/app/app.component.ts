import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <mat-progress-bar 
      color="waring" 
      mode="indeterminate" 
      style="position: fixed; z-index: 9999" *ngIf="showLoading">
    </mat-progress-bar>
    <navbar 
      class="mat-typography" 
      [title]="title" 
      [sessionUser]="sessionUser" 
      [menuList]="menuList"
      (outputEvent) = "outputEvent($event)"
    >
    </navbar>
    
  `,
  styles: []
})
export class AppComponent {
  title = "Trade";
  menuList: any[] = [];
  sessionUser: any = {};
  showLoading: Boolean;
  constructor() {
    this.menuList = this.getUserMenuList();
  }
  outputEvent($event: any) {
    console.log($event);
  }

  getUserMenuList() {
    return [
      {
        name: "Home",
        link: "welcome/welcome"
      },
      {
        name: "DashBoard",
        link: "dashboard/dashboard"
      },
      {
        name: "AppData",
        link: "appdata/appdata"
      },
      {
        name: "Access Menu",
        link: "access_menu/access_menu"
      },
      {
        name: "Profile",
        link: "profile/profile"
      }
    ];
  }
}
