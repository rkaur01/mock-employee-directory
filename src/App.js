import React, { Component } from 'react';
import Employee from './Employee';
import NewEmployee from './NewEmployee';
import EditEmployee from './EditEmployee';
import './App.css';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      staleData: false,
      addEmployeeBtnClicked: false,
      editEmployeeBtnClicked: false
    };

    //@TODO: pass these to appropriate child components so they can trigger state change here
    this.editEmployee = this.editEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  fetchData() {
    // fetch employees and set to state.employees
    fetch('http://localhost:3001/employees')
    .then(this.handleErrors)
    .then(response => response.json())
    .then(data => {
      let employees = data;
      
      this.setState({ employees })
    })
    .catch(error => console.log(error) );
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.staleData !== prevState.staleData) {
      this.fetchData()
    }
  }

  editEmployee(updatedEmployee) {
    // find employee by updatedEmployee.id and set that object in state to updatedEmployee data
    let employees = this.state.employees;
    const foundIndex = employees.findIndex(emp => emp.id === updatedEmployee.id);
    
    employees[foundIndex] = updatedEmployee;
    this.setState({
      employees,
      editEmployeeBtnClicked: false
    });
  }

  addEmployee(newEmployee) {
    // push newEmployee object to state
    let firstName = newEmployee.firstName.value,
      lastName = newEmployee.lastName.value,
      job = newEmployee.jobTitle.value,
      email = newEmployee.email.value;

    fetch('http://localhost:3001/employees', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({firstName,lastName,job,email})
    })
    .then(this.handleErrors)
    .then(response => this.setState({
      staleData: true,
      addEmployeeBtnClicked: false
    }))
    .catch(error => console.log(error) );
  }

  handleClick(btnName) {
    this.setState({[`${btnName}Clicked`]: true})
  }

  render() {
    const { employees, addEmployeeBtnClicked, editEmployeeBtnClicked } = this.state;

    return (
      <div>
      <h1>Employee Directory</h1>
      <NewEmployee addEmployeeBtnClicked={addEmployeeBtnClicked} handleClick={this.handleClick} addEmployee={this.addEmployee}></NewEmployee>
      <ul>
          {employees.map(employee => {
              return (
                  <li key={employee.id}>
                      <Employee employee={employee}></Employee>
                      <EditEmployee employee={employee} editEmployeeBtnClicked={editEmployeeBtnClicked} handleClick={this.handleClick} editEmployee={() => this.editEmployee(employee)}></EditEmployee>
                  </li>
              )
          })}
      </ul>
    </div>
    );
  }
}
