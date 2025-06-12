// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { personaReducer } from './store/persona/persona.reducer';
import { PersonaEffects } from './store/persona/persona.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      personas: personaReducer
    }),
    provideEffects([PersonaEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    })
  ]
};