import React from 'react';

const NoResults = ({searchTag}) => (
  <div className = 'container'>
    <h2>No results found</h2>
    <h4>"{searchTag}"" did not return any results, please try again.</h4>
  </div>
)

export default NoResults;