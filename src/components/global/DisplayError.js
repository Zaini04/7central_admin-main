import ErrorSvg from 'assets/svgs/ErrorSvg'
import React, { memo } from 'react'
import { useWindowSize } from 'react-use'
import returnErrorMsg from 'utils/returnErrorMsg';

const DisplayError = ({ message = 'Something went wrong.'}) => {
    const { width } = useWindowSize();

    return (
        <div className='w-full sm:h-[250px] h-[180px] rounded-md flex items-center flex-col gap-4 mt-4 justify-center sm:text-2xl text-lg sm:font-semibold font-medium border border-red-600 text-red-500'>
            <ErrorSvg size={width > 600 ? 120 : 70} />
            <span>
                {returnErrorMsg(message)}
            </span>
        </div>
    )
}

export default memo(DisplayError)