import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { ComponentsRoutes } from './component.routing';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { ExpensesComponent } from './models-components/expenses/expenses.component';
import { IncomesComponent } from './models-components/incomes/incomes.component';
import { PursachesComponent } from './models-components/pursaches/pursaches.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { TableComponent } from "./table/table.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

  ],
  declarations: [
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    ButtonsComponent,
    CardsComponent,
    TableComponent,
    PursachesComponent,
    ExpensesComponent,
    IncomesComponent
  ]
})
export class ComponentsModule { }
