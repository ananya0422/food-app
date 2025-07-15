import React, { useState } from "react";
import loadRazorpayScript from "./loadRazorpay.js";
import {  useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const RazorpayButton = ({phone_number}) => {

    const navigate = useNavigate() ;
    const {grandTotal} = useCart();
    
const[name,setName]=useState('');

const[email,setemail] = useState('');



     const token = JSON.parse(localStorage.getItem('user'))?.accessToken;


useEffect(()=>{

     if(token){
           const decoded = jwtDecode(token);
          // console.log(decoded);
           const username =decoded.name;
            setName(username);

          const  useremail =decoded.email; 
            setemail(useremail);
         }
        
        },[token])

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Call your backend API to create the Razorpay order
    const response = await fetch("http://localhost:8000/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        amount:grandTotal*100,

        email:email,

        name:name,

        contact:phone_number,

      })

      
    });

    const order = await response.json();

    const options = {
      key: "rzp_test_3YfSa4Atxwia5O", // Replace with your Test Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Food App",
      description: "Test transaction",
      order_id: order.id,
      handler: function () {
        alert("Payment successful!");
        // alert("Payment ID: " + response.razorpay_payment_id);
         navigate("/payment-success");
        // You can send this response to your backend to verify and store
      },
      prefill: {
        name: name,
        email: email,
        contact: phone_number,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Proceed To Payment
    </button>
  );
};

export default RazorpayButton;
