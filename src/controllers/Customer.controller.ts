import Customer from "../models/Customer.model";
import { ICustomer } from "../interfaces/Customer.interface";

export const getCustomer = async (id: string) => await Customer.findById(id);

export const getCustomers = async () => await Customer.find({});

export const addCustomer = async (newCustomer: ICustomer) => {
  const { email, name, phone } = newCustomer;
  if (email === "" && name === "" && phone === "") {
    return null;
  }
  try {
    const newCustomer = new Customer({
      name,
      email,
      phone,
    });
    await newCustomer.save();
    return newCustomer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateCustomer = async (customer: ICustomer) => {
  const { _id, ...rest } = customer;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(_id, rest, {
      new: true,
    });
    return updatedCustomer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteCustomer = async (_id: string) => {
  try {
    await Customer.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
