import { Routes } from '@angular/router';
import { Dashboards } from './pages/dashboards/dashboards';
import { ExecutiveDashboard } from './components/executive-dashboard/executive-dashboard';
import { AnalyticsDashboard } from './components/analytics-dashboard/analytics-dashboard';
import { DrillDownView } from './components/drill-down-view/drill-down-view';
import { APP_ROUTES } from '../../core/config/routes.config';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: Dashboards,
        children: [
            {
                path: '',
                redirectTo: APP_ROUTES.EXECUTIVE_DASHBOARD,
                pathMatch: 'full',
            },
            {
                path: APP_ROUTES.EXECUTIVE_DASHBOARD,
                component: ExecutiveDashboard,
            },
            {
                path: APP_ROUTES.ANALYTICS_VIEW,
                component: AnalyticsDashboard,
            },
            {
                path: APP_ROUTES.DRILL_DOWN_VIEW,
                component: DrillDownView,
            },
        ],
    },
];
