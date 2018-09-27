const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// GraphQL middleware
const { ApolloServer } = require('apollo-server-express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Schemas
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();
// Connect Schemas with GraphQL

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Recipe,
    User
  }
});
server.applyMiddleware({ app, path: '/graphql' });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(`Something went wrong: ${err}`));

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
