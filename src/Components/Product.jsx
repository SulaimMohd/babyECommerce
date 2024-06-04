import React, { useState } from 'react';
import dbServices from '../appwrite/dbConf';

const Product = ({ name ='Product name', currentStock, docId }) => {
  const [addedStock, setAddedStock] = useState('');

  const handleUpdateStock = async() => {
    // You can add validation here before updating the stock
    console.log(docId)
    let newStock = parseInt(addedStock) + currentStock
    console.log(newStock)
    let res = await dbServices.updateProduct({docId, newStock})
    console.log(res)  
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <p className="mb-4">Current Stock: {currentStock}</p>
      <div className="flex items-center mb-4">
        <input
          type="number"
          placeholder="Enter new stock"
          value={addedStock}
          onChange={(e) => setAddedStock(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleUpdateStock}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Update Stock
        </button>
      </div>
    </div>
  );
};

export default Product;