import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    component: UserProfileComponent,
    path: "",
  },
  { component: UserProfileComponent, path: "user-profile" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileModuleRoutingModule {}
