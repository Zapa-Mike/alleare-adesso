import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartScreenComponent } from './components/start-screen/start-screen.component';

const appRoutes: Routes = [
  {
    path: "home",
    component: StartScreenComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
