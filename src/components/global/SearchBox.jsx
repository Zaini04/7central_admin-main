// import { IoSearchOutline } from "react-icons/io5";
import SearchSvg from 'assets/svgs/Searchsvg';
import { useEffect,useState } from "react";

const SearchBox = ({  delay = 500 ,keyword, setKeyword }) => {

    const [localValue, setLocalValue] = useState(keyword);
      useEffect(() => {
      const timeout = setTimeout(() => {
        setKeyword(localValue);
      }, delay); 
  
      return () => clearTimeout(timeout);
    }, [localValue, setKeyword, delay]);
  return (
 <div className="w-full  h-[44px] rounded-[8px] border-[1.5px] border-primary/20 relative z-0">
     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <SearchSvg />
      </div>

      <input
        type="text"
              value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="outline-none text-sm  pl-10  rounded-[8px] h-full px-3 w-full"
        placeholder="Search anything here"
      />
    </div>
  );
};

export default SearchBox;
