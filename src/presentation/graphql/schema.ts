import { AwilixContainer } from 'awilix';

import { Cradle } from '@container';
import { typeDefs as createTypeDefs, resolvers as create } from './mutations/create';
import { typeDefs as searchTypeDefs, resolvers as search } from './queries/search';

const rootTypeDefs = `#graphql
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const typeDefs = [rootTypeDefs, createTypeDefs, searchTypeDefs];
export const resolvers = (container: AwilixContainer<Cradle>) => {
  return [create(container), search(container)];
};
