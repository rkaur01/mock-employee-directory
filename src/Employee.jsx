import React from 'react';

export default function Employee(props) {
  const {employee} = props;

  return (
    <div>
      <img src={employee.picture} alt={`${employee.firstName} ${employee.lastName} thumbnail`}></img>
      <p>Employee Id: {employee.id}</p>
      <p>{`${employee.firstName} ${employee.lastName}`}</p>
      <p>{employee.job}</p>
      <p>{employee.email}</p>
    </div>
  )
}