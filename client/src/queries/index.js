import { gql } from 'apollo-boost';

/* Recipes Queries */

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      id
      name
      instructions
      category
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(id: $_id) {
      id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`;

/* Recipes Mutations */

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;

/* User Mutations */
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;
