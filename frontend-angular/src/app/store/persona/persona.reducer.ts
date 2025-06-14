import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Persona } from '../../models/persona.model';
import * as PersonaActions from './persona.actions';

export interface PersonaState extends EntityState<Persona> {
  selectedPersonaId: string | null;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Persona> = createEntityAdapter<Persona>();

export const initialState: PersonaState = adapter.getInitialState({
  selectedPersonaId: null,
  loading: false,
  error: null
});

export const personaReducer = createReducer(
  initialState,
  
  // Load personas
  on(PersonaActions.loadPersonas, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PersonaActions.loadPersonasSuccess, (state, { personas }) =>
    adapter.setAll(personas, { ...state, loading: false })
  ),
  on(PersonaActions.loadPersonasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Load single persona
  on(PersonaActions.loadPersona, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PersonaActions.loadPersonaSuccess, (state, { persona }) =>
    adapter.upsertOne(persona, { ...state, loading: false })
  ),
  on(PersonaActions.loadPersonaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Create persona
  on(PersonaActions.createPersona, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PersonaActions.createPersonaSuccess, (state, { persona }) =>
    adapter.addOne(persona, { ...state, loading: false })
  ),
  on(PersonaActions.createPersonaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update persona
  on(PersonaActions.updatePersona, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PersonaActions.updatePersonaSuccess, (state, { persona }) =>
    adapter.updateOne(
      { id: persona.id!, changes: persona },
      { ...state, loading: false }
    )
  ),
  on(PersonaActions.updatePersonaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Delete persona
  on(PersonaActions.deletePersona, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PersonaActions.deletePersonaSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PersonaActions.deletePersonaFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select persona
  on(PersonaActions.selectPersona, (state, { id }) => ({
    ...state,
    selectedPersonaId: id
  }))
);

// Selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();