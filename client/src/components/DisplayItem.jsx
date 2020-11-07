import React from 'react';

const DisplayItem = (props) => (
  <div>

    <a href={props.repo.url}> {props.repo.id}: </a>
    <span> Forks: {props.repo.forks}</span>
    <span> {props.repo.name} </span>

  </div>
)

export default DisplayItem;