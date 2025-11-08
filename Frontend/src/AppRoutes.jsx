import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Profile from './Pages/Profile'
import UpdateProfile from './Pages/UpdateProfile'
import Company from './Pages/Company'
import AllTickets from './Pages/AllTickets'
import ViewTickets from './Pages/ViewTickets'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Invite from './Pages/Invite'
import AddTicket from './Pages/AddTicket'
import AddProject from './Pages/AddProject'
import AddCompany from './Pages/AddCompany'
import Mytasks from './Pages/Mytasks'
import InvitePage from './Pages/InvitePage'


function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/alltickets/:companyId/:projectId?' element={<AllTickets/>}/>
      {/* <Route path='/alltickets/:companyId' element={<AllTickets/>}/> */}
      
      <Route path='/viewtickets/:ticketId' element={<ViewTickets/>}/>
      <Route path='/company' element={<Company/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profileupdate' element={<UpdateProfile/>}/>
      {/* <Route path='/login' element={<Login/>}/> */}
      <Route path='/register' element={<Register/>}/>
      <Route path='/invite' element={<Invite/>}/>
      <Route path='/invitepage/:invitetoken' element={<InvitePage/>}/>
      <Route path='/addticket' element={<AddTicket/>}/>
      <Route path='/addproject' element={<AddProject/>}/>
      <Route path='/addcompany' element={<AddCompany/>}/>
      <Route path='/mytasks' element ={<Mytasks/>}/>
      
    </Routes>
  )
}

export default AppRoutes
