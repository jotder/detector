import { Routes } from '@angular/router';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';

export const CONTROL_PANEL_ROUTES: Routes = [
  {
    path: '',
    component: ControlPanelComponent,
    pathMatch: 'full',
  },
];