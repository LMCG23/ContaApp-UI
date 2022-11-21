import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileModuleRoutingModule } from './profile-module-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileModuleRoutingModule
  ]
})
export class ProfileModuleModule { }
