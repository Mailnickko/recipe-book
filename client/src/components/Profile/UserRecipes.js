import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GET_USER_RECIPES } from '../../queries';
import { Query } from 'react-apollo';

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
                <p>Likes: {recipe.likes}</p>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default UserRecipes;
