import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileModuleRoutingModule } from "./profile-module-routing.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SharedComponentsModule } from "../shared-components/shared-components.module";

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, ProfileModuleRoutingModule, SharedComponentsModule],
})
export class ProfileModuleModule {}
