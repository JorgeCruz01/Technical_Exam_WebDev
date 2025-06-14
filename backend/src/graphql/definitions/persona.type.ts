import { gql } from 'apollo-server-express';

export const personaType = gql`
  type Persona {
    id: ID!
    nombres: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    direccion: String!
    telefono: String!
    createdAt: String
    updatedAt: String
  }
`; 