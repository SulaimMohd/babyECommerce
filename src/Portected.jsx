import React from "react";
import Register from "./Pages/SignUp/SignUp";
import { useSelector } from "react-redux";
import LogIn from "./Pages/LogIn/LogIn";


const Protected = ({children, authentication = true})=>{
    const authStatus = useSelector(state=> state.auth.isAuth)
    return (
        // <h1>Hello world</h1>
        <>
            {authentication ? (authStatus ? children:<LogIn />):(children)}
        </>
        
    )
}

export default Protected