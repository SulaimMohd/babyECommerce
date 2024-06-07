import React, { useState } from 'react';
import dbServices from '../appwrite/dbConf';

const Product = ({ name, stock, price, rating, imageUrl, docId }) => {
  // const [addedStock, setAddedStock] = useState('');

  

  // return (
  //   <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md">
  //     <h2 className="text-xl font-semibold mb-4">{name}</h2>
  //     <p className="mb-4">Current Stock: {stock}</p>
  //     <div className="flex items-center mb-4">
  //       <input
  //         type="number"
  //         placeholder="Enter new stock"
  //         value={addedStock}
  //         onChange={(e) => setAddedStock(e.target.value)}
  //         className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
  //       />
  //       <button
  //         onClick={handleUpdateStock}
  //         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
  //       >
  //         Update Stock
  //       </button>
  //     </div>
  //   </div>
  // );
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [newStock, setNewStock] = useState(stock);
  const [newPrice, setNewPrice] = useState(price);
  const [newRating, setNewRating] = useState(rating);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const handleUpdateStock = async() => {
    // You can add validation here before updating the stock
    console.log(docId)
    let res = await dbServices.updateProduct({docId, updateData:{imageUrl: newImageUrl, stock: parseInt(newStock), price: parseFloat(newPrice), rating: parseInt(newRating) }})
    console.log(res)  
  };
    handleUpdateStock()
    // Update product information in the backend
    // You can make an API call here to update the product
    console.log('Product updated:', { imageUrl: newImageUrl, stock: newStock, price: newPrice, rating: newRating });
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newImageUrl" className="block text-gray-700 font-semibold mb-2">Current Image URL:</label>
          <input
            type="text"
            id="newImageUrl"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newStock" className="block text-gray-700 font-semibold mb-2">Current Stock:</label>
          <input
            type="number"
            id="newStock"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPrice" className="block text-gray-700 font-semibold mb-2">Current Price:</label>
          <input
            type="number"
            id="newPrice"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newRating" className="block text-gray-700 font-semibold mb-2">Current Rating:</label>
          <input
            type="number"
            id="newRating"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
      </form>
    </div>
  );
};

export default Product;