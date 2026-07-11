import NotFoundSvg from 'assets/svgs/NotFoundSvg'; 
import React, { memo } from 'react';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { IoIosRefresh } from "react-icons/io";
import { IoReturnDownBackOutline } from "react-icons/io5";


const InfoIcon = ({ size }) => (
    <div 
        style={{ width: size, height: size }} 
        className="bg-gray-400 rounded-full flex items-center justify-center"
    >
        <span className="text-white text-3xl font-bold">i</span>
    </div>
);




const ItemNotFound = ({ 
    message = 'No data found', 
    description = "Looks like there's nothing to display here." 
}) => {
    const { width } = useWindowSize();
    const navigate = useNavigate(); 

    const handleGoBack = () => {
        navigate(-1); 
    };

    const handleReload = () => {
        window.location.reload();
    };

    const iconSize = width > 600 ? 80 : 60; 

    return (
        <div className="w-full h-auto py-10 bg-white rounded-xl flex items-center flex-col gap-4 justify-center text-center">
            
         
            <InfoIcon size={iconSize} /> 

         
            <span className='text-2xl font-semibold text-gray-700 mt-2'>
                {message}
            </span>

            <p className='text-gray-500 text-base mb-4'>
                {description}
            </p>

            <div className="flex gap-4">
     
                <button
                    onClick={handleGoBack}
      
                    className="px-6 py-2 text-base font-medium bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition-colors flex gap-1 items-center"
                >
                 <IoReturnDownBackOutline className=' text-xl'/>
                    Go Back
                </button>

                <button
                    onClick={handleReload}
           
                    className="px-6 py-2 text-base font-medium bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-colors flex gap-1 items-center"
                >
       <IoIosRefresh/>

                    Refresh
                </button>
            </div>
        </div>
    );
};

export default memo(ItemNotFound);