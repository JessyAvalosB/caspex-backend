import mongoose from "mongoose";

import { MONGODB_USER, MONGODB_PASS, MONGODB_NAME } from "../config/constants";

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.k5gk7k7.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    dbName: MONGODB_NAME,
  })
  .then(() => console.log("Connected to database"));
