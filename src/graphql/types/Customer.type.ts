import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

import { productType } from "../types/Product.type";
import { getProducts } from "../../controllers/Product.controller";

export const customerType = new GraphQLObjectType({
  name: "Customer",
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    products: {
      type: new GraphQLList(productType),
      resolve: async (parent) => {
        const res = await getProducts();
        if (parent?.products) {
          let newArray: any[] = [];
          parent.products.forEach((x: any) => {
            const product = res.find((product) => product.id === x.idProduct);
            newArray.push({ ...product, quantity: x.quantity });
          });

          return newArray;
        }
      },
    },
  },
});
