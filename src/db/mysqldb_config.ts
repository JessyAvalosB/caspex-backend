import { createConnection } from "promise-mysql";

import {
  MSQLDB_HOST,
  MSQLDB_USER,
  MSQLDB_PASS,
  MSQLDB_SCHEMA,
} from "../config/constants";

export const client = async () => {
  try {
    return await createConnection({
      host: MSQLDB_HOST,
      user: MSQLDB_USER,
      password: MSQLDB_PASS,
      database: MSQLDB_SCHEMA,
    });
  } catch (error) {
    console.error("Error creating connection: ", error);
  }
};
