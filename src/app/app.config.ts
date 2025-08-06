import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Add provideHttpClient to make HttpClient available for injection
    provideHttpClient(/* withInterceptors([authInterceptor]) */), // You can add interceptors here later
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
