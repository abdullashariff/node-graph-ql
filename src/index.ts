// import introspectionQueryResult from "./schema.json";
// import mockJSON from "./mock.json";
import graphqlHTTP from "express-graphql";
import express from 'express';
// import faker from 'faker';
// import get from "lodash.get";
// import axios from "axios";
const { buildSchema } = require('graphql');

// import { buildClientSchema, IntrospectionQuery } from "graphql";
// import { addMockFunctionsToSchema } from "graphql-tools";

// Initialize Express
const app = express();

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
    getUser(id: Int!): User
  }

  type User {
    id: Int
    name: String
    age: Int
  }
`);

// Define the root resolver
const root = {
  hello: () => {
    return 'Hello, World!';
  },
  getUser: ({ id }) => {
    const users = [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Doe', age: 30 },
    ];
    return users.find(user => user.id === id);
  },
};

// Setup the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,  // Enable the GraphiQL UI for testing queries
}));

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});