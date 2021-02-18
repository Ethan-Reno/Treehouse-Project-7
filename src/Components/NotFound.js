import React from 'react';
import {NavLink} from 'react-router-dom'

const NotFound = () => (
  <div>
    <h2>404 - Page not found</h2>
    <p>The requested URL was not found on the server</p>
    <nav className="main-nav">
      <ul>
        <li><NavLink to={`/search`}>Back to search</NavLink></li>
      </ul>
    </nav>
  </div>
);

export default NotFound;