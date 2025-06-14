import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server-express';
import { personaType } from './definitions/persona.type';
import { personaInput } from './inputs/persona.input';
import { personaQueries } from './queries/persona.queries';
import { personaMutations } from './mutations/persona.mutations';
import { personaResolvers } from './resolvers/persona.resolver';

// Combinar todos los tipos
const typeDefs = gql`
  ${personaType}
  ${personaInput}
  ${personaQueries}
  ${personaMutations}
`;

// Crear el schema ejecutable
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: personaResolvers
});

export default schema; 