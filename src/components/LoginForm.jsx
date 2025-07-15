import { jwtDecode } from 'jwt-decode';
import  {  useEffect, useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';




function LoginForm() {

  const navigate = useNavigate();
  const[name,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const[error, setError] =useState('');
  const[message,setMessage] = useState('');
  //const[,setCartItems]= useState([]);


const {fetchUsersCart} = useCart();


  const token = localStorage.getItem('token');

  useEffect(()=>{
    if (token) {
  const decoded = jwtDecode(token);
  console.log("Decoded info:", decoded);  // { email, name, iat, exp }
}

  },[token])

// if (token) {
//   const decoded = jwtDecode(token);
//   console.log("Decoded info:", decoded);  // { email, name, iat, exp }
// }

 

   const handlelogIn = async (e)=>{

e.preventDefault();

   if(name.length<3 ){
setError("Username must be at least 3 character long")
return;
   }


   const payload={
    name : name,
    password :password,
   }
   console.log("output",payload)

  

  
  try{
     const res = await fetch('http://localhost:8000/login',{
      method:"POST",
      headers:{"Content-Type":"application/json",
        
      },
      body:JSON.stringify({name,password}),
    });

    const data = await res.json();
    console.log(data);

    if(res.ok && data.accessToken){

    
    localStorage.setItem('token' ,data.accessToken );
    console.log("token saved");
setMessage(` logged successfully!`);
setError('');
localStorage.setItem('user', JSON.stringify(data));
fetchUsersCart(token);




  
setTimeout(()=>{navigate('/pizza')}// go to home page and pass "fromLogin"
 ,1000)


console.log("Token:", data.accessToken);

    }
    else{
      setError('login failed!  '+ data.message)
    }

  

  }catch(err){
console.log(err);
setError('something went wrong . please try again later');

  }

  
   
   }

   

 


  return (
    <div className="wrapper flex justify-center items-center h-screen bg-gray-100">
    <form action={""} onSubmit={handlelogIn} className="bg-white p-8 rounded-lg shadow-lg w-96">

      <div className='flex justify-center gap-2 m-3 rounded-3xl'>
        <img  src="https://img.freepik.com/free-vector/food-delivery-illustration-with-bike-man-courier_1308-51210.jpg?ga=GA1.1.294946365.1733126253&semt=ais_hybrid&w=740"
                  className="h-14 w-14 rounded-full object-cover p-0.5" alt="logo" />
         <div className=''>
      <h1 className="text-4xl font-semibold text-gray-800 text-center ">LogIn</h1>
      </div>

      </div>


 {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {/* {logged  && <p className="text-green-600 mb-4"></p>} */}



        {/*  Show error message  */}
  {error && (
    <p className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded">
      {error}
    </p>
  )}
  
      <div className="input-box relative mb-4">
        <input
        value={name}
          type="text"
          placeholder="username"
          autoComplete='username'
          
          
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e)=>setUsername(e.target.value)}
        />
        <FaUserAlt className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
      </div>
  
      <div className="input-box relative mb-6">
        <input
        value={password}
          type="password"
          placeholder="password"
          
          
          autoComplete="current-password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           onChange={(e)=>setPassword(e.target.value)}
        />
        <FaLock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
      </div>
  
      <div className="remember-forget flex justify-between items-center mb-6">
        <label className="flex items-center text-gray-700">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
      </div>
  
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200" 
      >
        Login
      </button>
  
      <div className="register-link text-center mt-4">
        <span className="text-gray-600">Don't have an account?</span> <button onClick={()=>navigate('/register')} className="text-blue-600 hover:underline">Register here</button>
      </div>
    </form>
  </div>
  
  )

}
export default LoginForm

