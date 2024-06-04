import React, { useRef, useState } from "react";
import babyImge from '../../Assets/babyImage.jpeg'
import { useSelector,shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const Home = ()=>{
    const navigage = useNavigate()
    const {user} = useParams()
    return (
        <div className="bg-gray-100">
          {/* Hero Section */}
          <section className= "text-black py-12 px-4 h-screen flex items-center justify-center">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-7">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <img src={babyImge} alt="Cuddle Cubs Logo" className="w-auto h-3/4 mx-auto lg:mx-0 rounded-lg" />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-4">Welcome to Cuddle Cubs</h1>
                <p className="text-lg">Discover the best products for your little one!</p>
                <button className="bg-white text-black border-2 border-black font-bold py-2 px-4 mt-4 rounded hover:bg-black hover:text-white hover:border-white"
                        onClick={()=> navigage(`/auth/${user}/products`)}>Shop Now</button>
              </div>
            </div>
          </section>
        </div>
      );
    
}

export default Home