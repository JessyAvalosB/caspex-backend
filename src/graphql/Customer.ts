import {
  extendType,
  nonNull,
  objectType,
  stringArg,
  idArg,
} from "nexus";

import {
  getCustomer,
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/Customer.controller";

export const Customer = objectType({
  name: "Customer",
  definition(t) {
    t.nonNull.id("_id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("phone");
  },
});

type Event<T> = {
  data: T;
};

// GraphQL Querys
export const CustomerQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("customer", {
      type: "Customer",
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (parent, args) => {
        const { id } = args;
        const customer = await getCustomer(id);
        return customer;
      },
    });
    t.nonNull.list.nonNull.field("customers", {
      type: "Customer",
      resolve: async (parent, args) => {
        const customers = await getCustomers();
        return customers;
      },
    });
  },
});

// GraphQL Mutations
export const CustomerMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addCustomer", {
      type: "Customer",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phone: nonNull(stringArg()),
      },
      resolve: async (parent, args) => {
        const { name, email, phone } = args;
        console.log(name, email, phone);
        const newCustomer = { _id: "", name, email, phone };
        const res = await addCustomer(newCustomer);
        return res?.insertedId ? newCustomer : null;
      },
    });
    t.field("updateCustomer", {
      type: "Boolean",
      args: {
        id: nonNull(idArg()),
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phone: nonNull(stringArg()),
      },
      resolve: async (parent, args) => {
        const { id, ...rest } = args;
        const res = await updateCustomer({ _id: id, ...rest });
        return res?.modifiedCount === 1 || false;
      },
    });
    t.field("deleteCustomer", {
      type: "Boolean",
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (parent, args) => {
        const { id } = args;
        const res = await deleteCustomer(id);
        return res?.deletedCount === 1 || false;
      },
    });
  },
});
