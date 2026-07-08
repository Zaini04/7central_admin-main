import {forwardRef, useState,useEffect, useImperativeHandle, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { PAYMENT_TYPES, Applicant_TYPES_self } from "constants/app.constants.js";
import ProjectSelect from "./assignInventoryInput/ProjectSelect";
import BlockSelect from "./assignInventoryInput/BlockSelect";
import InventorySelect from "./assignInventoryInput/InventorySelect";
import MultiSeclect from "./assignInventoryInput/MultiSeclect";
import Input from "./assignInventoryInput/Input";
import SingleCustomer from "./assignInventoryInput/SingleCustomer";
import MultiCustomerSelect from "./assignInventoryInput/MultiCustomerSelect";
import CustomerCard    from './assignInventoryInput/CustomerCard';
import {setDocExtraDetails,resetDocMultipleDetails}  from 'redux/slices/customerSlice';
import {customerDocument_Assign}  from  'redux/actions/customerActions';
import { PulseLoader } from "react-spinners";
 import { useNavigate,useParams} from "react-router-dom";
import toast from "react-hot-toast";
import { removeDocMultipleDetails,setDoc } from "redux/slices/customerSlice";
import SingleInventoryCard   from './assignInventoryInput/SingleInventoryCard';
import SingleCustomerCard    from './assignInventoryInput/SingleCustomerCard';
import {setDocinventoryExtraDetails}  from 'redux/slices/inventorySlice';
import Axios from "config/api";
import { useQuery } from "react-query";


const AssignInventoryForm= forwardRef((props, ref) => {

  const dispatch = useDispatch();
 const navigate = useNavigate();
     const { id } = useParams();
  const {  docExtraDetails, docMultipleDetails,doc} = useSelector((state) => state.customer);
    const {docinventoryExtraDetails, } = useSelector((state) => state.inventory);
  let submitFormFn = null;
  


  const [formData, setFormData] = useState({
    project: "",
    sector: "",
    inventory: "",
    customer: [], 
    customerName: '',
    applicantType: "self",
    paymentType: "",
    sellingPrice: "",
    actualPrice: "",
  });

  const [errors, setErrors] = useState({});




 const { data, isLoadingCustomer, isErrorCustomer} = useQuery(
      ["single-customer", id],
      () => Axios(`/customer/${id}`)
    );
  
  useEffect(() => {
  const d = data?.data?.data?.doc;
  if (!d) return;

  // Update redux
  dispatch(setDoc(d));

  // Update formData
  setFormData((prev) => ({
    ...prev,
    customer: [d?.customer?._id],
    customerName: d?.customer?.name || "",
  }));
}, [data]);
  
 

useImperativeHandle(ref, () => ({
  submitForm: () => {
    handleSubmit();
  },
}));

const handleChange = (field, value) => {
  if (field === "applicantType") {
    setFormData(prev => ({
      ...prev,
      applicantType: value,
      customer: []
    }));

    if (errors.applicantType) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.applicantType;
        return updated;
      });
    }

    return;
  }

  setFormData(prev => ({ ...prev, [field]: value }));

  if (errors[field]) {
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }
};

  const validateForm = () => {
    const newErrors = {};

    if (!formData.project) newErrors.project = "Project is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.project || !formData.sector) {
      newErrors.inventory = "Please select Project & Sector first";
    } else if (!formData.inventory) {
      newErrors.inventory = "Inventory is required";
    }

    if (!formData.customer || formData.customer.length === 0) {
      newErrors.customer = "Customer is required";
    }

    if (!formData.paymentType) newErrors.paymentType = "Payment Type is required";
    if (!formData.applicantType) newErrors.applicantType = "Applicant Type is required";

    if (!formData.sellingPrice) {
  newErrors.sellingPrice = "Selling Price is required";
} else if (Number(formData.sellingPrice) <= 0) {
  newErrors.sellingPrice = "Selling Price must be greater than 0";
}

    if (formData.actualPrice !== "" && Number(formData.actualPrice) <= 0) {
      newErrors.actualPrice = "Actual Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

useEffect(() => {
  dispatch(setDocExtraDetails(null));
  dispatch(resetDocMultipleDetails()); 
  dispatch(setDocinventoryExtraDetails(null));
}, [dispatch]);

 const handleSubmit = async () => {
  if (!validateForm()) return;

  // Build buyers field
  const buyersValue =
    formData.applicantType === "self"
      ? formData.customer                
      : formData.customer?.map(item => item?._id);

  const payload = {
  
    inventory: formData.inventory,
    buyers: buyersValue,
    paymentType: formData.paymentType,
    onwershipType: formData.applicantType,
     sellingPrice: formData.sellingPrice,
    ...(formData.actualPrice && { actualPrice: formData.actualPrice }),
  };
try {

 console.log('this is a   payload',payload)

  await dispatch(customerDocument_Assign(payload,id, navigate));
   
    dispatch(setDocinventoryExtraDetails(null));
    setFormData({
      project: "",
      sector: "",
      inventory: "",
      customer: [],
      applicantType: "",
      paymentType: "",
      sellingPrice: "",
      actualPrice: "",
    });
    setErrors({}); 
} catch (error) {
  console.error("Error submitting:", error);
}

};
  const parseNumber = (value = "") =>
  value.replace(/,/g, "").replace(/[^\d.]/g, "");

const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;

  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};

  return (
    <div className="w-full bg-white flex flex-col gap-6 px-3 pb-4 rounded-xl shadow-sm">
      <p className="form-title py-6">Assign Inventory Details</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
        <ProjectSelect
          label="Select Project"
          placeholder="Select Project"
          name="project"
          value={formData.project}
          onChange={(val) => handleChange("project", val)}
          error={errors.project}
        />
        <BlockSelect
          label="Select Sector"
          placeholder="Select Sector"
          name="sector"
          value={formData.sector}
          onChange={(val) => handleChange("sector", val)}
          error={errors.sector}
        />

  
        <InventorySelect
          label="Inventory"
          placeholder="Select Inventory"
          name="inventory"
          value={formData.inventory}
          onChange={(val) => handleChange("inventory", val)}
          project={formData.project}
          sector={formData.sector}
          error={errors.inventory}
          disabled={!formData.project || !formData.sector}
        />


        <MultiSeclect
          label="Applicant Type"
          placeholder="Select Applicant Type"
          name="applicantType"
          value={formData.applicantType}
          onChange={(val) => handleChange("applicantType", val)}
          error={errors.applicantType}
          options={Applicant_TYPES_self}
        />


  
            <Input
              label="Customer"
              name="customerName"
                   value={formData.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
             readOnly = {true}
              error={errors.customerName}
            />
 

        {/* {formData.applicantType === "joint" && (
          <div className="sm:col-span-2">
            <MultiCustomerSelect
              label="Customer"
              name="customer"
              selectedCustomers={formData.customer} 
              onChange={(newValue) => handleChange("customer", newValue)}
                   error={errors.customer}
            />
           
          </div>
        )} */}

 


 {/* {docMultipleDetails && docMultipleDetails.length > 0 && (
  <div className="sm:col-span-2">
  <div className=" flex flex-col gap-3">
    {docMultipleDetails.map((item, index) => (
      <CustomerCard key={index} data={item}
         onRemove={(id) => {
            dispatch(removeDocMultipleDetails(id));

            handleChange(
              "customer",
              formData.customer.filter(c => c._id !== id)
            );
          }}
      
       />
    ))}
    </div>
  </div>
)} */}






        {/* Payment Type */}
        {/* <div className=""> */}
          <MultiSeclect
            placeholder="Select Payment Type"
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={(val) => handleChange("paymentType", val)}
            error={errors.paymentType}
            options={PAYMENT_TYPES}
          />
        {/* </div> */}

        {/* Selling & Actual Price */}
  <Input
          label="Selling Price"
          name="sellingPrice"
          placeholder="Enter Selling Price"
          type="text"
          // value={formData.sellingPrice}
          value={formatNumber(formData.sellingPrice)}

          onChange={(e) => handleChange("sellingPrice", parseNumber(e.target.value))}
          error={errors.sellingPrice}
        />
        {/* <Input
          label="Selling Price"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={(e) => handleChange("sellingPrice", e.target.value)}
          error={errors.sellingPrice}
        /> */}
         <Input
          placeholder="Enter Actual Price"
          label="Actual Price"
          name="actualPrice"
          type="text"
          // value={formData.sellingPrice}
          value={formatNumber(formData.actualPrice)}

          onChange={(e) => handleChange("actualPrice", parseNumber(e.target.value))}
          error={errors.actualPrice}
        />

         {doc && (
       <div className="sm:col-span-2">
    <SingleCustomerCard data={doc?.customer} />
</div>
 )}


 {docinventoryExtraDetails && (

       <div className="sm:col-span-2">
    <SingleInventoryCard data={docinventoryExtraDetails} />
</div>
 )}

           {/* <Input
          label="Selling Price"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}

          onChange={(e) => handleChange("sellingPrice", e.target.value)}
          error={errors.sellingPrice}
        />
 <Input
          label="Actual Price"
          name="actualPrice"
          type="number"
          value={formData.actualPrice}
          onChange={(e) => handleChange("actualPrice", e.target.value)}
          error={errors.actualPrice}
        /> */}

     
       
      </div>

      {/* Action Buttons */}
      {/* <div className="px-3 w-full flex justify-center">
        <div className="flex items-center gap-2">
<button
  type="button"
  className="btn-secondary w-fit md:w-[148px]"
  onClick={() => {
    // Reset form data
    setFormData({
      project: "",
      sector: "",
      inventory: "",
      customer: [],
      applicantType: "",
      paymentType: "",
      sellingPrice: "",
      actualPrice: "",
    });

    // Redux resets
    dispatch(setDocExtraDetails(null));
    dispatch(resetDocMultipleDetails());
    dispatch(setDocinventoryExtraDetails(null));
  }}
>
  Cancel
</button>

          <button
            type="button"
            className="btn-primary py-2 xl:px-6 px-6 w-fit"
                     disabled={createCustomerInventoryDocumnetLoading}
            onClick={handleSubmit}
          >



                 {
                                      createCustomerInventoryDocumnetLoading
                                                        ?
                                                            <PulseLoader size={12} color='white' />
                                                        :
                                                            'Assign Inventory'
                                                    }
         
          </button>
        </div>
      </div> */}
    </div>
  );
});

export default AssignInventoryForm;
