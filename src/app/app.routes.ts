import {Routes} from '@angular/router';
import {MainLayout} from './core/layout/main-layout/main-layout';
import {NotFound} from './core/layout/not-found/not-found';
import { APP_ROUTES } from './core/config/routes.config';

function authGuard() {

}

export const routes: Routes = [
    // Auth routes are publicly accessible
    {
        path: APP_ROUTES.AUTH,
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    // Application routes are protected by the auth guard
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: APP_ROUTES.DASHBOARD,
                loadChildren: () => import('./features/dashboards/dashboards.routes').then(m => m.DASHBOARD_ROUTES)
            },
            {
                path: APP_ROUTES.REPORTS,
                loadChildren: () => import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES)
            },
            {
                path: APP_ROUTES.RULES,
                loadChildren: () => import('./features/rules/rules.routes').then(m => m.RULES_ROUTES)
            },
            {
                path: APP_ROUTES.ALERTS,
                loadChildren: () => import('./features/alerts/alerts.routes').then(m => m.ALERTS_ROUTES)
            },
            {
                path: APP_ROUTES.CASES,
                loadChildren: () => import('./features/cases/cases.routes').then(m => m.CASES_ROUTES)
            },
            {
                path: APP_ROUTES.AI,
                loadChildren: () => import('./features/ai/ai.routes').then(m => m.AI_ROUTES)
            },
            {
                path: APP_ROUTES.CONTROL_PANEL,
                loadChildren: () => import('./features/control-panel/control-panel.routes').then(m => m.CONTROL_PANEL_ROUTES)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: APP_ROUTES.DASHBOARD
            }
        ]
    },
    // Wildcard route for a 404 page
    {
        path: APP_ROUTES.NOT_FOUND,
        component: NotFound
    },
    {path: '**', redirectTo: `/${APP_ROUTES.NOT_FOUND}`}
];
