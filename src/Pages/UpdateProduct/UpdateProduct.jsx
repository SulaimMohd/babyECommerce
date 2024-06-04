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
      <h1 className="text-3xl font-semibold text-center mb-8">Update Product Stock</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            currentStock={product.stock}
            docId ={product.$id}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdateProduct;

