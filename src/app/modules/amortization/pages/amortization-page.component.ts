import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-welcome-page",
  template: `
    <app-loan-calculator></app-loan-calculator>
  `,
  styles: []
})
export class AmortizationPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
