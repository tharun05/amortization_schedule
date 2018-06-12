import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomePageComponent } from "./pages/welcome-page.component";

const routes: Routes = [
  { path: "welcome/welcome", component: WelcomePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {}
