// import { debounce } from 'lodash';
import { useEffect, useState } from "react";

import { memo } from 'react';
// import useQueryParams from 'utils/hooks/useQueryParams';




const Search = ({ delay = 500 , keyword,setKeyword, placeholder = 'Search here...' , label = '' , style}) => {

      const [localValue, setLocalValue] = useState(keyword);
    useEffect(() => {
    const timeout = setTimeout(() => {
      setKeyword(localValue);
    }, delay); 

    return () => clearTimeout(timeout);
  }, [localValue, setKeyword, delay]);

    return (
        <div  className='flex flex-col gap-2 h-[40px]   w-full bg-white rounded-xl  focus:outline-none focus:border-primary  '>
            {
                label && 
                <label className='font-semibold text-pure '>
                    {label} 
                </label>
            }
            <div 
                    style={style}
            className={`
                box-shadow  px-4 py-3  rounded-xl  w-full flex items-center  gap-2  
                
            `}>
                <input 
                type="text" 

                   value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder} 
                className='outline-none placeholder:text-sm  text-sm   bg-transparent  w-full'
        
              
                />
                <div className="   w-[5%]">
                <i className="uil uil-search text-primary"></i>
                </div>
            </div>
        </div>
    )
}

export default memo(Search)