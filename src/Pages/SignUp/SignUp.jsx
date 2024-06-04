import React, { useState, useReducer } from "react";
import authService from "../../appwrite/authConf";
import { logIn } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = ()=>{
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: ""
        });
      
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
        };
      
        const handleSubmit = async(e) => {
          e.preventDefault();
          // Here you can implement your sign-up logic
          console.log(formData);
          try{
              const userData = await authService.createAccount({...formData}).then(userData=>{
                      dispatch(logIn(userData))
                      return userData;
                    })
              navigate(`/auth/${userData.userId}/home`)
          }catch(err){
            console.log(err)
          }
        };
      
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign up!
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
      
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border-2 border-white text-sm font-medium rounded-md text-white bg-black  hover:bg-white hover:text-black
                    hover:border-black hover:font-semibold transition duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      };


export default Register


// import { usersSetContext } from "../../App";
// import { signUp } from "../../store/authSlice";
// import { useDispatch } from 'react-redux'

// const initSate = {
//       fName:'',
//       lName:'',
//       email:'',
//       addres:'',
//       pin: 0,
//       city:'',
//       passWord: '',
//     }
// const reducer = (state, action)=>{
//     switch(action.type){
//         case 'UPDATE_FNAME': return {...state, fName:action.payLoad};
//         case 'UPDATE_LNAME': return {...state, lName:action.payLoad};
//         case 'UPDATE_EMAIL': return {...state, email:action.payLoad};
//         case 'UPDATE_ADDRE': return {...state, addres:action.payLoad};
//         case 'UPDATE_PINCO': return {...state, pin:parseInt(action.payLoad)};
//         case 'UPDATE_CITY' : return {...state, city:action.payLoad};
//         case 'UPDATE_PASSW': return {...state, passWord:action.payLoad};
//         case 'RESET' :return ({
//             fName:'',
//             lName:'',
//             email:'',
//             addres:'',
//             pin: 0,
//             city:'',
//             passWord: '',
//           })
//         default: return state;
//     }
// }

// const Register = ()=>{
//     // const {state: users, dispatch: addUser} = useContext(usersSetContext);
//     // console.log(users)
//     const dispatch = useDispatch()
//     const [state, localDispatch] = useReducer(reducer, initSate);
    
//     return (
//         <>
//             <div className="flex items-center bg-pink-500 pl-4  h-screen">
//                 <div className="flex flex-col max-w-fit p-4 gap-3 bg-white rounded-md">
//                     <div className="mb-3">
//                         <label className=" ml-1 underline font-bold text-fuchsia-500  text-xl">SingUp!</label>
//                     </div>
//                     <div className="flex gap-2">
//                         <div className="flex flex-col gap-1 ">
//                             <label htmlFor="fName" className="ml-1">First Name</label>
//                             <input 
//                                 id="fName"
//                                 className=" border-2 pl-2 p-1 rounded-md bg--100slate  border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                           
//                                 type="text"  
//                                 value={state.fName} 
//                                 onChange={(e)=> localDispatch({type:'UPDATE_FNAME', payLoad:e.target.value})} />
//                         </div>
//                         <div className="flex flex-col gap-1 ">
//                             <label htmlFor="lName" className="ml-1">Last Name</label>
//                             <input 
//                                 id="lName"
//                                 className=" border-2 pl-2 p-1 rounded-md bg--100slate border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                            
//                                 type="text"  
//                                 value={state.lName} 
//                                 onChange={(e)=> localDispatch({type:'UPDATE_LNAME', payLoad:e.target.value})} />
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-1 ">
//                         <label htmlFor="email" className="ml-1">E-mail</label>
//                         <input 
//                             id="email"
//                             className=" border-2 pl-2 p-1 rounded-md   bg--100slate border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                        
//                             type="email"  
//                             value={state.email} 
//                             onChange={(e)=> localDispatch({type:'UPDATE_EMAIL', payLoad:e.target.value})} />
//                     </div>
//                     <div className="flex flex-col gap-1 ">
//                         <label htmlFor="address" className="ml-1">Addres</label>
//                         <input 
//                             id="address"
//                             className=" border-2 pl-2 p-1  rounded-md   bg--100slate border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                        
//                             type="text"  
//                             value={state.addres} 
//                             onChange={(e)=> localDispatch({type:'UPDATE_ADDRE', payLoad:e.target.value})} />
//                     </div>
//                     <div className="flex gap-2">
//                         <div className="flex flex-col gap-1 ">
//                             <label htmlFor="pin" className="ml-1">PIN</label>
//                             <input 
//                                 id="pin"
//                                 className=" border-2 pl-2 p-1  rounded-md   bg--100slate border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                            
//                                 type="number"  
//                                 value={state.pin} 
//                                 onChange={(e)=> localDispatch({type:'UPDATE_PINCO', payLoad:e.target.value})} />
//                         </div>
//                         <div className="flex flex-col gap-1 ">
//                             <label htmlFor="city" className="ml-1">City</label>
//                             <input 
//                                 id="city"
//                                 className=" border-2 pl-2 p-1 w-48 rounded-md   bg--100slate border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                            
//                                 type="text"  
//                                 value={state.city} 
//                                 onChange={(e)=> localDispatch({type:'UPDATE_CITY', payLoad:e.target.value})} />
//                         </div>

//                     </div>
                    
//                     <div className="flex flex-col gap-1 ">
//                         <label htmlFor="password" className="ml-1">Password</label>
//                         <input 
//                             id="password"
//                             className=" border-2 pl-2 p-1  rounded-md   bg--100slate border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
                        
//                             type="password"  
//                             value={state.passWord} 
//                             onChange={(e)=> localDispatch({type:'UPDATE_PASSW', payLoad:e.target.value})} />
//                     </div>
//                     <div className="flex  gap-1 justify-center mt-4">
//                         <button 
//                             className="  max-w-fit p-2 pr-4 pl-4 rounded-lg bg-fuchsia-600 text-white font-bold hover:bg-white hover:text-fuchsia-600 active:bg-fuchsia-600 active:text-white active:border-white shadow-sm hover:shadow-md active:shadow-lg border-2 border-white hover:border-fuchsia-600 transition duration-75  ease-in-out mb-5"
//                             onClick={()=> {
//                                         // addUser({type:'ADD_USER', payLoad:{id:1, ...state}})
//                                         // console.log(state)
//                                         dispatch(signUp({ email:state.email, passowrd:state.passWord, name:state.fName}))
//                                         localDispatch({type:'RESET', payLoad:{}})
//                                     }}>SingUp</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Register;



