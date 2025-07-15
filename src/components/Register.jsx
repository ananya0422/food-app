import React, { useState } from 'react'


import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Register = () => {

const[email,setEmail]=useState('');
const[name,setName] =useState('');
const[password,setPassword] =useState('');
const[successMsg,setSuccessMsg] =useState('');
const [error, setError] = useState('');

const navigate = useNavigate();

const handleRegister = async(e)=>{
    e.preventDefault();

    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters.');
      return;
    }
    if (email.trim().length < 2) {
      setError('Job must be at least 2 characters.');
      return;
    }

try{
const res = await fetch('http://localhost:8000/users',{
  method:"POST",
  headers:{"Content-Type": "application/json"

  },
  body: JSON.stringify({name,email,password})
});

const data = await res.json();
console.log(data);

if(res.ok){

  setSuccessMsg(`Registered successfully! ID: ${data.id}`);
  
        setError('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Registration failed.');
      }
    }

      catch(err){
        console.log(err)
    setError('something went wrong');

      }

    };

  return (
   <div>
    <div className="wrapper flex justify-center items-center h-screen bg-gray-100">
        <form className="bg-white p-8 rounded-lg shadow-lg w-96" onSubmit={handleRegister}>

          <div className ='mb-5 relative'>

            <h1 className='text-3xl font-semibold'>Sign up </h1>
            <button className='text-orange-500 text-xs font-semibold'
            onClick={()=> navigate('/login')}> <span className='text-xs text-black font-semibold'> or</span>  login to your account</button>
            <div>
                <img  src='https://img.freepik.com/premium-photo/drawing-table-full-food-drinks-including-sandwiches-burgers_1132399-9702.jpg?ga=GA1.1.294946365.1733126253&semt=ais_hybrid&w=740' alt='food'
                className='h-18 absolute right-2.5 bottom-0'/>
            </div>
            </div>

           

             <div className='relative mb-4'>

                  {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}


                <MdOutlinePermPhoneMsg className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
                <input 
                value={name}
                type='text'
                placeholder='name'
                required
                className="  w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 "
                onChange={(e)=>setName(e.target.value)}/>
            </div>

             <div className='relative mb-4'>

                <MdEmail  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
                <input 
                value={email}
                type='text'
                placeholder='post'
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                 onChange={(e)=>setEmail(e.target.value)}/>
            </div>


              <div className='relative mb-4'>
<FaLock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />

                <input 
                value={password}
                type='password'
                placeholder='Password'
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                 onChange={(e)=>setPassword(e.target.value)}/>
            </div> 

            <div className=''>
                <button type="submit" className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200">Register</button>
                <p className='text-xs text-gray-400 font-semibold mt-1'> By creating an account ,i accept the<span className='text-md text-black font-semibold'>  Terms & Conditions & Privacy Policy</span></p>
            </div>

        </form>
    </div>
   </div>
  )
}
export default Register