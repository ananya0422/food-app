import React, { useState } from 'react'

import { useCart } from './CartContext';
import { FaCartPlus } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';


const Pizza = () => {

  
   const[filter,setFilter] = useState("all");
   const{quantity,menu,cartmessage,removeFromCart,handleAddToCart,showdiv} =useCart();
   




   const navigate = useNavigate();
   



      const FilteredPizza = menu.filter((pizza)=>
        filter === "all" ? true : pizza.category ===filter
      
      );

     
      
  

  return (

    <div className='p-6 min-h-screen'>
      <h1 className='text-5xl font-extrabold'>Pizza</h1>
      <p className='font-semibold text-gray-500'> Cheesilicious pizzas to make every day extraordinary</p>

<div className="flex gap-4 mb-6 justify-center">
        <button onClick={() => setFilter("all")} className="px-4 py-1 bg-gray-300 rounded">All</button>
        <button onClick={() => setFilter("veg")} className="px-4 py-1 bg-green-500 text-white rounded">Veg</button>
        <button onClick={() => setFilter("non-veg")} className="px-4 py-1 bg-red-500 text-white rounded">Non-Veg</button>
      </div>


      {cartmessage && (
  <div className="mt-2 text-green-500 text-lg font-semibold">
    {cartmessage}
  </div>
)}


<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
  {FilteredPizza. map((pizza)=>(
    
    <div className='pizza-card ' key={pizza.id}>
      <div className='bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition hover:scale-105'>
      <img
      src ={pizza.image}
      alt={pizza.title}
      className='w-full h-40 object-cover rounded-lg mb-3'/>
{
  !quantity[pizza.title] ?(
    <button onClick={()=>handleAddToCart(pizza.title)}
    className='bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition'>Add</button>
  ) :(
    <div>
      <button onClick={()=>removeFromCart(pizza.title)}
        className='bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition'>-</button>
      <span>{quantity[pizza.title]}</span>
      <button onClick={()=>{
        const confirmed =window.confirm(`do you want to add more ${pizza.title}?`);
        if(confirmed){
      handleAddToCart(pizza.title)
    }
    
    }}
    className='bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition'>+</button>

      </div>
  )
}




      </div>
    
    <h1 className='text-lg font-semibold text-gray-800'>{pizza.title}</h1>
    <p className='text-gray-600 mb-2'>{pizza.price}</p>
    <p></p>
    </div>
    
  ))}



 

</div>

 {
  showdiv && (
    <div className=' bg-blue-400 fixed  bottom-1 left-1/2 ' onClick={()=> navigate('/cart')}>
      <div className='flex flex-row gap-x-32 m-4'>
      <h1 className='text-3xl font-sans p-2.5 text-white '> item added to the cart</h1>
      <button ><FaCartPlus  size={30} /></button>
      </div>
      </div>
  ) 
}

</div>

  )
}

export default Pizza