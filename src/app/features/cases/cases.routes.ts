import { Routes } from '@angular/router';
import { CasesComponent } from './pages/cases/cases.component';

export const CASES_ROUTES: Routes = [
  {
    path: '',
    component: CasesComponent,
    pathMatch: 'full',
  },
];