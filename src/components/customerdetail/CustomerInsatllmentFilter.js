import SelectInput  from 'components/global/form/SelectInput';
const CustomerInsatllmentFilter = () => {
  return (
 <div className="bg-white rounded-xl flex flex-col gap-5 my-4">

<div className=' flex flex-col gap-3 py-3'>
       <div className=' flex flex-col  sm:flex-row sm:justify-between  w-full px-3'>
  <p className="text-dark1 font-semibold">Installments Filter</p> 
</div>
<div className=" w-full grid  grid-cols-1  sm:grid-cols-2  gap-2 px-3">

<SelectInput
  name="inventoryType"
  placeholder="Select Inventory Type"
  options={[
    "Residential Plot",
    "Commercial Plot",
    "Apartment",
    "House",
    "Office Space",
    "Shop",
    "Industrial Land",
    "Agricultural Land",
    "Mixed Use Property",
    "Other",
  ]}
/>


<SelectInput
  name="installmentStatus"
  placeholder="Select Installment Status"
  options={[
    "Pending",
    "Paid",
    "Overdue",
    "Partially Paid",
    "Cancelled",
  ]}
/>


</div>
</div>
 
    </div>
  )
}

export default CustomerInsatllmentFilter