import React from 'react'
import SideBar from '../components/SideBar'
import MainContent from '../components/MainContent'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-[250px_1fr] h-screen'>
      <SideBar/>
      <MainContent/>
    </div>
  )
}

export default Dashboard