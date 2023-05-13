import { GraphQLList, GraphQLInt } from "graphql";

import { productType } from "../types/Product.type";
import { getProduct, getProducts } from "../../controllers/Product.controller";

export const products = {
  type: new GraphQLList(productType),
  resolve: async () => {
    return await getProducts();
  },
};

export const product = {
  type: productType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_: any, { id }: any) => {
    return await getProduct(id);
  },
};
