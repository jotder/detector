import {Routes} from '@angular/router';
import {Rules} from './pages/rules/rules';

export const RULES_ROUTES: Routes = [
    {
        path: '',
        component: Rules,
        pathMatch: 'full',
    },
];