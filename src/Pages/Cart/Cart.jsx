import React, { useEffect, useState } from "react";
import Item from "../../Components/Item";
import Summery from "../../Components/Summery";
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import dbServices from "../../appwrite/dbConf";
import CartEmpty from "../../Components/CartEmpty";
import Loading from '../../Components/Loading';
const Cart = ()=>{
    
    const [reFetchTheCart, setResetTheFetchCart] = useState(true)
    const { user } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [cartItems, setCartItems]= useState([])
    const [isCartEmpty, setIsCartEmpty] = useState(false)
    useEffect(()=>{
      dbServices.getOrderId({userId:user})
      .then(async(res)=> {
                if(res.documents.length > 0){
                  let itemDocIdList = [...res.documents[0].docIdList]
                  let cartItems = []
                  try{
                      for(let i=0; i < itemDocIdList.length; i++){
                        let item = await dbServices.getProductFromCart({docId:itemDocIdList[i]})
                        cartItems.push(item)
                      }
                      if(cartItems.length > 0){
                        setCartItems(cartItems)
                        setIsLoading(false)
                      }else{
                        setIsCartEmpty(true)
                    }}catch(err){
                        console.log(err)
                    }
                }else{
                  setIsCartEmpty(true)
                }
                
            })
      .catch(err => console.log(err))
    }, [reFetchTheCart])

    if(isCartEmpty){
      return (
        <CartEmpty />
      );
    }else{
      if(isLoading){
          return <Loading />
      }else{
      return(
        <div className="h-screen">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-2/3">
              {!isLoading ? (
                    cartItems.map(item=>{
                         return <Item key={item.id} {...item} setState = {()=> setResetTheFetchCart(preState => !preState)}/>
                })
              ):null}   
            </div>
            {!isLoading ? (<div className="flex w-full md:w-1/3">
              <Summery allitems={[...cartItems]} state={reFetchTheCart} setState={()=> setResetTheFetchCart(preState=> !preState)}/>
            </div>):(null)}
            
          </div>
        </div>
      )}
    } 
        
    
}

export default Cart