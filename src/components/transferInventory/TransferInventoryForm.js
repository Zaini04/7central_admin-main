import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import SelectInventory from './transferInputinventory/SelectInventory';
import { PAYMENT_TYPES,Applicant_TYPES } from "constants/app.constants.js";
import { setDocExtraDetails, resetDocMultipleDetails } from 'redux/slices/customerSlice';
import MultiSeclect from "./transferInputinventory/MultiSeclect";
import SingleCustomer from "./transferInputinventory/SingleCustomer";
import MultiCustomerSelect from "./transferInputinventory/MultiCustomerSelect";
import CustomerCard from "./transferInputinventory/CustomerCard";
import {ownerShip_transfer} from 'redux/actions/transferActions';
import ProjectSelect   from './transferInputinventory/ProjectSelect';
import BlockSelect from "./transferInputinventory/BlockSelect";
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";

const TransferInventoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { docExtraDetails, docMultipleDetails } = useSelector((state) => state.customer);
  const { createLoading } = useSelector((state) => state.transfer);

  const [formData, setFormData] = useState({
    project:'',
     sector:'',
    inventory: "",
    customer: [],
    applicantType: "",
    paymentType: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (field, value) => {
    if (field === "applicantType") {
      setFormData(prev => ({
        ...prev,
        applicantType: value,
        customer: []
      }));

      if (value === "joint") {
        dispatch(setDocExtraDetails(null));
      }

      if (value === "self") {
        dispatch(resetDocMultipleDetails());
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Remove error for this field
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
     if (!formData.project) newErrors.project = "Project is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.project || !formData.sector) {
      newErrors.inventory = "Please select Project & Sector first";
    } else if (!formData.inventory) {
      newErrors.inventory = "Inventory is required";
    }

  
    if (!formData.customer || formData.customer.length === 0) newErrors.customer = "Customer is required";
    if (!formData.paymentType) newErrors.paymentType = "Payment Type is required";
    if (!formData.applicantType) newErrors.applicantType = "Applicant Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dispatch(setDocExtraDetails(null));
    dispatch(resetDocMultipleDetails());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const buyersValue =
      formData.applicantType === "self"
        ? formData.customer
        : formData.customer?.map(item => item?._id);

    const payload = {
      inventory: formData.inventory,
      buyers: buyersValue,
      paymentType: formData.paymentType,
      onwershipType: formData.applicantType,
    };

    try {

      console.log(' this is a  payload',payload)
      await dispatch(ownerShip_transfer(payload, navigate));

      dispatch(setDocExtraDetails(null));
      dispatch(resetDocMultipleDetails());
      setFormData({
              project: "",
      sector: "",
        inventory:"",
        customer: [],
        applicantType: "",
        paymentType: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col gap-6 px-3 pt-4 pb-4 rounded-xl shadow-sm">
              <p className="form-title"> OwnerShip Transfor </p>
              <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]" />
      <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">


        {/* Inventory */}
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

  
        <SelectInventory
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

        {/* Applicant Type */}
        <MultiSeclect
          label="Applicant Type"
          placeholder="Select Applicant Type"
          name="applicantType"
          value={formData.applicantType}
          onChange={(val) => handleChange("applicantType", val)}
          error={errors.applicantType}
          options={Applicant_TYPES}
        />

        

        {/* Customer Selection */}
        {formData.applicantType === "self" && (
            <SingleCustomer
              label="Customer"
              placeholder="Select Customer"
              name="customer"
              value={formData.customer[0] || null}
              onChange={(field, val) => handleChange("customer", [val])}
              error={errors.customer}
            />
        )}
        <MultiSeclect
            label="Payment Type"
            placeholder="Select Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={(val) => handleChange("paymentType", val)}
            error={errors.paymentType}
            options={PAYMENT_TYPES}
          />


        {formData.applicantType === "joint" && (
          <div className="sm:col-span-3">
            <MultiCustomerSelect
              label="Customer"
              placeholder="Select Customer"
              name="customer"
              selectedCustomers={formData.customer}
              onChange={(newValue) => handleChange("customer", newValue)}
              error={errors.customer}
            />
          </div>
        )}

         
        {/* Display extra details */}
        {docExtraDetails && (
          <div className="sm:col-span-3">
            <CustomerCard data={docExtraDetails} />
          </div>
        )}

        {docMultipleDetails && docMultipleDetails.length > 0 && (
          <div className="sm:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {docMultipleDetails.map((item, index) => (
              <CustomerCard key={index} data={item} />
            ))}
          </div>
        )}

         


      </div>

      {/* Action Buttons */}
      <div className="px-3 w-full flex justify-end ">
        <div className="flex items-center gap-2">
       <button
  type="button"
  className=" w-fit "
  onClick={() => {
    dispatch(setDocExtraDetails(null));
    dispatch(resetDocMultipleDetails());
    setFormData({
      inventory: "",
      customer: [],
      applicantType: "",
      paymentType: "",
    });
    setErrors({});
  }}
>
  <CancelButton/>
</button>

          <button
            type="button"
            className=" w-fit"
            disabled={createLoading}
            onClick={handleSubmit}
          >
            <NextButton label="Transfer Inventory" createLoading={createLoading} isIcon={false}/>
          </button>
        </div>
      </div>

    </div>
  );
};

export default TransferInventoryForm;
