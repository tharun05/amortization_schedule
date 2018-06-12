import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";
import {FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AmortizationRoutingModule } from "./amortization-routing.module";
import { AmortizationPageComponent } from "./pages/amortization-page.component";
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { AddComponent } from './components/loan-calculator/add/add.component';
import { DetailsComponent } from './components/loan-calculator/details/details.component';
import { SchedulesDetailsComponent } from './components/loan-calculator/schedules-details/schedules-details.component';


@NgModule({
  imports: [CommonModule, MaterialModule, AmortizationRoutingModule, FlexLayoutModule, FormsModule],
  declarations: [AmortizationPageComponent, LoanCalculatorComponent, AddComponent, DetailsComponent, SchedulesDetailsComponent]
})
export class AmortizationModule {}
