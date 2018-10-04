import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {/* refetch supplied by Apollo to allow us to resend a query on state change*/}
    {({ data, loading, refetch }) => {
      if (loading) {
        return null;
      }
      return <Component {...props} session={data} refetch={refetch} />;
    }}
  </Query>
);

export default withSession;
