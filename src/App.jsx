import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './page/Login'
import EmployeeLogin from './page/EmployeeLogin'
import Home from './page/Home'
import Attendence from './page/Attendence'
import History from './page/History'
import Employee from './page/Employee'
import EmployeeDashboard from './page/EmployeeDashboard'
const App = () => {
  return (
 <Routes>
  <Route path='/' element ={<Login/>} />
  <Route path='/employeelogin' element ={<EmployeeLogin/>} />
  <Route path='/admin' element ={<Home/>} />
  <Route path='/attendence' element ={<Attendence/>} />
  <Route path='/history' element ={<History/>} />
  <Route path='/employee' element={<Employee/>}/>
  <Route path='/employeedashboard/:id' element={<EmployeeDashboard/>}/>
 </Routes>
  )
}

export default App