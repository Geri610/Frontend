import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { bearer_Interceptor } from './services/interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
         provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: bearer_Interceptor,
      multi: true
    },
     provideRouter(routes),
    provideOAuthClient()
  ]
};
