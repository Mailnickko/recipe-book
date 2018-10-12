import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.decription}</p>
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created By: {data.getRecipe.username}</p>

            <LikeRecipe id={_id} />
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
