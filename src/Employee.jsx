import React from 'react';

export default function Employee(props) {
  const {employee} = props;

  return (
    <div>
      <p>{employee.name.first}</p>
    </div>
  )
}