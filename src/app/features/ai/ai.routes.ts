import {Routes} from '@angular/router';
import {Ai} from './pages/ai/ai';

export const AI_ROUTES: Routes = [
    {
        path: '',
        component: Ai,
        pathMatch: 'full',
    },
];