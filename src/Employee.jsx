import React from 'react';

export default function Employee(props) {
  const {employee} = props;

  return (
    <div>
      <img src={employee.picture && employee.picture.thumbnail} alt={`${employee.name.first} ${employee.name.last} thumbnail`}></img>
      <p>Employee Id: {employee.id}</p>
      <p>{`${employee.name.first} ${employee.name.last}`}</p>
      <p>{employee.job}</p>
      <p>{employee.email}</p>
    </div>
  )
}