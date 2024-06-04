import React, { useEffect, useState } from "react";

import dbServices from "../appwrite/dbConf";

const Item = ({name, price, quantity, $id, imageUrl, setState})=>{
    const [qnt, setQnt] = useState(quantity)
    const incOne = async()=>{
      console.log('incOne')
      try{  
          setQnt(preState => preState +1)
          const res = await dbServices.getProductFromCart({docId:$id})
          console.log(res.quantity)
          
          const updatedQuantity = res.quantity+1
          
          const res2 = await dbServices.updateCartItem({docId:$id, updatedQuantity})

          console.log('Thisis the res 2',res2)
          setState()
          
          
          // window.location.reload();
      }catch(err){
        console.log(err)
      }
    }
    
    const decOne = async()=>{
      console.log('incOne')
      try{  
        
          const res = await dbServices.getProductFromCart({docId:$id})
          console.log(res.quantity)
          
          const updatedQuantity =  res.quantity-1 > 1 ? res.quantity -1: 1;
          
          const res2 = res.quantity !== 1 ? await dbServices.updateCartItem({docId:$id, updatedQuantity}):1;

          console.log('Thisis the res 2',res2)
          setState()
          setQnt(preState => preState-1> 1 ? preState -1:1)
          // window.location.reload();
      }catch(err){
        console.log(err)
      }
    }

    return (
        <div className="border-t-2 border-gray-200 p-4 flex flex-col sm:flex-row items-center gap-3 mt-1">
          <img src={imageUrl} className="h-52 w-40 object-cover rounded-md" alt="Product" />
          <div className="flex flex-col flex-grow sm:flex-row justify-between items-start w-full">
            <div className="flex flex-col">
              <h1 className="font-semibold text-xl mb-1 max-w-14">{name}</h1>
              <h3 className="font-medium">In Stock</h3>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-xl mb-1">Each</h1>
              <h2 className="font-medium">${price}</h2>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-xl mb-1">Quantity</h1>
              <div className="flex items-center gap-3 mt-1">
                <button className="flex p-1 bg-gray-400 w-5 h-6 rounded-full items-center font-extrabold text-xl cursor-pointer hover:bg-gray-500 active:opacity-75 justify-center"
                        onClick={()=> decOne()}
                >
                  <span className="w-2 h-1 bg-white"></span>
                </button>
                <label className="font-bold">{qnt}</label>
                <button className="flex bg-gray-400 w-5 h-6 justify-center p-0 pb-1 rounded-full items-center font-extrabold text-xl cursor-pointer hover:bg-gray-500 active:opacity-75 text-white"
                  onClick={()=> incOne()}
                >+</button>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-xl mb-1">Total</h1>
              <h2 className="font-medium">${(qnt * price).toFixed(2)}</h2>
            </div>
          </div>
        </div>
      );
}

export default Item;