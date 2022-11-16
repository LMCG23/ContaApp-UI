import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivityComponent } from './components/activity/activity.component';
import { ClientComponent } from './components/client/client.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    ActivityComponent,
    ClientComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminModuleRoutingModule,
    MatTabsModule,

  ]
})
export class AdminModuleModule { }
