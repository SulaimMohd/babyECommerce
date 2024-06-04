import React from "react";
import cartEmpty from '../Assets/cartEmpty.webp'

const CartEmpty = ()=> {
  return(
    <div className="h-screen w-auto flex flex-col justify-center items-center ">
      <img src={cartEmpty} alt="CartEmpty" className="rounded-md h-3/4 w-auto" />
      <h1 className="m-2 font-bold text-3xl">Cart is Empty!</h1>
    </div>
  )
}

export default CartEmpty;