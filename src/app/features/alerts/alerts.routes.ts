import {Routes} from '@angular/router';
import {Alerts} from './pages/alerts/alerts';

export const ALERTS_ROUTES: Routes = [
    {
        path: '',
        component: Alerts,
        pathMatch: 'full',
    },
];