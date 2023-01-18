import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminModuleRoutingModule } from "./admin-module-routing.module";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivityComponent } from "./components/activity/activity.component";
import { ClientComponent } from "./components/client/client.component";
import { SharedComponentsModule } from "../shared-components/shared-components.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [AdminPageComponent, ActivityComponent, ClientComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminModuleRoutingModule,
    MatTabsModule,
    SharedComponentsModule,
    NgMultiSelectDropDownModule,
  ],
})
export class AdminModuleModule {}
