// src/app/services/persona.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Persona, PersonaInput } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private graphqlUrl = 'http://localhost:3000/graphql';

  constructor(private http: HttpClient) {}

  // Ejecutar consulta GraphQL
  private executeGraphQL<T>(query: string, variables: any = {}): Observable<T> {
    return this.http.post<{ data: T }>(this.graphqlUrl, {
      query,
      variables
    }).pipe(
      map(response => {
        if (response.data) {
          return response.data;
        }
        throw new Error('No se recibieron datos del servidor');
      }),
      catchError(error => {
        console.error('Error en la consulta GraphQL:', error);
        return throwError(() => new Error(error.message || 'Error en la consulta GraphQL'));
      })
    );
  }

  // Obtener todas las personas
  getPersonas(): Observable<Persona[]> {
    const query = `
      query {
        personas {
          id
          nombres
          apellidoPaterno
          apellidoMaterno
          direccion
          telefono
        }
      }
    `;
    
    return this.executeGraphQL<{ personas: Persona[] }>(query)
      .pipe(
        map(data => {
          if (data && data.personas) {
            return data.personas;
          }
          return [];
        }),
        catchError(error => {
          console.error('Error al obtener personas:', error);
          return throwError(() => new Error(error.message || 'Error al obtener personas'));
        })
      );
  }

  // Obtener una persona por ID
  getPersona(id: string): Observable<Persona> {
    const query = `
      query($id: ID!) {
        persona(id: $id) {
          id
          nombres
          apellidoPaterno
          apellidoMaterno
          direccion
          telefono
        }
      }
    `;
    
    return this.executeGraphQL<{ persona: Persona }>(query, { id })
      .pipe(
        map(data => {
          if (data && data.persona) {
            return data.persona;
          }
          throw new Error('Persona no encontrada');
        }),
        catchError(error => {
          console.error('Error al obtener persona:', error);
          return throwError(() => new Error(error.message || 'Error al obtener persona'));
        })
      );
  }

  // Crear una nueva persona
  createPersona(input: PersonaInput): Observable<Persona> {
    const mutation = `
      mutation($input: PersonaInput!) {
        crearPersona(input: $input) {
          id
          nombres
          apellidoPaterno
          apellidoMaterno
          direccion
          telefono
        }
      }
    `;
    
    return this.executeGraphQL<{ crearPersona: Persona }>(mutation, { input })
      .pipe(
        map(data => {
          if (data && data.crearPersona) {
            return data.crearPersona;
          }
          throw new Error('Error al crear persona');
        }),
        catchError(error => {
          console.error('Error al crear persona:', error);
          return throwError(() => new Error(error.message || 'Error al crear persona'));
        })
      );
  }

  // Actualizar una persona existente
  updatePersona(id: string, input: PersonaInput): Observable<Persona> {
    const mutation = `
      mutation($id: ID!, $input: PersonaInput!) {
        actualizarPersona(id: $id, input: $input) {
          id
          nombres
          apellidoPaterno
          apellidoMaterno
          direccion
          telefono
        }
      }
    `;
    
    return this.executeGraphQL<{ actualizarPersona: Persona }>(mutation, { id, input })
      .pipe(
        map(data => {
          if (data && data.actualizarPersona) {
            return data.actualizarPersona;
          }
          throw new Error('Error al actualizar persona');
        }),
        catchError(error => {
          console.error('Error al actualizar persona:', error);
          return throwError(() => new Error(error.message || 'Error al actualizar persona'));
        })
      );
  }

  // Eliminar una persona
  deletePersona(id: string): Observable<boolean> {
    const mutation = `
      mutation($id: ID!) {
        eliminarPersona(id: $id)
      }
    `;
    
    return this.executeGraphQL<{ eliminarPersona: boolean }>(mutation, { id })
      .pipe(
        map(data => {
          if (data && data.eliminarPersona !== undefined) {
            return data.eliminarPersona;
          }
          throw new Error('Error al eliminar persona');
        }),
        catchError(error => {
          console.error('Error al eliminar persona:', error);
          return throwError(() => new Error(error.message || 'Error al eliminar persona'));
        })
      );
  }
}