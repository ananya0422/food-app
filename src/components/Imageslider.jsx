import React, { useEffect, useState } from 'react'



const images=[
    'https://content.jdmagicbox.com/quickquotes/images_main/strawberry-layered-cake-801504217-ekcxnrno.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit',
    'https://static.vecteezy.com/system/resources/thumbnails/035/455/373/small/ai-generated-a-pizza-being-sliced-with-a-sharp-cutter-emphasizing-the-crispy-texture-of-the-crust-free-photo.jpg',
    'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?cs=srgb&dl=pexels-marvin-ozz-1297854-2474661.jpg&fm=jpg',
    'https://i0.wp.com/nicolesy.com/wp-content/uploads/2010/06/IceCream_2310.jpg?fit=2500%2C1667&ssl=1',
    'https://img.freepik.com/premium-photo/dark-homemade-chocolate-with-raspberry-filling_255440-2620.jpg',

];


 const Imageslider = () => {

    const [current,setCurrent] =useState(0);

    const nextSlide=()=>{
        setCurrent((prev)=> (prev + 1)%images.length)
    }

     const prevSlide=()=>{
        setCurrent((prev)=> (prev -  1+images.length)%images.length)
    }

    useEffect(()=>{
        const timer = setInterval(()=>{
            nextSlide();
        },3000);
        return ()=> clearInterval(timer);
    },[])

  return (
    <div>
<div className="flex justify-center items-center mt-6">
  <div className="relative w-full max-w-xl h-86 overflow-hidden rounded-lg shadow-md">
    {images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`Slide ${idx + 1}`}
        className={`w-full h-86 object-cover transition-opacity duration-1000 ${
          idx === current ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
        }`}
      />
    ))}

    {/* Prev Button */}
    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full z-10"
    >
      ❮
    </button>

    {/* Next Button */}
    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full z-10"
    >
      ❯
    </button>
  </div>
</div>

    </div>
  )
}

export default Imageslider
