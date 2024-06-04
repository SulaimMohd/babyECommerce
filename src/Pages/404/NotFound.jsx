import React from "react";
import NotFoundGif from '../../Assets/404.webp'

const NotFoundPage = ()=> {
  return(
    <div className="h-screen w-auto flex flex-col justify-center items-center ">
      <img src={NotFoundGif} alt="NotFoundPage" className="rounded-md h-3/4 w-auto" />
      <h1 className="m-2 font-bold text-3xl">Not found 404 page</h1>
    </div>
  )
}

export default NotFoundPage;