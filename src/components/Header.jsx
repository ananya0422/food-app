import React, { useState , useEffect} from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { useCart } from './CartContext';
import { jwtDecode } from "jwt-decode";
import { IoReorderThreeOutline } from "react-icons/io5";
//import { useCart } from './CartContext';

const Header = () => {

const navigate = useNavigate();
const {quantity} = useCart();
const user = JSON.parse(localStorage.getItem('user'));
const isLoggedIn = !!user?.accessToken;
const [totalQuantity, setTotalQuantity] = useState(0);
const [username,setUsername]= useState('');
//const{totalQuantity,setTotalQuantity} = useCart()

const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
 const total = Object.values(quantity).reduce((sum, qty) => sum + qty, 0); 


const handlelogOut =  (e) =>{
   e.preventDefault();
  localStorage.removeItem('user');
  setTotalQuantity(0);
   navigate('/login');
 }



 useEffect(()=>{

  if(token){
   const decoded = jwtDecode(token);
  // console.log(decoded);
   const username =decoded.name;
   //console.log(username)
   setUsername(username);
 }

},[token])



  useEffect(() => {
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
  if (!token) return;

  fetch('http://localhost:8000/cart', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

    //   const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setTotalQuantity(total);
      
      

    })
    .catch(err => console.error('Error fetching cart:', err));
},[ total]);

//const totalQuantity = Object.values(quantity).reduce((sum, qty) => sum + qty, 0);

 



  return (
    <div>
        <nav className="bg-orange-600 p-3 flex justify-between items-center w-full h-20">
              {/* Logo */}
              <div>
                <img
                  src="https://assets.zenn.com/strapi_assets/food_logo_5fbb88038c.png"
                  className="h-14 w-14 rounded-full object-cover"
                  alt="logo"
                />
              </div>
{ token ?(
              <div>
                <h3 className='text-3xl font-extrabold text-shadow-black capitalize animate-pulse'>welcome {username}</h3>
              </div> ) : <div></div> }
        
              {/* Search Bar */}
              <div className="relative w-64">
                <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search here....."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-black text-gray-600 focus:outline-none "
                />
              </div>
        
              {/* Location Selector */}
              <div className="relative w-64">
                <IoLocationSharp className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 focus:outline bg-white " />
                <select
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-black text-gray-600 focus:outline-none bg-white"
                >
                  <option value="indore">Indore, Madhya Pradesh</option>
                  <option value="ujjain">Ujjain, Madhya Pradesh</option>
                  <option value="dewas">Dewas, Madhya Pradesh</option>
                  <option value="bhopal">Bhopal, Madhya Pradesh</option>
                  <option value="ratlam">Ratlam, Madhya Pradesh</option>
                  <option value="riwa">Riwa, Madhya Pradesh</option>
                </select>
              </div>







<div className='buttons flex gap-2'>
{/* icon for small screen*/ }
<button className='sm:hidden' 
>
 <IoReorderThreeOutline size={32} /> 
</button>

              <button className='rounded-full bg-black p-2 px-5 text-white hover:bg-white hover:text-black border-2 border-black transition-all hidden sm:block'
               onClick={() => navigate('/')}
              ><FaHome /></button>




             
        
              {/* Sign In Button */}
              {!isLoggedIn?(
               <button 
                 className="rounded-full bg-black p-2 px-3 text-white hover:bg-white hover:text-black border-2 border-black transition-all hidden sm:block"
               onClick={() => navigate('/login')}
               >
                 Sign In
               </button>)
               :
               (
                <button className="rounded-full bg-black p-2 px-3 text-white hover:bg-white hover:text-black border-2 border-black transition-all hidden sm:block"
               onClick={handlelogOut}>Logout</button>
               )
}



<button
onClick={()=> navigate('/cart'  )}
className="rounded-full bg-black p-2 px-5  text-white hover:bg-white hover:text-black border-2 border-black transition-all relative hidden sm:block">
<BsCartPlus /> {totalQuantity > 0 && (<span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{totalQuantity}</span>)}
</button>
</div>

            </nav>

    </div>
  )
}

export default Header