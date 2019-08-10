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
      addEmployeeBtnClicked: false,
      editEmployeeBtnClicked: false
    };

    //@TODO: pass these to appropriate child components so they can trigger state change here
    this.editEmployee = this.editEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    // fetch employees and set to state.employees
    fetch('https://randomuser.me/api/?results=30&nat=us&inc=name,picture,email')
    .then(response => response.json())
    .then(data => {
      let employees = data.results;

      employees.forEach((emp, idx) => {
        emp.id = ++idx;
        if (emp.id === 1) emp.job = 'ceo';
        else if (emp.id === 2) emp.job = 'cto';
        else if (emp.id < 9) emp.job = 'project manager';
        else if (emp.id < 15) emp.job = 'designer';
        else emp.job = 'developer';
      });

      this.setState({ employees: data.results })
    });
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
    let employees = this.state.employees,
      name = {},
      job = '',
      email = '',
      id = ++this.state.employees.length;

    name.first = newEmployee.firstName.value;
    name.last = newEmployee.lastName.value;
    job = newEmployee.jobTitle.value;
    email = newEmployee.email.value;

    employees.push({name,job,email,id});
    this.setState({
      employees,
      addEmployeeBtnClicked: false
    });
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
      {/*LIST ALL EMPLOYEES*/}
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
