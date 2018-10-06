import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';
import Error from '../Error';

const initialState = {
  name: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: ''
};

class AddRecipe extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  clearState = () => {
    this.setState({
      ...initialState
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      console.log('Recipe back', data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { name, category, description, instructions } = this.state;

    const isInvalid = !name || !category || !description || !instructions;

    return isInvalid;
  };

  // manually update query
  updateCache = (cache, { data: { addRecipe } }) => {
    const cacheData = cache.readQuery({ query: GET_ALL_RECIPES });
    console.log('Optimistic Loading...start');
    debugger;

    cacheData.getAllRecipes = [addRecipe, ...cacheData.getAllRecipes];

    console.log('Optimistic Loaded', cacheData.getAllRecipes);

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: cacheData.getAllRecipes
      }
    });
  };

  render() {
    const { name, category, description, instructions, username } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username }}
        update={this.updateCache}>
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                <input type="text" name="name" placeholder="Recipe Name" onChange={this.handleChange} value={name} />
                <select name="category" onChange={this.handleChange} value={category}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Add description"
                  onChange={this.handleChange}
                  value={description}
                />
                <textarea
                  type="text"
                  name="instructions"
                  placeholder="Add instructions"
                  value={instructions}
                  onChange={this.handleChange}
                />
                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">
                  Submit
                </button>

                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddRecipe);
