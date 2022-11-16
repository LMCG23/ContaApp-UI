import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { ExpensesComponent } from './models-components/expenses/expenses.component';
import { IncomesComponent } from './models-components/incomes/incomes.component';
import { PursachesComponent } from './models-components/pursaches/pursaches.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { TableComponent } from './table/table.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [

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
