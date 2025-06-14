// src/app/components/persona-form/persona-form.component.ts
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Persona } from '../../models/persona.model';
import * as PersonaActions from '../../store/persona/persona.actions';
import * as PersonaSelectors from '../../store/persona/persona.selectors';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss']
})
export class PersonaFormComponent implements OnInit, OnDestroy {
  @Input() personaId: string | null = null;
  @Output() close = new EventEmitter<void>();
  
  personaForm: FormGroup;
  loading = false;
  subscription: Subscription = new Subscription();
  
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    if (this.personaId) {
      // Cargar datos de la persona para editar
      this.subscription.add(
        this.store.select(PersonaSelectors.selectPersonaEntities).subscribe(entities => {
          const persona = entities[this.personaId!];
          if (persona) {
            this.personaForm.patchValue({
              nombres: persona.nombres,
              apellidoPaterno: persona.apellidoPaterno,
              apellidoMaterno: persona.apellidoMaterno,
              direccion: persona.direccion,
              telefono: persona.telefono
            });
          }
        })
      );
    }
    
    // Suscribirse al estado de carga
    this.subscription.add(
      this.store.select(PersonaSelectors.selectPersonasLoading).subscribe(loading => {
        this.loading = loading;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onSubmit(): void {
    if (this.personaForm.invalid) {
      return;
    }
    
    const personaData = this.personaForm.value;
    
    if (this.personaId) {
      // Actualizar persona existente
      this.store.dispatch(
        PersonaActions.updatePersona({
          id: this.personaId,
          persona: personaData
        })
      );
    } else {
      // Crear nueva persona
      this.store.dispatch(
        PersonaActions.createPersona({
          persona: personaData
        })
      );
    }
    
    // Cerrar formulario después de guardar
    this.close.emit();
  }
  
  onCancel(): void {
    this.close.emit();
  }
}