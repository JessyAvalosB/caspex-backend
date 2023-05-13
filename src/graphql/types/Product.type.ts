import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

export const productType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
  },
});
