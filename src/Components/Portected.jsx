// import React from "react";
// import Register from "./Pages/SignUp/SignUp";
// import { useSelector } from "react-redux";
// import LogIn from "./Pages/LogIn/LogIn";


// const Protected = ({children, authentication = true})=>{
//     const authStatus = useSelector(state=> state.auth.isAuth)
//     return (
//         // <h1>Hello world</h1>
//         <>
//             {authentication ? (authStatus ? children:<LogIn />):(children)}
//         </>
        
//     )
// }

// export default Protected

import React from "react";
import { useSelector } from "react-redux";
import LogIn from "../Pages/LogIn/LogIn";
import Home from "../Pages/Home/Home";
import Header from "./Header";


const Protected = ({children, authentication = true})=>{
    const authStatus = useSelector(state=> state.auth.isAuth)

    if(!authentication){
      if(authStatus){
        console.log('okay')
       return <>
                    <Header />
                    <Home />
             </>
      }else{
        return children
      }
    }else if(authentication){
      if(authStatus){
        return children
      }else{
        return <LogIn />
      }
    }
}

export default Protected