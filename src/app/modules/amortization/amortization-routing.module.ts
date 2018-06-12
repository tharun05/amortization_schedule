import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AmortizationPageComponent } from "./pages/amortization-page.component";

const routes: Routes = [
  { path: "", component: AmortizationPageComponent },
  { path: "loan-calculator", component: AmortizationPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmortizationRoutingModule {}
