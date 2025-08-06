import {Routes} from '@angular/router';
import {Cases} from './pages/cases/cases';

export const CASES_ROUTES: Routes = [
    {
        path: '',
        component: Cases,
        pathMatch: 'full',
    },
];