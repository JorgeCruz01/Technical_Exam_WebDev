// src/app/store/persona/persona.actions.ts
import { createAction, props } from '@ngrx/store';
import { Persona, PersonaInput } from '../../models/persona.model';

// Cargar personas
export const loadPersonas = createAction('[Persona] Load Personas');
export const loadPersonasSuccess = createAction(
  '[Persona] Load Personas Success',
  props<{ personas: Persona[] }>()
);
export const loadPersonasFailure = createAction(
  '[Persona] Load Personas Failure',
  props<{ error: any }>()
);

// Cargar una persona
export const loadPersona = createAction(
  '[Persona] Load Persona',
  props<{ id: string }>()
);
export const loadPersonaSuccess = createAction(
  '[Persona] Load Persona Success',
  props<{ persona: Persona }>()
);
export const loadPersonaFailure = createAction(
  '[Persona] Load Persona Failure',
  props<{ error: any }>()
);

// Crear persona
export const createPersona = createAction(
  '[Persona] Create Persona',
  props<{ persona: PersonaInput }>()
);
export const createPersonaSuccess = createAction(
  '[Persona] Create Persona Success',
  props<{ persona: Persona }>()
);
export const createPersonaFailure = createAction(
  '[Persona] Create Persona Failure',
  props<{ error: any }>()
);

// Actualizar persona
export const updatePersona = createAction(
  '[Persona] Update Persona',
  props<{ id: string; persona: PersonaInput }>()
);
export const updatePersonaSuccess = createAction(
  '[Persona] Update Persona Success',
  props<{ persona: Persona }>()
);
export const updatePersonaFailure = createAction(
  '[Persona] Update Persona Failure',
  props<{ error: any }>()
);

// Eliminar persona
export const deletePersona = createAction(
  '[Persona] Delete Persona',
  props<{ id: string }>()
);
export const deletePersonaSuccess = createAction(
  '[Persona] Delete Persona Success',
  props<{ id: string }>()
);
export const deletePersonaFailure = createAction(
  '[Persona] Delete Persona Failure',
  props<{ error: any }>()
);

// Seleccionar persona para editar
export const selectPersona = createAction(
  '[Persona] Select Persona',
  props<{ id: string | null }>()
);