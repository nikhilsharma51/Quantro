import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='min-h-screen bg-[#0d1320]'>
      
      <Navbar/>

      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/dashboard' element = {<Dashboard/>}/>
        {/* <Route path = '/profile' element = {<Profile/>}/> */}
      </Routes>

      <Footer/>
    </div>
  )
}

export default App