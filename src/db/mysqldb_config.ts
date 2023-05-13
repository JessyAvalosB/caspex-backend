import { config } from "dotenv";
import { createConnection } from "promise-mysql";

config();

export const client = async () => {
  try {
    return await createConnection({
      host: process.env.MYSQLDB_HOST,
      user: process.env.MYSQLDB_USER,
      password: process.env.MYSQLDB_PASS,
      database: process.env.MYSQLDB_SCHEMA,
    });
  } catch (error) {
    console.error("Error creating connection: ", error);
  }
};
