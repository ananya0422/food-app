import React from 'react'


export const Footer = () => {
  return (
    
        <footer className='bg-gray-800 text-white py-10 mt-10'>
<div className='max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>

     <div className="flex items-start gap-3">
                <img
                  src="https://img.freepik.com/free-vector/food-delivery-illustration-with-bike-man-courier_1308-51210.jpg?ga=GA1.1.294946365.1733126253&semt=ais_hybrid&w=740"
                  className="h-14 w-14 rounded-full object-cover"
                  alt="logo"
                />
              <div>
              <h3 className="text-lg font-bold">FoodExpress</h3>
              <p className="text-sm mt-1">Fast and fresh food at your doorstep.</p>
              </div>
    </div>

              
<div>
              
                <h3 className="text-lg font-bold mb-2"> Quick Links</h3>
                <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Menu</a></li>
            <li><a href="#" className="hover:underline">Cart</a></li>
            <li><a to="/cart" className="hover:underline">Contact Us</a></li>
                </ul>
 </div>     




<div>
    <h3 className="text-lg font-bold mb-2">Support</h3>
    <ul className="space-y-1 text-sm">
    <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li> 
    </ul>
</div>

<div>
    <h3  className="text-lg font-bold mb-2">Contact</h3>
    <p className="text-sm">📧 support@foodexpress.com</p>
          <p className="text-sm">📞 +91 9867543209</p>
          <p className="text-sm">📍 Indore, India</p>
</div>       
                </div>

              
                <div className='text-center mt-8 text-gray-400 text-sm'>
                &copy; 2025 FoodExpress. All rights reserved.
                </div>
        </footer>
    
  )
}
