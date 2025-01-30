import { AwilixContainer } from 'awilix';

import { Cradle } from '@container';
import { PeopleMapper } from '@infrastructure/mappers/people.mapper';

export const typeDefs = `#graphql
  type Query {
    search(): Data
  }

  type Data {
    data: [Person!]!
    total: Int!
    page: Int!
    take: Int!
    totalPages: Int!
  }

  type Person {
    id: ID!
    name: String!
    height: Int!
    mass: Int!
    hairColor: String!
    skinColor: String!
    eyeColor: String!
    birthYear: String!
    gender: String!
  }
`;

export const resolvers = (container: AwilixContainer<Cradle>) => {
  return {
    Query: {
      search: async (_: unknown) => {
        const { people, total, page, take, totalPages } =
          await container.cradle.peopleQueriesService.search();

        return {
          data: people.map((e) => PeopleMapper.toPresentation(e)),
          total,
          page,
          take,
          totalPages,
        };
      },
    },
  };
};
