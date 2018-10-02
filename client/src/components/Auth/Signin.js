import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: '',
  password: ''
};

class Signin extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({
      ...initialState
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e, signInUser) => {
    e.preventDefault();
    signInUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signInUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    return !username || !password;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2>Sign in</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {/* Because mutations return, parentVal, and args obj */}
          {(signInUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={e => this.handleSubmit(e, signInUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button type="submit" className="button-primary" disabled={loading || this.validateForm()}>
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
