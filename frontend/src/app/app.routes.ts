// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PersonaListComponent } from './components/persona-list/persona-list.component';

export const routes: Routes = [
  { path: '', component: PersonaListComponent },
  { path: '**', redirectTo: '' }
];