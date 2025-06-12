// src/app/components/persona-list/persona-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Persona } from '../../models/persona.model';
import * as PersonaActions from '../../store/persona/persona.actions';
import * as PersonaSelectors from '../../store/persona/persona.selectors';
import { PersonaFormComponent } from '../persona-form/persona-form.component';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonaFormComponent],
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss']
})
export class PersonaListComponent implements OnInit {
  personas$: Observable<Persona[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  searchTerm: string = '';
  showForm: boolean = false;
  selectedPersonaId: string | null = null;

  constructor(private store: Store) {
    this.personas$ = this.store.select(PersonaSelectors.selectAllPersonas);
    this.loading$ = this.store.select(PersonaSelectors.selectPersonasLoading);
    this.error$ = this.store.select(PersonaSelectors.selectPersonasError);
  }

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.store.dispatch(PersonaActions.loadPersonas());
  }

  onSearch(): void {
    // El filtrado se realiza en el template con un pipe
  }

  onAdd(): void {
    this.selectedPersonaId = null;
    this.store.dispatch(PersonaActions.selectPersona({ id: null }));
    this.showForm = true;
  }

  onEdit(id: string): void {
    this.selectedPersonaId = id;
    this.store.dispatch(PersonaActions.selectPersona({ id }));
    this.showForm = true;
  }

  onDelete(id: string): void {
    if (confirm('¿Está seguro de eliminar esta persona?')) {
      this.store.dispatch(PersonaActions.deletePersona({ id }));
    }
  }

  onFormClose(): void {
    this.showForm = false;
  }

  // Método para filtrar personas por nombre o apellidos
  filterPersonas(personas: Persona[]): Persona[] {
    if (!this.searchTerm.trim()) {
      return personas;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    return personas.filter(persona => 
      persona.nombres.toLowerCase().includes(term) ||
      persona.apellidoPaterno.toLowerCase().includes(term) ||
      persona.apellidoMaterno.toLowerCase().includes(term)
    );
  }
}