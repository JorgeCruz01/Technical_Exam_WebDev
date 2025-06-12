// src/app/store/persona/persona.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PersonaService } from '../../services/persona.service';
import * as PersonaActions from './persona.actions';

@Injectable()
export class PersonaEffects {
  private actions$ = inject(Actions);
  private personaService = inject(PersonaService);

  loadPersonas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonaActions.loadPersonas),
      switchMap(() =>
        this.personaService.getPersonas().pipe(
          map(personas => PersonaActions.loadPersonasSuccess({ personas })),
          catchError(error => of(PersonaActions.loadPersonasFailure({ error: error.message || 'Error al cargar personas' })))
        )
      )
    );
  });

  createPersona$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonaActions.createPersona),
      switchMap(({ persona }) =>
        this.personaService.createPersona(persona).pipe(
          map(newPersona => PersonaActions.createPersonaSuccess({ persona: newPersona })),
          catchError(error => of(PersonaActions.createPersonaFailure({ error: error.message || 'Error al crear persona' })))
        )
      )
    );
  });

  updatePersona$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonaActions.updatePersona),
      switchMap(({ id, persona }) =>
        this.personaService.updatePersona(id, persona).pipe(
          map(updatedPersona => PersonaActions.updatePersonaSuccess({ persona: updatedPersona })),
          catchError(error => of(PersonaActions.updatePersonaFailure({ error: error.message || 'Error al actualizar persona' })))
        )
      )
    );
  });

  deletePersona$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonaActions.deletePersona),
      switchMap(({ id }) =>
        this.personaService.deletePersona(id).pipe(
          map(() => PersonaActions.deletePersonaSuccess({ id })),
          catchError(error => of(PersonaActions.deletePersonaFailure({ error: error.message || 'Error al eliminar persona' })))
        )
      )
    );
  });
}