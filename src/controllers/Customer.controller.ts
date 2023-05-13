import { Document, ObjectId, UpdateResult, WithId } from "mongodb";

import { DB_NAME, client } from "../db/mongodb_config";
import { ICustomer } from "../interfaces/Customer.interface";

export const getCustomer = async (
  id: string
): Promise<WithId<Document> | null> => {
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const cutomer = await collection.findOne({ _id: new ObjectId(id) });
    console.log(cutomer);
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
  newCustomer: ICustomer
): Promise<WithId<Document> | null> => {
  const { email, name, phone } = newCustomer;
  if (email === "" && name === "" && phone === "") {
    return null;
  }
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const didInserted = await collection.insertOne({ email, name, phone });
    if (didInserted.insertedId) {
      const cutomer = await collection.findOne({
        _id: new ObjectId(didInserted.insertedId),
      });
      return cutomer;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
};

export const updateCustomer = async (
  customer: ICustomer
): Promise<WithId<Document> | null> => {
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
    if (didUpdated.modifiedCount === 1) {
      const cutomer = await collection.findOne({
        _id: new ObjectId(customer._id),
      });
      return cutomer;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
};

export const deleteCustomer = async (_id: string) => {
  try {
    await client.connect();
    const db = await client.db(DB_NAME);
    const collection = await db.collection("customers");
    const didUpdated = await collection.deleteOne({ _id: new ObjectId(_id) });
    return didUpdated.deletedCount === 1;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await client.close();
  }
};
