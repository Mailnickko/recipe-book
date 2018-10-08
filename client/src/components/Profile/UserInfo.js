import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
  const dateTimeObj = new Date(date);
  const newDate = dateTimeObj.toLocaleDateString('en-US');
  const newTime = dateTimeObj.toLocaleTimeString('en-US');

  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div>
    <h3>Userinfo</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>

    <ul>
      <h3>
        {session.getCurrentUser.username}
        's Favorites
      </h3>
      {session.getCurrentUser.favorites.map(favorite => (
        <li key={favorite.id}>
          <Link to={`/recipes/${favorite.id}`}>
            <p>{favorite.name}</p>
          </Link>
        </li>
      ))}
      {!session.getCurrentUser.favorites.length && (
        <p>
          <strong>You have favorites. Go add some!</strong>
        </p>
      )}
    </ul>
  </div>
);

export default UserInfo;
