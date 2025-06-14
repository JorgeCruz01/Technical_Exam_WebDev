export interface Persona {
    id?: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface PersonaInput {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
  }