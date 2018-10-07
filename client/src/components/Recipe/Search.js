import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';

import { SEARCH_RECIPES } from '../../queries';

class Search extends Component {
  state = {
    searchResults: []
  };
  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResults: searchRecipes
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className="App">
            <input
              type="search"
              placeholder="Search for Recipes"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(recipe => (
                <li key={recipe.id}>
                  <Link to={`/recipes/${recipe.id}`}>
                    <h4>{recipe.name}</h4>
                  </Link>
                  <p>Likes: {recipe.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
