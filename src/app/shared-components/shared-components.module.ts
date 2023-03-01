import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToasterComponent } from "./toaster/toaster.component";
import { ToasterContainerComponent } from "./toaster-container/toaster-container.component";
import { SharedClientSelectModalComponent } from "./shared-client-select-modal/shared-client-select-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MultiSelectModule } from "@syncfusion/ej2-angular-dropdowns";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    ToasterComponent,
    ToasterContainerComponent,
    SharedClientSelectModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    MultiSelectModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToasterComponent,
    ToasterContainerComponent,
    SharedClientSelectModalComponent,
  ],
})
export class SharedComponentsModule {}
