import { NexusGenObjects } from "./../../nexus-typegen";
import {
  Document,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
} from "mongodb";

import { DB_NAME, client } from "../db";

export const getCustomer = async (
  id: string
): Promise<WithId<Document> | null> => {
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const cutomer = await collection.findOne({ _id: new ObjectId(id) });
    return cutomer;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
};

export const getCustomers = async (): Promise<WithId<Document>[]> => {
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const cutomers = await collection.find({}).toArray();
    return cutomers;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await client.close();
  }
};

export const addCustomer = async (
  newCustomer: NexusGenObjects["Customer"]
): Promise<InsertOneResult<Document> | null> => {
  const { email, name, phone } = newCustomer;
  if (email === "" && name === "" && phone === "") {
    return null;
  }
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const didInserted = await collection.insertOne({ email, name, phone });
    return didInserted;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
};

export const updateCustomer = async (
  customer: NexusGenObjects["Customer"]
): Promise<UpdateResult<Document> | null> => {
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const didUpdated = await collection.updateOne(
      { _id: new ObjectId(customer._id) },
      {
        $set: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      }
    );
    return didUpdated;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const didUpdated = await collection.deleteOne({ _id: new ObjectId(id) });
    return didUpdated;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
};
