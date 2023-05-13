import { GraphQLSchema, GraphQLObjectType } from "graphql";

import * as queries from "./queries";
import * as mutations from "./mutations";

export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...queries,
  },
});

export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...mutations,
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
