import React from 'react';
import { withRouter } from 'react-router-dom';

import { ApolloConsumer } from 'react-apollo';

const handleSignout = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {/*provided by apollo client. shape: obj of methods*/}
    {client => {
      return <button onClick={() => handleSignout(client, history)}>Signout</button>;
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
