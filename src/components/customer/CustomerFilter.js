import ActiveInactive from 'components/global/form/ActiveInactive';
import SelectInput  from 'components/global/form/SelectInput';
import Search from 'components/global/Search';
import { customerStatus } from 'constants/addcustomer.constants';

const CustomerFilter = (
  {
keyword,
setKeyword,
setStatus

  }


) => {
  return (

<div className="w-full     rounded-xl py-4  flex flex-col lg:flex-row  items-start  gap-3 pb-4">
 
{/* <div className=' flex flex-col   sm:flex-row sm:justify-between  w-full px-3'>
  <p className="text-dark1 font-semibold">Search Filters</p> 
</div> */}
<div className=" w-full  grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4   "> 
 <Search
     keyword={keyword}
          setKeyword={setKeyword}
      style={{ height: 40 }}
  placeholder='Search Phone/Name'
 />
 <Search
     keyword={keyword}
          setKeyword={setKeyword}
      style={{ height: 40 }}
  placeholder='Date'
 />
 <Search
     keyword={keyword}
          setKeyword={setKeyword}
      style={{ height: 40 }}
  placeholder='Location'
 />

{/* <SelectInput
  name="status"
  placeholder="Select  Status"
  options={ customerStatus}
   onSelect={setStatus} 

/> */}

</div>
{/* <ActiveInactive/> */}




     











      
    </div>

  )
}

export default CustomerFilter