import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ActivityComponent } from './models-components/activity/activity.component';
import {ClientComponent} from './models-components/client/client.component'
import { ExpensesComponent } from './models-components/expenses/expenses.component';
import { IncomesComponent } from './models-components/incomes/incomes.component';
import { PursachesComponent } from './models-components/pursaches/pursaches.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'activity',
				component: ActivityComponent
			},
			{
				path: 'client',
				component: ClientComponent
			},
			{
				path: 'expenses',
				component: ExpensesComponent
			},
			{
				path: 'incomes',
				component: IncomesComponent
			},
			{
				path: 'pursaches',
				component: PursachesComponent
			},
			{
				path: 'dropdown',
				component: TableComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			}
		]
	}
];
