import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminHeader from './AdminHeader'
const AdimnLayOut = ()=>{
    return(
        <>
            <AdminHeader />
            <Outlet />
        </>
    )
}

export default AdimnLayOut