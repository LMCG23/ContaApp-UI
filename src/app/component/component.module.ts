import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from "./table/table.component";
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { ClientComponent } from './models-components/client/client.component';
import { ActivityComponent } from './models-components/activity/activity.component';
import { PursachesComponent } from './models-components/pursaches/pursaches.component';
import { ExpensesComponent } from './models-components/expenses/expenses.component';
import { IncomesComponent } from './models-components/incomes/incomes.component';

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
    ClientComponent,
    ActivityComponent,
    PursachesComponent,
    ExpensesComponent,
    IncomesComponent
  ]
})
export class ComponentsModule { }
