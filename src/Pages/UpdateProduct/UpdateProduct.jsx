import React, { useState,useEffect } from 'react';
import Product from '../../Components/Product';
import dbServices from '../../appwrite/dbConf';
const UpdateProduct = () => {
  const [products, setProudcts] = useState([])
  useEffect(() => {
    dbServices.getProducts()
      .then(res => {
        console.log(res)
        setProudcts(res.documents)
        })
      .catch(err => console.log(err))
  }, [])


  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product
            key={product.id}
            {...product}
            docId ={product.$id}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdateProduct;

