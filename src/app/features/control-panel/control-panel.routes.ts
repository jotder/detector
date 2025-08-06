import {Routes} from '@angular/router';
import {ControlPanel} from './pages/control-panel/control-panel';

export const CONTROL_PANEL_ROUTES: Routes = [
    {
        path: '',
        component: ControlPanel,
        pathMatch: 'full',
    },
];