import { GraphQLList, GraphQLString } from "graphql";

import {
  getCustomers,
  getCustomer,
} from "../../controllers/Customer.controller";
import { customerType } from "../types/Customer.type";

export const customers = {
  type: new GraphQLList(customerType),
  resolve: async () => {
    const res = await getCustomers();
    return res;
  },
};

export const customer = {
  type: customerType,
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (_: any, { id }: any) => {
    return await getCustomer(id);
  },
};
