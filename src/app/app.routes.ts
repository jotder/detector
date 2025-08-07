import {Routes} from '@angular/router';
import {MainLayout} from './core/layout/main-layout/main-layout';
import {NotFound} from './core/layout/not-found/not-found';

function authGuard() {

}

export const routes: Routes = [
    // Auth routes are publicly accessible
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    // Application routes are protected by the auth guard
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboards/dashboards.routes').then(m => m.DASHBOARD_ROUTES)
            },
            {
                path: 'reports',
                loadChildren: () => import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES)
            },
            {
                path: 'rules',
                loadChildren: () => import('./features/rules/rules.routes').then(m => m.RULES_ROUTES)
            },
            {
                path: 'alerts',
                loadChildren: () => import('./features/alerts/alerts.routes').then(m => m.ALERTS_ROUTES)
            },
            {
                path: 'cases',
                loadChildren: () => import('./features/cases/cases.routes').then(m => m.CASES_ROUTES)
            },
            {
                path: 'ai',
                loadChildren: () => import('./features/ai/ai.routes').then(m => m.AI_ROUTES)
            },
            {
                path: 'control-panel',
                loadChildren: () => import('./features/control-panel/control-panel.routes').then(m => m.CONTROL_PANEL_ROUTES)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ]
    },
    // Wildcard route for a 404 page
    {
        path: '404',
        component: NotFound
    },
    {path: '**', redirectTo: '/404'}
];
