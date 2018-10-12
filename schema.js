const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Recipe {
    id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String!
    likes: Int
    username: String
  }

  type User {
    id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Query {
    getAllRecipes: [Recipe]

    getCurrentUser: User

    getRecipe(id: ID!): Recipe

    searchRecipes(searchTerm: String): [Recipe]

    getUserRecipes(username: String!): [Recipe]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
    deleteUserRecipe(id: ID!): Recipe

    signInUser(username: String!, password: String!): Token
    signUpUser(username: String!, email: String!, password: String!): Token

    likeRecipe(id: ID!, username: String!)
  }
`;
