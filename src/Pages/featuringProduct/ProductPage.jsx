import React, { useEffect, useInsertionEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dbServices from '../../appwrite/dbConf';
import { ID } from 'appwrite';
import Loading from './Loading';

const ProductPage = () => {
  const { productDocId, user } = useParams()

  const [productData, setProductData] = useState({})
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading , setIsLoading] = useState(true)
  useEffect(()=>{
    dbServices.getProduct({productDocId})
      .then(res =>{
        setProductData(res)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(productDocId)
  console.log(productData)
  const {id,name,imageUrl,price, stock,} = productData;
  let image = imageUrl

  const [quantity, setQuantity] = useState(1);
  let productId = productData.$id
  let userId = user

  const handleAddToCart =  async()=>{
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
if(isLoading){
    return <Loading />
  }else{
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col sm:flex-row justify-center items-center lg:gap-40 py-6 px-4 sm:px-6 lg:px-8">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center  sm:justify-end">
        <img className="w-full max-w-md h-auto rounded-lg" src={image} alt={name} />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-4 sm:mx-0">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <div className="mt-4">
          <p className="text-gray-800 font-semibold">${price}</p>
          <p className="text-gray-600">In stock: {stock}</p>
        </div>
        <div className="flex mt-4">
          <button
            className={`bg-black text-white  rounded-md p-1 pl-2 pr-2 mt-2 hover:bg-white border-2 border-white hover:border-black hover:text-black font-semibold transition duration-200 ease-in-out 
            ${isAdding ? 'opacity-70':'opacity-100'}`}
            onClick={handleAddToCart}
          >
            {isAdding ? 'Adding to cart':'Add to cart'}
          </button>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );}
}

export default ProductPage;
