import React from "react";
import ThanksGif from '../../Assets/thankYou.webp'

const ThankYou = ()=> {
  return(
    <div className="h-screen w-auto flex flex-col justify-center items-center ">
      <img src={ThanksGif} alt="ThankYou" className="rounded-md h-3/4 w-auto" />
      <h1 className="text-3xl m-2 font-bold">Thank You For Shopping!</h1>
    </div>
  )
}

export default ThankYou;