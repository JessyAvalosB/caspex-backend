import { Schema, model } from "mongoose";
import { ICustomer } from "../interfaces/Customer.interface";

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export default model<ICustomer>("Customer", CustomerSchema);
