import React, { useEffect, useRef, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import { jwtDecode } from "jwt-decode";
import {  useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { RiShoppingBasketFill } from "react-icons/ri";
import { useCart } from './CartContext';
import { FcCloseUpMode } from "react-icons/fc";
import { ImBin } from "react-icons/im";
import RazorpayButton from './RazorpayButton';


const Cart = () => {
  

  const[username,setUsername] = useState('');
  const deliveryRef= useRef(null);
  const navigate = useNavigate();
  
  

   const{addToCart,removeFromCart,quantity,deleteFromCart,totalQuantity,CartItems,grandTotal} =useCart();

   const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
const [Email,setEmail] =useState('');


   useEffect(()=>{
   
     if(token){
      const decoded = jwtDecode(token);
     // console.log(decoded);
      const username =decoded.name;
      const email =decoded.email;
      setEmail(email);
      //console.log(username)
      setUsername(username);
    }
   
   },[token])



  


  return (
    


    // <div className='flex justify-center items-start bg-gray-300 h-204 py-10 ' >
    <div className="bg-gray-300 min-h-screen flex flex-row items-start py-10">


      

        <div className='min-h-full m-5 ' >
          

            <div className='bg-white  p-10 flex gap-5 overflow-hidden mt-3  '>
              
               {!token?(
               
               <div className='h-35 w-1/3 '>
                
                <div className='flex gap-5 '>
              <VscAccount size={32} className='animate-pulse'/>
              <span className='mb-1.5'> <h1 className='text-black font-bold text-2xl'>Account</h1></span>
              </div>
               <div className='m-2 ml-10'>
                <p className='text-gray-500 font-medium text-s  '>To place your order now, log in to your existing account or sign up</p>
                <button className='p-3 font-semibold rounded-xl border-2 mr-0.5 mt-2 bg-green-500 text-sm text-white hover:bg-white hover:text-green-500 border-green-500'
                onClick={()=>navigate('/login')}>Have an account ? <br/>LOG IN</button>
                
                <button className=' p-3 font-semibold rounded-xl border-2 mr-0.5 mt-2 bg-green-500 text-sm text-white hover:bg-white hover:text-green-500 border-green-500 duration-200 ease-out '
                onClick={()=>navigate('/login')}>New to Us?<br/>
                    SIGN UP
                </button>
                </div>
                </div>) : <div className='h-35 '>
                  <div className=' p-3 rounded-xl mb-6 shadow-1xl'>
                  <div className='animate-pulse '>
                    <FcCloseUpMode size={50} />
                  </div>
                  <div className='mt-3 w-xl'>
                    <div className='font-serif text-2xl mb-1.5'>{username}</div>
                     <div className=' border-2 rounded-xl mt-4 animate-pulse'></div>
                      <div className='mt-4 font-serif text-xl '>{Email}</div>
                  </div>
                  </div>
                  
                  </div>}
            
                <div>
                <img src='https://img.freepik.com/free-vector/vector-cartoon-illustration-traditional-set-fast-food-meal_1441-331.jpg?ga=GA1.1.294946365.1733126253&semt=ais_hybrid&w=740'
                className='h-30 w-30 rounded-full'/>
                </div>
            </div> 
<div onClick={()=>navigate('/Address')}>
<div className='mt-5  bg-white p-8 flex '  ref={deliveryRef} >
<IoLocationOutline size={32} className='animate-pulse'/>
 <span className='text-gray-800 ml-9'>Delivery</span>
 
</div>

<div className='mt-5 bg-white p-8 flex ' >

<GiWallet size={32} className='animate-pulse'/>  
<span className='text-gray-800 ml-9'>Payments</span>
<RazorpayButton/>
</div>
</div>




        </div>


        {/* <div className='ml-5 h-svw '> */}
        <div className="ml-5 flex flex-col max-h-[90vh] overflow-hidden">

  {/* <div className='m-10 bg-white w-5/6  rounded-xl p-5 h-100 overflow-y-scroll '>  */}
  <div className="m-10 bg-white w-2/3 rounded-xl p-5 overflow-y-auto max-h-[60vh]">

  <div className='flex gap-5 '>
<h2 className='text-4xl font-bold text-gray-600 mb-5 animate-pulse  '>Your Cart</h2>
<div className='relative'>
<RiShoppingBasketFill  size={40} className='hover:scale-150 '/>
{totalQuantity > 0 && (<span className='absolute bg-black text-white top-0  right-0 left-6  text-sm p-3   font-bold rounded-xl w-5 h-5 flex items-center justify-center animate-bounce'>{totalQuantity}</span>)}
</div>

</div>
<div className='bg-black border-2 mb-2 w-50  rounded-full'></div>

{CartItems.length===0 ?(<p>your cart is empty.</p>) :(
  CartItems.map(pizza=>(<div key={pizza.title}className='text-xl p-5  shadow-md shadow-gray-500  rounded-xl '>
    <p><strong>{pizza.title}</strong></p>
    <div className='flex relative'>

    <p>Quantity : {quantity[pizza.title]}</p>

    <div className="flex left-32 bottom-0.5  gap-2 mt-7 absolute">
      <button 
        className="bg-green-500 text-white px-2 py-0 rounded"
        onClick={() => {
          
          addToCart(pizza.title)}}
      >
        +
      </button>
      <button 
        className="bg-red-500 text-white px-2 rounded"
        onClick={() => removeFromCart(pizza.title)}
      >
        −
      </button>
<button className='' onClick={()=>{
  const confirmed = window.confirm(`are you sure to delete item ${pizza.title}`);
  if(confirmed){
  deleteFromCart(pizza.title)}}}><ImBin  size={25}/></button>
      
      
  </div>
      </div>
    <p>Price: {pizza.price}</p>
    <p>Total :{(quantity[pizza.title] || 0)*parseInt(pizza.price.replace('₹', ''))} </p>
    

</div>

  )

)
 
)

}
</div> 



 <div className=' ml-15 font-mono text-xl mt-0 bg-white rounded-xl p-3  hover:scale-y-150 shadow-xl shadow-white w-1/2'>
 <p>Grand-Total : ₹{grandTotal}</p>
</div>


</div> 


    </div>
  )
}

export default Cart














