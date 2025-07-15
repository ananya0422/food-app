import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

const Layout = () => {
  
  
  return (
    <div>
        <Header/>
        <main className="pt-1">
            <Outlet/>
            </main>
            <Footer/>
            
    </div>
  )
}

export default Layout