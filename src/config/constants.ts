import { config } from "dotenv";

config();

export const MONGODB_USER = process.env.MONGODB_USER;
export const MONGODB_PASS = process.env.MONGODB_PASS;
export const MONGODB_NAME = process.env.MONGODB_DATABASE;

export const MSQLDB_HOST = process.env.MYSQLDB_HOST;
export const MSQLDB_USER = process.env.MYSQLDB_USER;
export const MSQLDB_PASS = process.env.MYSQLDB_PASS;
export const MSQLDB_SCHEMA = process.env.MYSQLDB_SCHEMA;
