import React, { useState } from "react";
import {useAsyncError, useNavigate} from 'react-router-dom'
import authService from "../../appwrite/authConf";
import { logIn } from "../../store/authSlice";
import { useDispatch } from "react-redux";



const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isWrongPasswordOrEmail, setIsWrongPasswordOrEmail] = useState(false)
  const [isTryingToLogIn, setIsTryingToLogIn]= useState(false)
  const [formData, setFormData] = useState({
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
    setIsTryingToLogIn(true)
    // Here you can implement your login logic
    console.log(formData);
    try{
      const userData = await authService.login({...formData})
                                    .then(userData => {
                                            dispatch(logIn(userData))
                                            setIsTryingToLogIn(false)
                                            return userData}
                                    )
      if(userData.userId === '66573f820008cbfb24cd'){
        navigate('/admin/addProduct')
      }
      else{
        navigate(`/auth/${userData.userId}/home`)
      }
      
    }catch(err){ 
      setIsTryingToLogIn(false)
      setFormData({
        email: "",
        password: ""
      })
      setIsWrongPasswordOrEmail(true)
       console.log(err)
    }
    
  };

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log("Sign up clicked");
    navigate('/signup')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log In 
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                placeholder={`${isWrongPasswordOrEmail ? "Enter valid email":"Email addres"}`}
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={`${isWrongPasswordOrEmail ? "Or password":"Passowrd"}`}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
            Don't have an Account ? <span> </span>
              <button
                type="button"
                onClick={handleSignUp}
                className="text-black hover:text-gray-500 font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border-2 border-black text-sm font-medium rounded-md text-white bg-black  hover:bg-white hover:text-black
              hover:border-black hover:font-semibold transition duration-100 ease-in-out"
            >
              {isTryingToLogIn ? 'Checking':'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
