import React from 'react';
import DisplayItem from './DisplayItem.jsx'

const Display = (props) => (
  <div>
    <h4>Repos</h4>
    {props.repos.map((repo, index) => <DisplayItem key={index} repo={repo}/>)}
  </div>
)

export default Display;