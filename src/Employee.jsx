import React from 'react';

export default function Employee(props) {
  const {employee} = props;

  return (
    <div className="employee-profile">
      <img className="employee-img" src={employee.picture} alt={`${employee.firstName} ${employee.lastName} thumbnail`}></img>
      <div className="employee-info">
        <p>{`${employee.firstName} ${employee.lastName}`}</p>
        <p>{employee.job}</p>
        <p>Id: {employee.id}</p>
        <p>Email: {employee.email}</p>
      </div>
    </div>
  )
}