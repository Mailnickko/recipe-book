import React, { Component } from 'react';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2>Sign up</h2>
        <form className="form">
          <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
          <input type="email" name="email" placeholder="Email Address" value={email} onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={this.handleChange}
          />
          <button type="submit" className="button-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
