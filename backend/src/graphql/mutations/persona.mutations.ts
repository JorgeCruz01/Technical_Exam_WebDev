import { gql } from 'apollo-server-express';

export const personaMutations = gql`
  type Mutation {
    # Crear una nueva persona
    crearPersona(input: PersonaInput!): Persona!
    
    # Actualizar una persona existente
    actualizarPersona(id: ID!, input: PersonaInput!): Persona!
    
    # Eliminar una persona
    eliminarPersona(id: ID!): Boolean!
  }
`; 