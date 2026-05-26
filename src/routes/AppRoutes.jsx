import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import EmployeeDetails from '../pages/EmployeeDetails'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/employeeDetails/:id' element={<EmployeeDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
  )
}

export default AppRoutes
