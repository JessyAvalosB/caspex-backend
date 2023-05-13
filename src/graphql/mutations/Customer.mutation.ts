import { GraphQLString, GraphQLBoolean } from "graphql";

import { customerType } from "../types/Customer.type";
import {
  addCustomer as addDB,
  updateCustomer as updateDB,
  deleteCustomer as deleteDB,
} from "../../controllers/Customer.controller";

export const addCustomer = {
  type: customerType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    return await addDB(args);
  },
};

export const updateCustomer = {
  type: customerType,
  args: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    return await updateDB(args);
  },
};

export const deleteCustomer = {
  type: GraphQLBoolean,
  args: {
    _id: { type: GraphQLString },
  },
  resolve: async (_: any, { _id }: any) => {
    return await deleteDB(_id);
  },
};
