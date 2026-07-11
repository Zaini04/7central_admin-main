import SelectInput  from 'components/global/form/SelectInput';
import Search from 'components/global/Search';
import SelectInventory  from './inputInstallment/SelectInventory'
import {Installment_Status}  from 'constants/app.constants'
const InstallmentsFilter = ({ keyword, setKeyword,setInventory,setStatus }) => {
  return (

<div className="w-full   rounded-lg py-4 flex flex-col gap-3 pb-4">

<div className=' flex flex-col  sm:flex-row sm:justify-between  w-full '>
  <p className="text-dark1 font-semibold">Search Filters</p> 
</div>
<div className=" w-full grid  grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 gap-2 ">
<Search
     keyword={keyword}
          setKeyword={setKeyword}
      style={{ height: 40 }}
  placeholder='Search Installment'
 />

 <SelectInventory
    onSelect={setInventory}
 />
<SelectInput
  name="Status"
  placeholder="Status"
 options={Installment_Status}
   onSelect={setStatus}
/>



</div>




     











      
    </div>

  )
}

export default InstallmentsFilter