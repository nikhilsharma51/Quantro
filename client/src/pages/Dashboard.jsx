import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import MainContent from '../components/MainContent'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] h-screen'>
      <Sidebar/>
      <MainContent/>
    </div>
  )
}

export default Dashboard