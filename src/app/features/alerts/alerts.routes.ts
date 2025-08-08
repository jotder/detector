import { Routes } from '@angular/router';
import { Analyze } from './pages/analysis/analyze';
import { APP_ROUTES } from '../../core/config/routes.config';
import { AlertsDashboard } from './pages/alerts-dashboard/alerts-dashboard';
import { AlertViewer } from './pages/alert-viewer/alert-viewer';
import { AlertEditor } from './pages/alert-editor/alert-editor';

export const ALERTS_ROUTES: Routes = [
    {
        path: '',
        component: AlertsDashboard,
        pathMatch: 'full',
    },
    {
        path: APP_ROUTES.NEW,
        component: AlertEditor,
    },
    {
        path: APP_ROUTES.ANALYZE,
        component: Analyze,
    },
    {
        // Must be after specific routes like 'new' and 'analyze'
        path: ':id',
        component: AlertViewer,
    },
    {
        path: `:id/${APP_ROUTES.EDIT}`,
        component: AlertEditor,
    },
];