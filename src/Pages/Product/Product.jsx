import React, {useEffect, useState} from "react";
import ProductCard from "../../Components/ProductCard";
import dbServices from "../../appwrite/dbConf";
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../../Components/Loading'
import { Flag } from "appwrite";
const Product = ()=>{
    const [products, setProducts] = useState([])
    const { user } = useParams()
    const [loading, setLoading] = useState(true) 
    useEffect(()=>{
        setLoading(true)
        dbServices.getProducts().then(res => {
            setProducts(res.documents)
            setLoading(false)
        }).catch(err=> console.log(err))

      },[])
    if(loading){
        return <Loading />
    }
    else{
    return (
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => 
                                (<ProductCard 
                                key={product.id} {...product}
                                userId={user}
                                productId={product.$id}
                                />))}
          </div>
          
        </div>
      );}
}

export default Product;