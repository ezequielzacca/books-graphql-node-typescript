import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/type-defs";
import { resolvers } from "./graphql/resolvers";

import express from "express";
import mongoose from "mongoose";

const startServer = async () => {
  const app = express();

  // Resolvers define the technique for fetching the types in the
  // schema.  We'll retrieve books from the "books" array above.

  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/books", {
    useNewUrlParser: true
  });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  app.listen({ port: 4000 }, () => {
    console.log(
      `🚢 Server Shipped at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startServer()
  .then()
  .catch(console.log);
