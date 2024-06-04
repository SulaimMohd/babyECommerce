import React, { useState } from "react";
import { ID } from 'appwrite'
import Rating from "../Components/Rating";
import dbServices from "../appwrite/dbConf";
import { NavLink, useParams } from "react-router-dom";
const ProductCard = ({id, name, price, rating, stock, imageUrl, userId, productId})=>{
    const [isAdding, setIsAdding] = useState(false)
    const { user } = useParams()
    const addProductToCart = async()=>{
        try{
            setIsAdding(true)
            let res = await dbServices.getOrderId({userId});
            console.log(productId)
            if(res.documents.length > 0){
                let orderId = res.documents[0].$id
                console.log(orderId)
                let itemsList = [...res.documents[0].itemsList]
                let docIdList = [...res.documents[0].docIdList]
                if(!itemsList.includes(productId)){
                    let docId = ID.unique()
                    
                    console.log(true)
                    let res = await dbServices.updateDocument({docId:orderId, 
                                                               itemsList:[...itemsList, productId], 
                                                               docIdList:[...docIdList, docId]})
                    console.log(res)
                    let createDocumentInCartItems = await dbServices.addProductToCart({
                        id:productId,
                        name,
                        price, 
                        quantity:1,
                        docId,
                        imageUrl
                    })
                    console.log(createDocumentInCartItems)
                    console.log('new item added to the cart')
                }else{
                    console.log("The product is allready in the cart")
                    // let res = await dbServices.incCartItem({productId});
                    // console.log(res)
                    let docId = docIdList[itemsList.indexOf(productId)]
                    console.log(docId)
                    try{
                        let res = await dbServices.getProductFromCart({docId});
                        let currentQuantity = res.quantity
                        let updatedQuantity = currentQuantity+1
                        let updatedRes = await dbServices.updateCartItem({docId, updatedQuantity});
                        console.log(updatedRes)
                    }catch(err){
                        console.log(err)
                    }
                }
            }else{
                let res = await dbServices.createOrder({userId});
                console.log(res)
                let orderId = res.$id
                console.log(orderId)
                let itemsList = [...res.itemsList]
                let docIdList = [...res.docIdList]
                let docId = ID.unique()    
                console.log(true)
                let res2 = await dbServices.updateDocument({docId:orderId, 
                                                            itemsList:[...itemsList, productId], 
                                                            docIdList:[...docIdList, docId]})
                console.log(res2)
                let createDocumentInCartItems = await dbServices.addProductToCart({
                    id:productId,
                    name,
                    price, 
                    quantity:1,
                    docId
                })
                console.log(createDocumentInCartItems)
                console.log('new item added to the cart')
            }
            setIsAdding(false)
        }catch(err){
            console.log(err)
        }
    }
    return (
            <div className="flex w-full justify-center">
                <div className="max-w-xs rounded-md overflow-hidden shadow-lg">
                    <NavLink to={`/auth/${user}/${productId}`}>
                        <img src={imageUrl} alt="productPicture" className="w-72 h-60 object-cover rounded-t-md" />
                    </NavLink>
                    <div className="p-4">
                        <NavLink to={`/auth/${user}/${productId}`}>
                            <h1 className="text-lg font-semibold">{name}</h1>
                            <h2 className="text-gray-800 font-medium mt-2">${price}</h2>
                            <Rating rtaing={rating}/>
                        </NavLink>
                        
                        <button 
                            className={`bg-black text-white  rounded-md p-1 pl-2 pr-2 mt-2 hover:bg-white border-2 border-white hover:border-black hover:text-black font-semibold transition duration-200 ease-in-out 
                            ${isAdding ? 'opacity-70':'opacity-100'}`}
                            onClick={()=> addProductToCart()}
                            disabled={isAdding}
                            >{isAdding ? 'Adding to cart':'Add to cart'}</button>
                    </div>
                </div>
            </div>
        
        
      );
}

export default ProductCard;