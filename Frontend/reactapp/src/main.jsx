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
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>} >
     <Route path='/' element={<Home/>}/>
     <Route path='/announcements' element={<Announcements/>}/>
     <Route path='/donate' element={<Donate/>}/>
     <Route path='volunteerlogin' element={<Volunteerlogin/>}/>
     <Route path='adminlogin' element={<Adminlogin/>}/>
     <Route path='/volunteerregister' element={<Volunteerregister/>}/>
     <Route path="*" element={<div>not found</div>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
