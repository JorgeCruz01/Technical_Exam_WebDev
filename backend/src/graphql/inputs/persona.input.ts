import { gql } from 'apollo-server-express';

export const personaInput = gql`
  input PersonaInput {
    nombres: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    direccion: String!
    telefono: String!
  }
`; 