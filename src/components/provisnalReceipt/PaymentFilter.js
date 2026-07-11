import SelectInput  from 'components/global/form/SelectInput';
import SelectCustomer   from './inputProvisnal/SelectCustomer';
import Search from 'components/global/Search';
import SelectInventory   from './inputProvisnal/SelectInventory';
import { Provisional_Types}  from 'constants/app.constants'

const PaymentFilter = ({ keyword, setKeyword, setCustomer,setStatus,setInventory }) => {

  return (

<div className="w-full   rounded-lg py-4 flex flex-col gap-3 pb-4">

<div className=' flex flex-col  sm:flex-row sm:justify-between  w-full '>
  <p className="text-dark1 font-semibold">Search Filters</p> 
</div>
<div className=" w-full grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
 <Search
     keyword={keyword}
          setKeyword={setKeyword}
      style={{ height: 40 }}
  placeholder='Search Provisional Receipt'
 />
<SelectCustomer
onSelect={setCustomer}

/>

<SelectInput
  name="receiptStatus"
  placeholder="Receipt Status"
  options={Provisional_Types}
  onSelect={setStatus}
/>

<SelectInventory
  onSelect={setInventory}
  
/>

</div>




     











      
    </div>

  )
}

export default PaymentFilter