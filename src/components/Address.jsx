import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { jwtDecode } from 'jwt-decode';
//import { useCart } from './CartContext';


const Address = ()=> {

   const navigate = useNavigate();
   const [name,setName] = useState('');
   const [phone_number,setPhonenum] = useState('');
   const [pincode,setPincode] = useState('');
   const [emailAdd,setEmailadd] = useState('');
   const [address,setaddress] = useState('');
   const [city,setCity] = useState('');
   const [state,setstate] = useState('');

   const{grandTotal}=useCart();

   const payble = grandTotal + 150 ;

const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

useEffect(()=>{
   if(token){
      const decoded = jwtDecode(token);
      const email = decoded.email;
      console.log(email);
   }
},[token])





const handleDeliveryAddress = async()=>{
   //e.preventDefault();
   await fetch('http://localhost:8000/cart/deliveryadd',{
   method:'POST',
    headers: {
         'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },

       body: JSON.stringify({
   name ,phone_number :phone_number || null,emailAdd,pincode,address,city,state
  })
}).then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err))
}


  return (

<div className='flex flex-row '>


    <div className='m-6  p-2 w-4xl'>

<div className=' m-6 '><h1 className='text-2xl font-medium'> Add Shipping Address </h1></div>
<div className='flex flex-row'>

        <div className='m-4 w-full'>
            
             <input
             value={name}
             type='text'
             placeholder='Name'
             className='w-full border-2  p-2.5'
             onChange={(e)=>{
               setName(e.target.value);
             }}/>

            </div>

            <div className='m-4 w-full'>
            
             <input
             type='number'
             value={phone_number}
             placeholder='Phone Number'
             className='w-full border-2  p-2.5'
              onChange={(e)=>{
               setPhonenum(e.target.value);
             }}/>

                 </div>
            </div>


            <div className='flex flex-row '>


            <div className='m-4 w-full'>
                
             <input
             type='number'
             value={pincode}
             placeholder='Pincode'
             className='w-full border-2  p-2.5'
              onChange={(e)=>{
               setPincode(e.target.value);
             }}/>

            </div>

            <div className='m-4 w-full'>
                
             <input
             type='email'
             value={emailAdd}
             placeholder='Email'
             required
            
             className='w-full border-2  p-2.5'
              onChange={(e)=>{
               setEmailadd(e.target.value);
             }}/>

            </div>

            </div>

            

             <div className='m-4'>
               <textarea
               value={address}
               placeholder='Addresss (Area and Street)'
               rows={5}
               cols={50}
               className='w-full border-2  p-2.5'
                onChange={(e)=>{
               setaddress(e.target.value);
             }}
            />

            </div>


<div className='flex flex-row'>
             <div className='m-4 w-full'>
                
             <input
             type='text'
             value={city}
             placeholder='City/District/Town'
             className='w-full border-2  p-2.5'
              onChange={(e)=>{
               setCity(e.target.value);
             }}
             />

            </div>

             <div className=' m-4 w-full'>
                
             <input
             type='text'
             value={state}
             placeholder='State'
             className='w-full border-2  p-2.5'
              onChange={(e)=>{
               setstate(e.target.value);
             }}/>

            </div>

            </div>

            


            {/* <div className='m-4 flex flex-row gap-5 text-xs'>
               
                 <label className=''>
               <input
               type='checkbox'/>
               Same as Billing Address
               </label> 

               <div className='text-xs'>
                  <button className='text-green-400 ' onClick={()=>{navigate('/register')}}>  Add Billing Address </button>
               </div>
            </div> */}

         
      
            <div className='m-4 bg-green-400 p-2 flex justify-center ' onClick={()=>{
               
                  handleDeliveryAddress();
                  //navigate('/payment')
               }}> 
               <button className='font-semibold text-white   ' > Save and Deliver here </button>
            </div>
</div>


<div className='m-5 border-2 border-gray-300 rounded-2xl'></div>


<div className='m-5  w-auto p-5 '>
   <div className=' m-2 flex flex-row  p-2'>
      <div className='mr-2' onClick={()=>{navigate('/cart')}}>
      <h1 className='font-medium'>Cart</h1>
      </div>
      <div className="w-20 h-0.5 border-t-2 border-dashed border-gray-500 my-3.5 mx-auto rounded-b-2xl"></div>

      {/* <div className=' border-dashed  border-gray-500 border-2' ></div> */}
      <div className=''> 
      <h1 className='font-medium text-green-500 ml-1'>Delivery</h1>
      </div>
      <div className=' border-dashed   border-gray-500 border-t-2  w-20  my-3.5 max-auto'></div>
      <div className=''>
      <h1 className='font-medium'>Payment</h1>
      </div>
   </div>
   <div>
      <div className='m-4 mt-15'>
      <h1 className='text-3xl font-bold'>Order Summary</h1>
      
      </div>
      <div className='mb-2 shadow-md  drop-shadow-white mt-10 p-3'>
 <div  className='flex flex-row gap-50 m-4 '>
      <h1 className='text-md font-medium'>Order Total</h1>
      <span className='text-sm font-medium' >Rs.{grandTotal}</span>
      
      </div>

       <div className='flex flex-row gap-40 m-4 '>
      <strong className='text-md font-medium '>Delivery Charges</strong>
      <span className='text-sm font-medium'>Rs.150</span>
      </div>
      </div>


<div className=' shadow-md drop-shadow-white p-3 '>
       <div className='m-4 mt-12  '>
      <h1 className='text-xl font-medium'>Delivery Summary</h1>
      <div className='flex flex-row gap-10 mt-5'>
 <img src='https://cdn-icons-png.flaticon.com/512/6213/6213198.png' className='w-15 h-15'/> 
 
  <div className=' '>    
<h3 className='mt-2'>Standard Delivery</h3>
<h2>Rs.120</h2>
</div>

</div>
<div className='flex justify-end'>
   <button className='text-green-400 font-md text-xs'>Change</button>
</div>
      </div>
      
      </div>
<div>
       <div className='m-4 mt-7 flex flex-row gap-50'>
      <h1 className='text-md font-medium '>TotalPayble</h1>
      <span className='text-sm font-medium'>Rs.{payble}</span>
      
      </div>
      </div>
 <div className='bg-orange-600 p-2 m-4 flex justify-center' onClick={()=> navigate('/cart')}>
      <button className='text-md font-bold text-white'>Place Order</button>
      
      </div>

   </div>
</div>

</div>


  )
}

export default Address