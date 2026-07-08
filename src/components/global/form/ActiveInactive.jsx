import React, { useState } from 'react';

export default function ActiveInactive() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-center  w-fit">
      <div className=" rounded-xl">
        
        <button
          onClick={() => setIsActive(!isActive)}
          className="flex w-36  items-center gap-3 bg-white px-4 py-3.5 rounded-xl  transition-all duration-200 "
        >
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${
              isActive ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full  transform transition-transform duration-300 ease-in-out ${
                isActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>

          <span
            className={`text-sm font-normal transition-colors duration-300 select-none ${
              isActive ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </button>

      </div>
    </div>
  );
}