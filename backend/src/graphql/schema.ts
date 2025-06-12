import { gql } from 'apollo-server-express';

// Definición del esquema GraphQL
const typeDefs = gql`
  # Tipo Persona
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

  # Inputs para crear y actualizar personas
  input PersonaInput {
    nombres: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    direccion: String!
    telefono: String!
  }

  # Queries (consultas)
  type Query {
    # Obtener todas las personas
    personas: [Persona]!
    
    # Obtener una persona por ID
    persona(id: ID!): Persona
  }

  # Mutations (operaciones que modifican datos)
  type Mutation {
    # Crear una nueva persona
    crearPersona(input: PersonaInput!): Persona!
    
    # Actualizar una persona existente
    actualizarPersona(id: ID!, input: PersonaInput!): Persona!
    
    # Eliminar una persona
    eliminarPersona(id: ID!): Boolean!
  }
`;

export default typeDefs;