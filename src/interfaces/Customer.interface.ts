import { Document } from "mongoose";

export interface ICustomer extends Document {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  products?: ICostumerProduct[];
}

export interface ICostumerProduct {
  idProduct: number;
  quantity: number;
}
