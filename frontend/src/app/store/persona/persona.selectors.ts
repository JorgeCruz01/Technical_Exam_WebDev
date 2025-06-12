import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonaState, selectAll, selectEntities } from './persona.reducer';

export const selectPersonaState = createFeatureSelector<PersonaState>('personas');

export const selectAllPersonas = createSelector(
  selectPersonaState,
  selectAll
);

export const selectPersonaEntities = createSelector(
  selectPersonaState,
  selectEntities
);

export const selectSelectedPersonaId = createSelector(
  selectPersonaState,
  state => state.selectedPersonaId
);

export const selectSelectedPersona = createSelector(
  selectPersonaEntities,
  selectSelectedPersonaId,
  (personaEntities, personaId) => personaId ? personaEntities[personaId] : null
);

export const selectPersonasLoading = createSelector(
  selectPersonaState,
  state => state.loading
);

export const selectPersonasError = createSelector(
  selectPersonaState,
  state => state.error
);