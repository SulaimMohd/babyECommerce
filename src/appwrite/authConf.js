import { Client, Account, ID } from 'appwrite'
import conf from '../Conf/conf.js'


export class AuthService {
  client = new Client()
  account;
  constructor(){
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id)
    this.account = new Account(this.client)
  }
  async createAccount({email, password, name}){
      try{
        const res = await this.account.create(ID.unique(), email, password, name)
        if(res) return await this.login({email, password})
        else return res
      }catch(err){
          throw err
      }
  }
  async login({email, password}){
    try{
      return  await this.account.createEmailPasswordSession(email, password)
    }catch(err){
      throw err
    }
  }
  async logout(){
    try{
        return await this.account.deleteSessions()
    }catch(err){
        throw err
    }
    
  }
  
}


const authService = new AuthService()
export default authService

