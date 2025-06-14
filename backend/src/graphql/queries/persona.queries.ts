import { gql } from 'apollo-server-express';

export const personaQueries = gql`
  type Query {
    # Obtener todas las personas
    personas: [Persona]!
    
    # Obtener una persona por ID
    persona(id: ID!): Persona
  }
`; 