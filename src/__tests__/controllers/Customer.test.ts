const mockingoose = require("mockingoose");

import CustomerModel from "../../models/Customer.model";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../controllers/Customer.controller";
import { ICustomer } from "../../interfaces/Customer.interface";

const customers = [
  {
    _id: "6452cd4f093caee41b32f822",
    name: "Jessy",
    email: "avalosbarralesjessy@gmail.com",
    phone: "3125950847",
  },
  {
    _id: "645c1260bf02e9d5ba983b1e",
    name: "Pepe",
    email: "m@gmail.com",
    phone: "3125854474",
  },
];

describe("Customer Controller", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe("getCustomers()", () => {
    it("should return the list of customers", async () => {
      mockingoose(CustomerModel).toReturn(customers, "find");
      const res = await getCustomers();
      expect(res[0].name).toBe("Jessy");
    });
  });

  describe("getCustomer()", () => {
    it("should return customer by id", async () => {
      mockingoose(CustomerModel).toReturn(customers[0], "findOne");
      const res = await getCustomer("6452cd4f093caee41b32f822");
      expect(res?.name).toBe("Jessy");
    });
  });

  describe("addCustomer()", () => {
    it("should return doc on save", async () => {
      const newCustomer: any = {
        name: "Jessy",
        email: "avalosbarralesjessy@gmail.com",
        phone: "3125950847",
      };
      mockingoose(CustomerModel).toReturn(customers[0], "save");
      const res = await addCustomer(newCustomer);
      expect(res?.name).toBe("Jessy");
    });
  });

  describe("updateCustomer()", () => {
    it("should return doc on update", async () => {
      const newCustomer: any = {
        _id: "6452cd4f093caee41b32f822",
        name: "Jessy Avalos",
        email: "avalosbarralesjessy@gmail.com",
        phone: "3125950847",
      };
      mockingoose(CustomerModel).toReturn(customers[0], "findOneAndUpdate");
      const res = await updateCustomer(newCustomer);
      expect(res?.name).toBe(customers[0].name);
    });
  });

  describe("deleteCustomer()", () => {
    it("should return true on delete", async () => {
      mockingoose(CustomerModel).toReturn(true, "findOneAndRemove");
      const res = await deleteCustomer("6452cd4f093caee41b32f822");
      expect(res).toBeTruthy();
    });
  });
});
