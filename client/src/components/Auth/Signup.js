import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

class Signup extends Component {
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

  handleSubmit = (e, signUpUser) => {
    e.preventDefault();
    signUpUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signUpUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    return !username || !email || !password || password !== passwordConfirmation;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2>Sign up</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {/* Because mutations return, parentVal, and args obj */}
          {(signUpUser, { data, loading, error }) => {
            return (
              <form className="form" onSubmit={e => this.handleSubmit(e, signUpUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
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

export default withRouter(Signup);
