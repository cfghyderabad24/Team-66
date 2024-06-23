import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route,RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import Layout from './layout.jsx'
import Announcements from './components/Announcements.jsx'
import Donate from './components/Donate.jsx'
import Volunteerlogin from './components/Volunteerlogin.jsx'
import Adminlogin from './components/Adminlogin.jsx'
import Volunteerregister from './components/volunteerregister.jsx'
import AdminHome from './components/AdminHome.jsx'
import VolunteerHome from './components/VolunteerHome.jsx'
import ParentHome from './components/ParentHome.jsx'
import Verify from './verify.jsx'
import AnnouncementHome from './components/AnnouncementHome.jsx';


const router= createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout/>} >
     <Route path='/' element={<Home/>}/>
     <Route path='/announcements' element={<AnnouncementHome/>}/>
     <Route path='/donate' element={<Donate/>}/>
     <Route path='/volunteerlogin' element={<Volunteerlogin/>}/>
    <Route path='/volunteer/home/:id' element={<VolunteerHome/>}/>
     <Route path='/adminlogin' element={<Adminlogin/>}/>
     <Route path='/admin/dashboard' element={<AdminHome/>}/>
     <Route path='/volunteerregister' element={<Volunteerregister/>}/>
     <Route path='/parent/:id/:uuid' element={<ParentHome/>} />
     <Route path="*" element={<div>not found</div>}/>
    <Route path='/verify' element={<Verify/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
