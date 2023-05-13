import { GraphQLBoolean, GraphQLString, GraphQLInt } from "graphql";
import {
  addProduct as addDB,
  updateProduct as updateDB,
  deleteProduct as deleteDB,
} from "../../controllers/Product.controller";

export const addProduct = {
  type: GraphQLBoolean,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    return await addDB(args);
  },
};

export const updateProduct = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    return await updateDB(args);
  },
};

export const deleteProduct = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_: any, { id }: any) => {
    return await deleteDB(id);
  },
};
