import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import dbServices from "../appwrite/dbConf";
import { useNavigate } from "react-router-dom";

const Summery = ({allitems, state, setState})=>{
    const navigate = useNavigate()
    const { user } = useParams()
    const [code, setCode] = useState('')
    const [discount20, setDiscoutn20] = useState(false)
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const checkOut = async()=>{
      try{
          setIsCheckingOut(true)
          const res = await dbServices.getOrderId({userId: user})
          const docId = res.documents[0].$id
          const res2 = await dbServices.updateDocument({docId, isPlaced:true})
          navigate(`/auth/${user}/ThanksPage`)

      }catch(err){
        console.log(err)
      }
    }

     let itemsTotal= allitems.reduce((total, item)=>{
        total += (item.price* item.quantity )
        return total
      },0)
    
    const estimatedTotal = (itemsTotal -(discount20 ? itemsTotal*0.2: itemsTotal*0.1)+(itemsTotal*0.05)+(itemsTotal > 25 ? 0:8)).toFixed(2)
    return (
        <div className="flex flex-col bg-white w-full mt-2 ml-3 pl-3 pr-3">
          <div className="flex flex-col">
            <label htmlFor="promoCode" className="ml-1 mb-1 font-medium">Enter promo code</label>
            <div className="flex items-center">
              <input 
                type="text"  
                className="flex-grow p-1 pl-2 rounded-l-md border-2 border-r-white border-gray-300 focus:border-black focus:outline-none focus:shadow-inner transition duration-300"
                placeholder={discount20 ? 'Code applyed':'Code'}
                value={code}
                onChange={(e)=> setCode(e.target.value)}
                disabled={discount20}
              />
              <button 
                className={` font-semibold pl-4 pr-4 h-9 border border-black rounded-r-md  ${discount20 ? 'opacity-50 bg-white text-black hover:bg-white hover:text-black z-0':'bg-black text-white hover:bg-white hover:text-black'} active:bg-gray-200 transition duration-100 ease-in-out`}
                onClick={()=> {
                              code === 'disc' ? setDiscoutn20(true):setDiscoutn20(false)
                              setCode('')
                            }}
                disabled={discount20}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-7 mt-7">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between pr-1">
                <h4 className="italic">Shipping cost</h4>
                <h2 className="font-semibold">${itemsTotal >25 ? (0).toFixed(2):(8).toFixed(2)}</h2>
              </div>
              <div className="flex justify-between pr-1">
                <h4 className="italic">Discount</h4>
                <h2 className="font-semibold">${discount20 ?  (itemsTotal * .20).toFixed(2):(itemsTotal * 0.10).toFixed(2)}</h2>
              </div>
              <div className="flex justify-between pr-1">
                <h4 className="italic">Tax</h4>
                <h2 className="font-semibold">${(itemsTotal*0.05).toFixed(2)}</h2>
              </div>
              <div className="flex justify-between pr-1">
                <h4 className="italic">Products Cost</h4>
                <h2 className="font-semibold">${itemsTotal.toFixed(2)}</h2>
              </div>
            </div>
            <div className="flex justify-between border-t-2 pt-2">
              <h1 className="font-bold text-xl">Estimated Total</h1>
              <h1 className="font-bold text-xl">${estimatedTotal}</h1>
            </div>
          </div>
          <div className="flex justify-center mb-8 md:mb-40 mt-12">
            <button 
              className="bg-white border-2 border-black p-2 pr-8 pl-8 rounded-md text-black font-bold hover:bg-black active:opacity-80 hover:text-white hover:border-1 transition duration-100 ease-in-out hover:font-semibold hover:shadow-md"
              onClick={()=> checkOut()}
            >
              {isCheckingOut ? 'Checking Out': 'Check Out'}
            </button>
          </div>
        </div>
      );
}

export default Summery;