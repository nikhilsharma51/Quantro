import React from 'react'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[250px_1fr] h-screen'>
      <Sidebar/>
      <MainContent/>
    </div>
  )
}

export default Dashboard