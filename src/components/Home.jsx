import React from 'react'

//import { FaBold } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import     Imageslider  from './Imageslider';



function Home() {

    const navigate =useNavigate();

    const FoodItems =  [
      { title: "Fries", img: "https://img.freepik.com/premium-vector/meal-fast-food_1308-13808.jpg?...", path :"" },
      { title: "Indian Cuisine", img: "https://img.freepik.com/premium-vector/tray-food-with-tortilla-other-food-it_1120554-13957.jpg?..." ,path :"" },
      { title: "Rolls", img: "https://img.freepik.com/premium-vector/chicken-gyros-with-great-detail_978445-507.jpg?...",path :"" },
      { title: "Cakes", img: "https://img.freepik.com/premium-vector/cartoon-birthday-cake_119631-516.jpg?...",path :"" },
      { title: "Pizza", img: "https://img.freepik.com/premium-vector/fresh-sausage-pizza-isolated-white-background-top-view_307665-209.jpg?..." ,path :"/pizza"},
      { title: "Paani-Puri", img: "https://img.freepik.com/premium-vector/simple-illustration-logo-delicious-pani-puri-fuchka-fuchka-golgappa_499212-2026.jpg?..." ,path :""},
      { title: "Sweets", img: "https://img.freepik.com/free-vector/drawn-indian-sweets-collection_52683-52359.jpg?..." ,path :""},
      { title: "Noodles", img: "https://www.shutterstock.com/image-vector/chinese-chow-mein-noodles-recipe-600w-2159419763.jpg",path :"" },
      { title: "Momos", img: "https://img.freepik.com/premium-vector/momo-food-vector_1306769-1183.jpg?..." ,path :""},
      { title: "Drinks", img: "https://img.freepik.com/free-vector/cocktails-set_1284-21990.jpg?...",path :"" },
      { title: "Tea/Coffee", img: "https://img.freepik.com/premium-vector/graphic-icon-cup-hot-coffee_763713-5747.jpg?..." ,path :""},
      { title: "Sandwich", img: "https://img.freepik.com/free-vector/salami-sandwich-ingredients_98292-3568.jpg?...",path :"" },
      { title: "Snacks", img: "https://img.freepik.com/free-vector/hand-drawn-macaroon-drawing-illustration_23-2150625987.jpg?...",path :"" },
      { title: "Chocolates", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPIbiOWi_mOI-LfiLHxiI2YfoQoKzEM5W36A&s",path :"" },
      { title: "Salad", img: "https://img.freepik.com/premium-vector/delicious-fresh-vegetable-salad_24640-18388.jpg?ga=GA1.1.294946365.1733126253&semt=ais_hybrid&w=740",path :"" },
      { title: "Water", img: "https://img.freepik.com/premium-vector/drink-clean-water-people-holding-bottle-glass-potable-reusable-plastic-bottles-healthy-drinks-with-fruits-berries-shakes-liquids-decent-vector-set_53562-20450.jpg?ga=GA1.1.294946365.1733126253&semt=ais_hybrid&w=740",path :"" },
    ];

    

  return (
    <div>

      <Imageslider/>
<div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-5'>
  {
    FoodItems.map((item,index)=>(
      <a href='' key={index} className='flex flex-col items-center group'
      onClick={()=>navigate(item.path)}>
        <img 
        src={item.img}
        alt={item.title}
        className='h-40 w-40 object-cover rounded-lg hover:scale-105  transition-transform duration-300'/>
        <h1 className='text=xl font-bold text-gray-800 mt-3 group-hover:underline'>{item.title}</h1>
      </a>
    ))
  }

</div>



<div className="text-center mt-10 relative">
  {/* Background Image (if you'd like it as a background) */}
  <img
    src="https://img.freepik.com/free-photo/top-view-variety-fast-food-assorted-tasty-dishes-background_23-2148650310.jpg"
    alt="Food"
    className="absolute inset-0 w-full h-full object-cover opacity-40 z-[-1]"
  />

  <div className="relative z-10">
    <h1 className="text-5xl font-bold text-gray-800 animate-fade-in-up mb-6 leading-tight transition-all duration-500 transform hover:scale-105 hover:text-orange-500">
      Better food for <br /> more people
    </h1>
    <h5 className="text-lg text-gray-600 animate-fade-in-up delay-200 mb-6 opacity-90 transition-all duration-500 hover:opacity-100">
      For over a decade, we've enabled our <br />
      customers to discover new tastes, <br />
      delivered right to their doorstep.
    </h5>
    <button className="mt-6 px-8 py-3 rounded-full bg-orange-600 text-white text-lg font-semibold hover:bg-orange-700 transition-all duration-300"
    onClick={()=>navigate('/login')}>
      Order Now
    </button>
  </div>
</div>




<div className="mt-5">
  <div className="footer-col flex items-center justify-center space-x-6 text-center">
    <img
      src="https://img.freepik.com/free-vector/smartphone-scanning-qr-code_23-2148624200.jpg?ga=GA1.1.294946365.1733126253&w=740"
      className="h-80 w-auto"
      alt="QR Code"
    />
    <div className="flex flex-col items-start">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">
        Scan the QR and get the app now
        <br />
        Hurry up!
      </h1>
      <a
        href="#"
        className="mt-4 text-blue-500 hover:text-blue-700 font-medium text-lg"
      >
        Link to download the app from Playstore
      </a>
    </div>
  </div>
</div>


    </div>
  )
}


export default Home