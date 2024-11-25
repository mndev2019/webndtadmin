//import React from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useEffect } from "react"

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") ?? null;   

   
    useEffect(() => {
        if(token){
            navigate('/banner')
        }else{
            navigate('/login');
        }
    }, [token, navigate]);
    return (
        <>
            {/* <Header />
            <div className="flex min-h-screen">
                <div className={` overflow-x-hidden bg-transparent transition-all duration-300 w-[15%] h-screen`}>
                    <Sidebar />
                </div>
                <div className="w-[85%] ">
                    <main className='p-5 pb-28'>
                        {<Outlet />}
                    </main>
                </div>
            </div>
            <Footer /> */}
            <Header />
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="bg-transparent transition-all duration-300 w-[15%] h-auto flex-shrink-0">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="w-[85%] flex-grow">
                    <main className="p-5 pb-28">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout