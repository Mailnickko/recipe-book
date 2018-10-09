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
      username
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      id
      name
      likes
    }
  }
`;

/* Recipes Mutations */

export const ADD_RECIPE = gql`
  mutation($name: String!, $description: String!, $category: String!, $instructions: String!, $username: String) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
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

export const DELETE_USER_RECIPE = gql`
  mutation($id: ID!) {
    deleteUserRecipe(id: $id) {
      id
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        id
        name
      }
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      id
      name
      likes
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
