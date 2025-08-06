import { Routes } from '@angular/router';
import { RulesComponent } from './pages/rules/rules.component';

export const RULES_ROUTES: Routes = [
  {
    path: '',
    component: RulesComponent,
    pathMatch: 'full',
  },
];