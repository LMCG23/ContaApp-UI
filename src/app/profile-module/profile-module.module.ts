import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedComponentsModule } from "../shared-components/shared-components.module";
import { ProfileModuleRoutingModule } from "./profile-module-routing.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    ProfileModuleRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModuleModule {}
