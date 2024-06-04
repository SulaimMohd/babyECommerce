import React from "react";
import loading from '../../Assets/loading.webp'

const Loading = ()=> {
  return(
    <div className="h-screen w-auto flex flex-col justify-center items-center ">
      <img src={loading} alt="Loading" className="rounded-md h-3/4 w-auto" />
      <h1 className="m-2 font-bold text-3xl">Loading...</h1>
    </div>
  )
}

export default Loading;