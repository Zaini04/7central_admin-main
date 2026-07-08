import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'
import { useSelector } from 'react-redux'


const MainLayout = () => {
    const { showSidebar } = useSelector(state => state.app)


    return (
        <div className='relative w-full'>
            {/* Sidebar */}
            <div>
                <Sidebar />
            </div>
            {/* Sidebar Overlay */}
            {
                showSidebar && <div className='fixed top-0 left-0 w-full h-screen bg-[#000] bg-opacity-20  z-40'/>
            }
         
            {/* Main Content Area */}
            <div className={`md:pl-[220px] duration-300 ease-in-out `}>
                <Header />
                <div 
                className='sm:p-6 p-4'
                style={{ minHeight : 'calc(100vh - 65px)' , height : '100%'}}
                >
                    <Outlet />
                </div>
            </div>

           
        </div>
    )
}

export default MainLayout
