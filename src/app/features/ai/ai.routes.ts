import { Routes } from '@angular/router';
import { AiComponent } from './pages/ai/ai.component';

export const AI_ROUTES: Routes = [
  {
    path: '',
    component: AiComponent,
    pathMatch: 'full',
  },
];