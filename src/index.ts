import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";

import { schema } from "./graphql/schema";

// Express
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.all("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen({ port: 4000 });
console.log("🚀 Server listening on http://localhost:4000/graphql");
