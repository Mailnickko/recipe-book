import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GET_USER_RECIPES, DELETE_USER_RECIPE } from '../../queries';
import { Query, Mutation } from 'react-apollo';

const handleDelete = deleteUserRecipe => {
  const confirmDelete = window.confirm('Delete Recipe?');
  if (confirmDelete) {
    deleteUserRecipe().then(({ data }) => {
      console.log(data);
    });
  }
};

const UserRecipes = ({ username }) => (
  <Query query={GET_USER_RECIPES} variables={{ username }}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      return (
        <Fragment>
          <h3>Your Recipes</h3>
          <ul>
            {data.getUserRecipes.map(recipe => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>
                  <p>{recipe.name}</p>
                </Link>
                <p style={{ marginBottom: '0' }}>Likes: {recipe.likes}</p>
                <Mutation mutation={DELETE_USER_RECIPE} variables={{ id: recipe.id }}>
                  {deleteUserRecipe => {
                    return (
                      <p className="delete-button" onClick={() => handleDelete(deleteUserRecipe)}>
                        X
                      </p>
                    );
                  }}
                </Mutation>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default UserRecipes;
