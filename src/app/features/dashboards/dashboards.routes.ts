import { Routes } from '@angular/router';
import { Dashboards } from './pages/dashboards/dashboards';
import { ExecutiveDashboard } from './components/executive-dashboard/executive-dashboard';
import { AnalyticsDashboard } from './components/analytics-dashboard/analytics-dashboard';
import { DrillDownView } from './components/drill-down-view/drill-down-view';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: Dashboards,
        children: [
            {
                path: '',
                redirectTo: 'executive-dashboard',
                pathMatch: 'full',
            },
            {
                path: 'executive-dashboard',
                component: ExecutiveDashboard,
            },
            {
                path: 'analytics-view',
                component: AnalyticsDashboard,
            },
            {
                path: 'drill-down-view',
                component: DrillDownView,
            },
        ],
    },
];
