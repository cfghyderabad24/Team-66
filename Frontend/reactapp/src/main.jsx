import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route,RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import Layout from './layout.jsx'
import Announcements from './components/Announcements.jsx'
import Donate from './components/Donate.jsx'
import Login from './components/login.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>} >
     <Route path='/' element={<Home/>}/>
     <Route path='/announcements' element={<Announcements/>}/>
     <Route path='/donate' element={<Donate/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path="*" element={<div>not found</div>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
