import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Login from './pages/Login'
import { useLocation } from 'react-router-dom'


const App = () => {

  const location = useLocation();
  const hideshell = ['/login', '/signup','/dashboard'].includes(location.pathname);
  return (
    <div className='min-h-screen bg-[#0d1320]'>
      {!hideshell && <Navbar/>}

      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/dashboard' element = {<Dashboard/>}/>
        <Route path = "/login" element = {<Login/>}/>
        {/* <Route path = '/profile' element = {<Profile/>}/> */}
      </Routes>

     {!hideshell && <Footer/>}
    </div>
  )
}

export default App