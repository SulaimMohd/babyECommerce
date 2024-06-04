import { Client, Databases, ID, Query } from "appwrite";
import conf from "../Conf/conf.js";

export class Services {
  client = new Client()
  database;

  constructor(){
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id)
    this.database = new Databases(this.client)
  }
  async getProducts(){
    try{  
      return await this.database.listDocuments(conf.dataBase_id, conf.products_collection_id); 
    }catch(err){
      throw err
    }
  }
  async getProduct({productDocId}){
    try{
      return await this.database.getDocument(conf.dataBase_id, conf.products_collection_id, productDocId)
    }catch(err){
      throw err
    }
  }
  async addProduct({name, price, rating, stock, imageUrl}){
    try{
      return await this.database.createDocument(conf.dataBase_id, conf.products_collection_id, ID.unique(),{id:ID.unique(), 
              name, 
              price:parseFloat(price), 
              rating: parseInt(rating), 
              stock: parseInt(stock)}),
              imageUrl
    }catch(err){
      throw err
    }
  }
  async updateProduct({docId, newStock}){
    try{
      return await this.database.updateDocument(conf.dataBase_id, conf.products_collection_id, docId, {stock: newStock})
    }catch(err){
      throw err
    }
  }
  async createOrder({userId}){
    try{
      return await this.database.createDocument(conf.dataBase_id, conf.cart_collection_id,ID.unique(), {
        userId
      })
    }catch(err){
      throw err
    }
  }
  async addProductToCart({id, name, price, quantity, docId, imageUrl}){
    try{
        return await this.database.createDocument(conf.dataBase_id, conf.cartItmes_collection_id, docId, {id, name, price:parseFloat(price), quantity:parseInt(quantity), imageUrl})
    }catch(err){
      throw err
    }
  }
  async getOrderId({userId}){
    try{
      return await this.database.listDocuments(conf.dataBase_id, conf.cart_collection_id, [Query.equal('userId', userId), Query.equal('isPlaced', false)])
    }catch(err){
      console.log(err)
    }
  }
  async updateDocument({docId, ...keys}){
    try{
        return await this.database.updateDocument(conf.dataBase_id, conf.cart_collection_id, docId, {...keys})
    }catch(err){
      throw err
    }
  }
  async getProductFromCart({docId}){
    try{
        return await this.database.getDocument(conf.dataBase_id, conf.cartItmes_collection_id, docId);
    }catch(err){
      console.log(err)
    }
  }
  async updateCartItem({docId, updatedQuantity}){
    try{
      return await this.database.updateDocument(conf.dataBase_id, conf.cartItmes_collection_id, docId, {quantity:parseInt(updatedQuantity)})
    }catch(err){
      console.log(err)
    }
  }
  
}

const dbServices = new Services()
export default dbServices;