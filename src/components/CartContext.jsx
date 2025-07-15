import { createContext,useState,useContext,useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const CartContext = createContext();

export const CartProvider = ({children})=>{
     const[quantity ,setQuantity] = useState({});
     const[cartmessage,]=useState('');
     const [emailId,setemailId] =useState(null);
     const[menu, setMenu] = useState([]);
      const token = localStorage.getItem('token');
      //const[cartItems,setCartItems] = useState([])
      const[showdiv,setShowdiv] = useState(false);
      //const [totalQuantity, setTotalQuantity] = useState(0);
      //const totalQuantity = Object.values(quantity).reduce((sum, qty) => sum + qty, 0); 

      //const total = Object.values(quantity).reduce((sum, qty) => sum + qty, 0); 

      const CartItems = menu.filter(pizza=>quantity[pizza.title]>0);

      const grandTotal = CartItems.reduce((sum,pizza)=>{ const price = parseInt(pizza.price.replace('₹', '')) ||0;
  const qty = quantity [pizza.title] || 0;
  return sum+qty*price;
 },0);

useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setemailId(decoded.email);
    } 
  }, [token]);




     useEffect(()=>{
      fetch("http://localhost:8000/menu")
      .then(res=> res.json())
      .then(data => setMenu(data))
      .catch(err => console.log("error loading menu:", err))
     },[]);


     
     useEffect(() => {

      const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    setemailId(decoded.email);
  }

fetchUsersCart(token);


    },[]); 


const handleAddToCart =(title)=>{

  addToCart(title);
  setShowdiv(true);

       
       setTimeout(()=>{
        setShowdiv(false);
       },3000)
}
     



    const fetchUsersCart= (token)=>{
      fetch('http://localhost:8000/cart',{
  method: "GET",
  headers: {

     "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
}).then(res=> res.json())
  .then(data=>{
    const restored={};
    data.forEach((item)=>{restored[item.product_title] = item.quantity});
  
  setQuantity(restored);
  localStorage.setItem("CartList",JSON.stringify(data));
}).catch(err=>{
  console.log(err)
})

      const savedCart = JSON.parse(localStorage.getItem("CartList"));
      if (savedCart && savedCart.length > 0) {
        const restored = {};
        savedCart.forEach(item => {
          restored[item.title] = item.quantity;
        });
        setQuantity(restored);
      }
    }

      
     //const totalQuantity = Object.values(quantity).reduce((sum, qty) => sum + qty, 0);


    const addToCart =async (title) => {
      console.log("addtocart called");
       const token = localStorage.getItem('token');
      if (token) {
      const decoded = jwtDecode(token);
      setemailId(decoded.email);
    } 

    const pizza = menu.find((p) => p.title === title);
    
   if (!pizza || !emailId) return;




       setQuantity(prev => ({
         ...prev,
         [title]: (prev[title] || 0) + 1,
       })

      

       
      );



console.log(123)


      fetch ('http://localhost:8000/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  
    body: JSON.stringify({
     product_title: pizza.title,
      price:   pizza.price,
      quantity: 1,
      productid :pizza.id
    }),
    
  })
  .then(res => res.json())
    .then(data => {
      console.log("Backend Cart Response:", data);
    })
    .catch(err => {
      console.error("Error sending to backend:", err);
    
    });

console.log(pizza.id);
   console.log(token)  
     
    };


    const removeFromCart = (title) => {
    const pizza = menu.find((p) => p.title === title);
    if (!pizza || !emailId) return;

    fetch(`http://localhost:8000/cart/${pizza.id}`, {
     

      method: "DELETE",
      headers: {
         'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
    });
// console.log('Trying to DELETE', `http://localhost:8000/cart/${pizza.id}`);
    setQuantity((prev) => {
      const currentQty = prev[title] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[title];

         localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      }
      return { ...prev, [title]: currentQty - 1 };
    });
  }


  const deleteFromCart = (title)=>{


    const pizza =menu.find((p)=>p.title===title);
    if(!pizza || !emailId) return;



    fetch(`http://localhost:8000/cart/delete/${pizza.id}`, {
     

      method: "DELETE",
      headers: {
         'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
    });


     setQuantity((prev) => {
      
        const updated = { ...prev };
        delete updated[title];
        

         localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      
    })

  }




         return(
             <CartContext.Provider value={{quantity ,menu,addToCart,removeFromCart,cartmessage,fetchUsersCart,handleAddToCart,showdiv,deleteFromCart,CartItems,grandTotal}}> 
                {children}
            </CartContext.Provider>
         );

         
      };


 // eslint-disable-next-line react-refresh/only-export-components
 export const useCart =()=>useContext(CartContext);


