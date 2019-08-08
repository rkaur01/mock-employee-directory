import React, { Component } from 'react';
import Employee from './Employee';
import NewEmployee from './NewEmployee';
import './App.css';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };

    //@TODO: pass these to appropriate child components so they can trigger state change here
    this.editEmployee = this.editEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
  }
  
  componentDidMount() {
    // fetch employees and set to state.employees
    fetch('https://randomuser.me/api/?results=30&inc=name,picture,email')
    .then(response => response.json())
    .then(data => {
      //@TODO: modify data to give each employee index as id and some position
      this.setState({ employees: data.results })
    });
  }

  editEmployee(updatedEmployee) {
    // find employee by updatedEmployee.id and set that object in state to updatedEmployeeData
    let employees = this.state.employees;
    const foundIndex = employees.findIndex(emp => emp.id === updatedEmployee.id);
    
    employees[foundIndex] = updatedEmployee;
    this.setState({ employees });
  }

  addEmployee(newEmployee) {
    // push newEmployee object to state
    let employees = this.state.employees;

    employees.push(newEmployee);
    this.setState({ employees });
  }

  render() {
    const { employees } = this.state;

    return (
      <div>
      <h1>Employee Directory</h1>
      <NewEmployee addEmployee={this.addEmployee}></NewEmployee>
      {/*LIST ALL EMPLOYEES*/}
      <ul>
          {employees.map(employee => {
              return (
                  <li key={employee.id}>
                      <Employee employee={employee}></Employee>
                  </li>
              )
          })}
      </ul>
    </div>
    );
  }
}




// <Router>
// <div>
//   <Switch>
//     <Route exact path="/employees" component={EmployeeList} />  
//     <Route exact path="/employees/addEmployee" component={NewEmployee} />                    
//     <Route path="/employees/:employeeId" component={Employee} />
//   </Switch>
// </div>
// </Router>
// example of stateless components, cant use lifecycle hooks, save as js instead of jsx i think
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

//     </div>
//   );
// }

// export default App;
