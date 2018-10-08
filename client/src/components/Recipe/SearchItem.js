import React from 'react';
import { Link } from 'react-router-dom';

const SeacrchItem = ({ id, name, likes }) => (
  <li key={id}>
    <Link to={`/recipes/${id}`}>
      <h4>{name}</h4>
    </Link>
    <p>Likes: {likes}</p>
  </li>
);

export default SeacrchItem;
