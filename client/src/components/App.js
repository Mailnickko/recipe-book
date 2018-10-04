import React from 'react';
import '../App.css';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from './Recipe/RecipeItem';

const App = () => (
  <div className="App">
    <h1>Hello World</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error</div>;
        }
        console.log('allrecipes', data);
        return (
          <ul>
            {data.getAllRecipes.map(recipe => (
              <RecipeItem key={recipe.id} name={recipe.name} category={recipe.category} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
