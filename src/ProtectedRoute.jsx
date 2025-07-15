
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
 const user = JSON.parse(localStorage.getItem('user'));
 console.log(user);
 const token = user?.accessToken;

 if(!token){
  return <Navigate to="/login" replace/>
 }

  return <Outlet />;
}

