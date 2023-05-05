import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import dotenv from "dotenv";

import { schema } from "./schema";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import "./db/";

export const server = new ApolloServer({
  schema,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
