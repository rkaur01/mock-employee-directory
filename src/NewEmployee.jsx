import React from 'react';

export default function NewEmployee(props) {
  return (
    <div>
      { 
        props.addEmployeeBtnClicked?

        <form onSubmit={evt => props.addEmployee(evt.target)}>
          <label>
            First name:
            <input
              name="firstName"
              type="text"/>
          </label>
          <br />
          <label>
            Last name:
            <input
              name="lastName"
              type="text"/>
          </label>
          <br />
          <label>
            Job Title:
            <input
              name="jobTitle"
              type="text"/>
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="text"/>
          </label>
          <br />

          <button type="submit">Create Employee</button>
        </form>

        :

        <button onClick={() => props.handleClick('addEmployeeBtn')}>Add Employee</button>
      }
    </div>
  )
}