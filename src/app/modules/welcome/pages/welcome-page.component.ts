import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-welcome-page",
  template: `
    <mat-toolbar color="accent"> <span> Welcome Page </span> </mat-toolbar>
    <app-welcome-news></app-welcome-news>
  `,
  styles: []
})
export class WelcomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
