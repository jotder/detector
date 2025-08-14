import { Routes } from '@angular/router';
import { APP_ROUTES } from '../../core/config/routes.config';

export const ALERTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/alerts-dashboard/alerts-dashboard').then(m => m.AlertsDashboard),
        pathMatch: 'full',
    },
    {
        path: APP_ROUTES.NEW,
        loadComponent: () => import('./pages/alert-editor/alert-editor').then(m => m.AlertEditor),
    },
    {
        path: APP_ROUTES.ANALYZE,
        loadComponent: () => import('./pages/analysis/analyze').then(m => m.Analyze)
      },
    {
        path: ':id',
        loadComponent: () => import('./pages/alert-viewer/alert-viewer').then(m => m.AlertViewer),
    },
    {
        path: ':id/' + APP_ROUTES.EDIT,
        loadComponent: () => import('./pages/alert-editor/alert-editor').then(m => m.AlertEditor),
    },
];
