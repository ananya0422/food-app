import React from 'react'
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import Pizza from './components/Pizza'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import Register from './components/Register'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthLayout } from './components/AuthLayout'
import  Imageslider  from './components/Imageslider'
import  Address from './components/Address'
import RazorpayButton from './components/RazorpayButton'
import PaymentSuccess from './components/PaymentSuccess'




function App() {


  return (
    
  <div>
    
<Routes>


 <Route element={<AuthLayout />}>
  <Route path='/image' element={<Imageslider/>}/> 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
           <Route path="/address" element={<Address />} />
            <Route path="/button" element={<RazorpayButton />} />
              <Route path="/payment-success" element={<PaymentSuccess />} /> 

        </Route>


  <Route path='/' element={<Layout/>}>
  <Route path='/image' element={<Imageslider/>}/>
    <Route index element={<Home />} />
    
    <Route path='/cart' element={<Cart/>}/>
    {/* <Route path='/register' element={<Register/>}/> */}
    

     <Route element={<ProtectedRoute />}>
      <Route path="/pizza" element={<Pizza />} />
    </Route>


    </Route>



    
</Routes>

 


</div>  
    
  )
}

export default App


