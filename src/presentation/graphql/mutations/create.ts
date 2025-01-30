import { AwilixContainer } from 'awilix';

import { Cradle } from '@container';
import { PeopleValidator } from '@presentation/validators/people.validator';

interface Args {
  id: string;
  igc: string;
  reason: string;
}

export const typeDefs = `#graphql
  type Mutation {
    migration(id: ID!, igc: String!, reason: String!): Boolean!
  }
`;

export const resolvers = (container: AwilixContainer<Cradle>) => {
  return {
    Mutation: {
      create: async (_: unknown, { id, ...body }: Args) => {
        await container.cradle.peopleCreateCommandService.handle(PeopleValidator.create(body));

        return true;
      },
    },
  };
};
