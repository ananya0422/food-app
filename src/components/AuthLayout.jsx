import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export const AuthLayout = () => {
  return (
    <div>
        <Header/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

