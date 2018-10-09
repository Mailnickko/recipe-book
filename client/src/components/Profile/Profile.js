import React from 'react';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserRecipes username={session.getCurrent.username} />
  </div>
);

export default Profile;
