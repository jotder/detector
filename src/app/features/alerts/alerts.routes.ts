import { Routes } from '@angular/router';
import { AlertsComponent } from './pages/alerts/alerts.component';

export const ALERTS_ROUTES: Routes = [
  {
    path: '',
    component: AlertsComponent,
    pathMatch: 'full',
  },
];