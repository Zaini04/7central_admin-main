import React from 'react'

const PreLoader = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-dark1 bg-opacity-30 flex items-center justify-center  z-[999999]'>
            <div className="loader"></div>
        </div>
    )
}

export default PreLoader