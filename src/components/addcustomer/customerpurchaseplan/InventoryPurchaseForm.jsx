import { forwardRef, useState,useEffect, useImperativeHandle, } from "react";
import { useNavigate,useParams, useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import Axios from 'config/api';
import { setDocDetails } from 'redux/slices/inventorySlice';
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/global/Loader";
import ItemNotFound from "components/global/ItemNotFound";
import DisplayError from "components/global/DisplayError";
import Status from "components/global/Status";
import Input from './inventoryinput/input';
import MultiSelect from './inventoryinput/MultiSelect';
import DatePicker from "./inventoryinput/DateInput";
import { Installment_TYPES, Installment_Options, Installment_Durtion,Monthly_Durtion, Yearly_Durtion } from 'constants/app.constants';
import { PulseLoader } from "react-spinners";
import {create_purchasePlan}   from 'redux/actions/inventoryActions';
import CancelButton from "components/global/form/CancelButton";

const InventoryPurchaseForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    actualPrice: "",
    sellingPrice: "",
    category: '',
    fullPayment: "",
    downPayment: "",
    allocation: "",
    confirmation: "",
    possession: "",
    bookingDate:"",

    // Quarterly
    quarterlyInstallment: "",
    quarterlyInstallmentsDuration: "",
    quarterlyDurationAmount: "",
    quarterlyStartDate: "",

    // Monthly
    monthlyInstallment: "",
    monthlyInstallmentsDuration: "",
    monthlyDurationAmount: "",
    monthlyStartDate: "",

    // Yearly
    yearlyInstallment: "",
    yearlyInstallmentDuration: "",
    yearlyDurationAmount: "",
    yearlyStartDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { docDetails } = useSelector(state => state.inventory);
  const { createLoading } = useSelector(state => state.purchasePlan);


  const location = useLocation();

const searchParams = new URLSearchParams(location.search);
  const inventory = searchParams.get("inventory");

  const [readOnly, setReadOnly] = useState(true);
  const [errors, setErrors] = useState({});

  const { data, isLoading, isError, error } = useQuery(
    ["single-inventory", inventory],
    () => Axios(`/inventory/${inventory}`)
  );

  useEffect(() => {
    if (!data?.data?.data?.doc) return;

    const d = data.data.data.doc;

    setFormData(prev => ({
      ...prev,
      actualPrice: d?.currentSale?.actualPrice || "",
      sellingPrice: d?.currentSale?.sellingPrice || "",
    }));

    dispatch(setDocDetails(d));
  }, [data, dispatch]);


  const saleId = docDetails?.currentSale?._id;
  // console.log('saleId',saleId)

  const inventoryId = docDetails?._id;




  useImperativeHandle(ref, () => ({
  submitForm: () => {
    handleSubmit();
  },
}));


const calculateInstallmentValues = (sellingPrice, category) => {
  const price = parseFloat(sellingPrice) || 0;
  if (price === 0) return {};

  const calculations = {};

 if (category === "3_year_installment") {
    calculations.downPayment = (price * 0.20).toFixed(2);
    calculations.possession = (price * 0.10).toFixed(2);

   
    calculations.monthlyInstallment = 30;
    const monthlyAmount = (price * 0.015).toFixed(2); 
    calculations.monthlyDurationAmount = `${monthlyAmount} (1.50%)`;
    calculations.monthlyInstallmentsDuration = "Monthly";

   
    calculations.yearlyInstallment = 5; 
    const yearlyAmount = (price * 0.05).toFixed(2);   
    calculations.yearlyDurationAmount = `${yearlyAmount} (5%)`;
    calculations.yearlyInstallmentDuration = "Half Yearly";
  }


if (category === "1_year_installment") {

 calculations.downPayment = (price * 0.25).toFixed(2);
  const remainingAfterInitial = price - (
    parseFloat(calculations.downPayment)   );

  calculations.quarterlyInstallment = 4; 
  calculations.quarterlyInstallmentsDuration = "Quarterly";

  const quarterlyAmount = (remainingAfterInitial / 4).toFixed(2);
  const quarterlyPercent = ((remainingAfterInitial / 4 / price) * 100).toFixed(2);

  calculations.quarterlyDurationAmount = `${quarterlyAmount} (${quarterlyPercent}%)`;
}


  return calculations;
};

const handleChange = (field, value) => {
  
  setFormData(prev => ({ ...prev, [field]: value }));


  if (errors[field]) {
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }


  if (field === "category") {
    if (value === "full_payment") {
      setFormData(prev => ({
        ...prev,

        actualPrice: prev.actualPrice,
        sellingPrice: prev.sellingPrice,
        category: value,

        fullPayment: "",
        downPayment: "",
        allocation: "",
        confirmation: "",
        possession: "",
        bookingDate:"",

        quarterlyInstallment: "",
        quarterlyInstallmentsDuration: "",
        quarterlyDurationAmount: "",
        quarterlyStartDate: "",

        monthlyInstallment: "",
        monthlyInstallmentsDuration: "",
        monthlyDurationAmount: "",
        monthlyStartDate: "",

        yearlyInstallment: "",
        yearlyInstallmentDuration: "",
        yearlyDurationAmount: "",
        yearlyStartDate: "",
      }));
    }

    if (value === "2_year_installment") {
      setFormData(prev => ({
        ...prev,
        actualPrice: prev.actualPrice,
        sellingPrice: prev.sellingPrice,
        category: value,

        // reset full-payment field
        fullPayment: "",

        // Installment fields cleared
        downPayment: "",
        allocation: "",
        confirmation: "",
        possession: "",
        bookingDate:"",
        quarterlyInstallment: "",
        quarterlyInstallmentsDuration: "",
        quarterlyDurationAmount: "",
        quarterlyStartDate: "",

        monthlyInstallment: "",
        monthlyInstallmentsDuration: "",
        monthlyDurationAmount: "",
        monthlyStartDate: "",

        yearlyInstallment: "",
        yearlyInstallmentDuration: "",
        yearlyDurationAmount: "",
        yearlyStartDate: "",
      }));
    }

    if (value === "3_year_installment") {
      setFormData(prev => ({
        ...prev,
        actualPrice: prev.actualPrice,
        sellingPrice: prev.sellingPrice,
        category: value,

        // reset full payment
        fullPayment: "",

        downPayment: "",
        allocation: "",
        confirmation: "",
        possession: "",
        bookingDate:"",
        quarterlyInstallment: "",
        quarterlyInstallmentsDuration: "",
        quarterlyDurationAmount: "",
        quarterlyStartDate: "",

        monthlyInstallment: "",
        monthlyInstallmentsDuration: "",
        monthlyDurationAmount: "",
        monthlyStartDate: "",

        yearlyInstallment: "",
        yearlyInstallmentDuration: "",
        yearlyDurationAmount: "",
        yearlyStartDate: "",
      }));
    }
  }

  // Auto calculate for 3-year plan
  if ((field === "sellingPrice" || field === "category") && value) {
    const sellingPrice = field === "sellingPrice" ? value : formData.sellingPrice;
    const category = field === "category" ? value : formData.category;

    if (sellingPrice && category === "3_year_installment") {
      const calculated = calculateInstallmentValues(sellingPrice, category);
      setFormData(prev => ({
        ...prev,
        ...calculated,
      }));
    }

       if (sellingPrice && category === "1_year_installment") {
      const calculated = calculateInstallmentValues(sellingPrice, category);
      setFormData(prev => ({
        ...prev,
        ...calculated,
      }));
    }
  }
};


const validateForm = () => {
  const newErrors = {};

  const isFullPayment = formData.category === "full_payment";

  const isInstallment =formData.category === "2_year_installment" ;
    const isResidential =formData.category === "3_year_installment" ;


  const isPositive = (value) =>
    value !== "" && !isNaN(value) && Number(value) > 0;

  if (!formData.category) {
    newErrors.category = "Category is required";
  }

  if (isFullPayment) {
    if (formData.fullPayment !== "" && !isPositive(formData.fullPayment)) {
      newErrors.fullPayment = "Full payment must be greater than 0";
    }
  }

  if (isInstallment || isResidential) {
    if (formData.downPayment !== "" && !isPositive(formData.downPayment)) {
      newErrors.downPayment = "Down Payment must be greater than 0";
    }

    if (formData.allocation !== "" && !isPositive(formData.allocation)) {
      newErrors.allocation = "Allocation must be greater than 0";
    }

    if (formData.confirmation !== "" && !isPositive(formData.confirmation)) {
      newErrors.confirmation = "Confirmation must be greater than 0";
    }

    if (formData.possession !== "" && !isPositive(formData.possession)) {
      newErrors.possession = "Possession must be greater than 0";
    }
  }



  const validateGroup = ({
    type,
    duration,
    amount,
    startDate,
    groupName
  }) => {
    const isAnyFilled =
      type !== "" || duration !== "" || amount !== "" || startDate !== "";

    if (!isAnyFilled) return; 


    if (type === "") {
      newErrors[groupName + "Installment"] = "Installment type is required";
    }

    if (duration === "") {
      newErrors[groupName + "InstallmentsDuration"] =
        "Duration is required";
    }

    if (amount === "" || !isPositive(amount)) {
      newErrors[groupName + "DurationAmount"] =
        "Amount must be greater than 0";
    }

  };

  if (isInstallment) {
    validateGroup({
      type: formData.quarterlyInstallment,
      duration: formData.quarterlyInstallmentsDuration,
      amount: formData.quarterlyDurationAmount,
      startDate: formData.quarterlyStartDate,
      groupName: "quarterly"
    });

    validateGroup({
      type: formData.monthlyInstallment,
      duration: formData.monthlyInstallmentsDuration,
      amount: formData.monthlyDurationAmount,
      startDate: formData.monthlyStartDate,
      groupName: "monthly"
    });

    validateGroup({
      type: formData.yearlyInstallment,
      duration: formData.yearlyInstallmentDuration,
      amount: formData.yearlyDurationAmount,
      startDate: formData.yearlyStartDate,
      groupName: "yearly"
    });
  }


  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};




const handleSubmit = async () => {
  if (!validateForm()) return;

  const isFullPayment = formData.category === "full_payment";
const extractAmount = (value) => {
  if (!value) return undefined;
  return value.split(" ")[0]; 
};


 const formatDate = (date) => {
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };


     const isResidential = [ "3_year_installment"].includes(formData.category);
  const isInstallment = [ "2_year_installment",].includes(formData.category);
    const isCommerical = [ "1_year_installment",].includes(formData.category);


  // Base payload
  let payload = {
    category: formData.category,
    sale: saleId,
    inventory: inventoryId,
  };

  if (isFullPayment) {
    payload = {
      ...payload,
      ...(formData.fullPayment && { fullPayment: formData.fullPayment }),
            ...(formData.bookingDate && { bookingDate: formatDate(formData.bookingDate) }),

    };
  }

  if (isInstallment) {
    payload = {
      ...payload,
        ...(formData.downPayment && { downPayment: Number(formData.downPayment) }),
  ...(formData.allocation && { allocation: Number(formData.allocation) }),
  ...(formData.confirmation && { confirmation: Number(formData.confirmation) }),
  ...(formData.possession && { possession: Number(formData.possession) }),
        ...(formData.bookingDate && { bookingDate: formatDate(formData.bookingDate) }),

      // Optional installment schedules
      ...(formData.quarterlyInstallment && {
        quarterly: {
          count: formData.quarterlyInstallment,
          duration: formData.quarterlyInstallmentsDuration,
          amount: Number(formData.quarterlyDurationAmount),
         ...( formData.quarterlyStartDate && { startDate: formatDate(formData.quarterlyStartDate)}),

        },
      }),

      ...(formData.monthlyInstallment && {
        monthly: {
          count: formData.monthlyInstallment,
          duration: formData.monthlyInstallmentsDuration,
          amount: Number(formData.monthlyDurationAmount),
        ...( formData.monthlyStartDate && { startDate: formatDate(formData.monthlyStartDate)}),
        },
      }),

      ...(formData.yearlyInstallment && {
        balloon: {
          count: formData.yearlyInstallment,
          duration: formData.yearlyInstallmentDuration,
          amount: Number(formData.yearlyDurationAmount),
            ...( formData.yearlyStartDate && {startDate: formatDate(formData.yearlyStartDate)}),
        },
      }),
    };
  }


if (isResidential) {
  payload = {
    ...payload,
     ...(formData.downPayment && { downPayment: Number(formData.downPayment) }),
  ...(formData.allocation && { allocation: Number(formData.allocation) }),
  ...(formData.confirmation && { confirmation: Number(formData.confirmation) }),
  ...(formData.possession && { possession: Number(formData.possession) }),
        ...(formData.bookingDate && { bookingDate: formatDate(formData.bookingDate) }),

    // Monthly installment
    ...(formData.monthlyInstallment && {
      monthly: {
        count: formData.monthlyInstallment,
        duration: formData.monthlyInstallmentsDuration,
        amount: Number(extractAmount(formData.monthlyDurationAmount)), 
        ...(formData.monthlyStartDate && { startDate: formatDate(formData.monthlyStartDate) }),
      },
    }),

    // Yearly installment
    ...(formData.yearlyInstallment && {
      balloon: {
        count: formData.yearlyInstallment,
        duration: formData.yearlyInstallmentDuration,
        amount: Number(extractAmount(formData.yearlyDurationAmount)), 
        ...(formData.yearlyStartDate && { startDate: formatDate(formData.yearlyStartDate) }),
      },
    }),
  };
}



 if (isCommerical) {
    payload = {
      ...payload,
        ...(formData.downPayment && { downPayment: Number(formData.downPayment) }),
  ...(formData.allocation && { allocation: Number(formData.allocation) }),
  ...(formData.confirmation && { confirmation: Number(formData.confirmation) }),
  ...(formData.possession && { possession: Number(formData.possession) }),
        ...(formData.bookingDate && { bookingDate: formatDate(formData.bookingDate) }),

      // Optional installment schedules
      ...(formData.quarterlyInstallment && {
        quarterly: {
          count: formData.quarterlyInstallment,
          duration: formData.quarterlyInstallmentsDuration,
                  amount: Number(extractAmount(formData.quarterlyDurationAmount)), 
                 ...( formData.quarterlyStartDate && { startDate: formatDate(formData.quarterlyStartDate)}),


        },
      }),

    
    };
  }



  console.log("FINAL PAYLOAD:", payload);



   try {
    await dispatch(create_purchasePlan(payload,navigate));

      setFormData({
      actualPrice: docDetails?.currentSale?.actualPrice,
        sellingPrice:  docDetails?.currentSale?.sellingPrice ,
    category: '',
    fullPayment: "",
    downPayment: "",
    allocation: "",
    confirmation: "",
    possession: "",
    bookingDate:"",
    quarterlyInstallment: "",
    quarterlyInstallmentsDuration: "",
    quarterlyDurationAmount: "",
    quarterlyStartDate: "",

    monthlyInstallment: "",
    monthlyInstallmentsDuration: "",
    monthlyDurationAmount: "",
    monthlyStartDate: "",

    yearlyInstallment: "",
    yearlyInstallmentDuration: "",
    yearlyDurationAmount: "",
    yearlyStartDate: "",
    });
    setErrors({}); 
  
 
  } catch (error) {
    console.error("Error submitting client:", error);
    
  }
  // dispatch(createPurchasePlan(payload))
};







const isFullPayment = formData.category === "full_payment";

const isInstallment =  formData.category === "2_year_installment" ;

const   isResidential=  formData.category === "3_year_installment" ;

const isCommerical =  formData.category === "1_year_installment" ;


  if (isLoading) return <Loader />;
  if (isError) return <DisplayError message={error?.message || "Something went wrong"} />;
  if (!docDetails) return <ItemNotFound message="Inventory not found" />;

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 px-3 pt-4">
        <div>
          <h2 className="text-xl font-semibold capitalize">
            {docDetails?.project?.title} - {docDetails?.sector?.title}
          </h2>
          <p className="text-sm pt-3"><Status status={docDetails?.status} /></p>
        </div>
      </div>

      {/* BASIC PRICING */}
      <div className="w-full  mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3">
        <Input
          label="Actual Price"
          name="actualPrice"
          type="text"
          readOnly={readOnly}
          value={formData.actualPrice}
          onChange={(e) => handleChange("actualPrice", e.target.value)}
          error={errors.actualPrice}
        />
        <Input
          label="Selling Price"
          name="sellingPrice"
          type="text"
          readOnly={readOnly}
          value={formData.sellingPrice}
          onChange={(e) => handleChange("sellingPrice", e.target.value)}
          error={errors.sellingPrice}
        />

        <MultiSelect
          placeholder="Select Category"
          label="Category"
          name="category"
          value={formData.category}
          onChange={(val) => handleChange("category", val)}
          error={errors.category}
          options={Installment_TYPES}
        />
  <DatePicker
                  label="Booking Date"
                  placeholder="Select Date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={(val) => handleChange("bookingDate", val)}
                  error={errors.bookingDate}
                />
{isFullPayment && (
  <Input
    label="Full Payment"
    name="fullPayment"
    placeholder="Enter Full Payment"
    type="number"
    value={formData.fullPayment}
    onChange={(e) => handleChange("fullPayment", e.target.value)}
    error={errors.fullPayment}
  />
)}

{isInstallment && (

  <>

        <Input
          label="Down Payment"
          placeholder="Enter Down Payment"
          
          name="downPayment"
          type="number"
          value={formData.downPayment}
          onChange={(e) => handleChange("downPayment", e.target.value)}
          error={errors.downPayment}
        />
        <Input
          label="Allocation"
          placeholder="Enter Allocation"
          name="allocation"
          type="text"
          value={formData.allocation}
          onChange={(e) => handleChange("allocation", e.target.value)}
          error={errors.allocation}
        />
        <Input
          label="Confirmation"
          placeholder="Enter Confirmation"
          name="confirmation"
          type="text"
          value={formData.confirmation}
          onChange={(e) => handleChange("confirmation", e.target.value)}
          error={errors.confirmation}
        />
        <Input
          label="Possession"
          placeholder="Enter Possession"
          name="possession"
          type="text"
          value={formData.possession}
          onChange={(e) => handleChange("possession", e.target.value)}
          error={errors.possession}
        />
</>)}

   {(isResidential) && (
          <>
            <Input
              label="Down Payment (20%)"
              placeholder="Enter Down Payment (20%)"
              name="downPayment"
              type="number"
              value={formData.downPayment}
              onChange={(e) => handleChange("downPayment", e.target.value)}
              error={errors.downPayment}
            />
            <Input
              label="Allocation"
              name="allocation"
              placeholder="Enter Allocation"
              type="number"
              value={formData.allocation}
              onChange={(e) => handleChange("allocation", e.target.value)}
              error={errors.allocation}
            />
            <Input
              label="Confirmation"
              name="confirmation"
                        placeholder="Enter Confirmation"
              type="number"
              value={formData.confirmation}
              onChange={(e) => handleChange("confirmation", e.target.value)}
              error={errors.confirmation}
            />
            <Input
              label="Possession"
              placeholder="Enter Possession"

              name="possession"
              type="number"
              value={formData.possession}
              onChange={(e) => handleChange("possession", e.target.value)}
              error={errors.possession}
            />
          </>
        )}


        


          {(isCommerical) && (
          <>
            <Input
              label="Down Payment (25%)"
              placeholder="Enter Down Payment"

              name="downPayment"
              type="number"
              value={formData.downPayment}
              onChange={(e) => handleChange("downPayment", e.target.value)}
              error={errors.downPayment}
            />
            <Input
              label="Allocation"
              placeholder="Enter Allocation"
              name="allocation"
              type="number"
              value={formData.allocation}
              onChange={(e) => handleChange("allocation", e.target.value)}
              error={errors.allocation}
            />
            <Input
              label="Confirmation"
              placeholder="Enter Confirmation"
              name="confirmation"
              type="number"
              value={formData.confirmation}
              onChange={(e) => handleChange("confirmation", e.target.value)}
              error={errors.confirmation}
            />
            <Input
              label="Possession"
              placeholder="Enter Possession"
              name="possession"
              type="number"
              value={formData.possession}
              onChange={(e) => handleChange("possession", e.target.value)}
              error={errors.possession}
            />
          </>
        )}

        
      </div>
                    <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>




    {isCommerical && (
        <>
  
            <h3 className="text-lg font-semibold mb-4 px-2 py-6">Quarterly Installments</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5  gap-y-10 px-3  pb-6">
              <Input
                label="Quarterly Installment Count"
                placeholder="Enter Quarterly Installment Count"
                name="quarterlyInstallment"
                value={formData.quarterlyInstallment}
                onChange={(e) => handleChange("quarterlyInstallment", e.target.value)}
                error={errors.quarterlyInstallment}
      
              />

              <MultiSelect
                label="Quarterly Duration"
                placeholder="Enter Quarterly Duration"
                name="quarterlyInstallmentsDuration"
                value={formData.quarterlyInstallmentsDuration}
                onChange={(val) => handleChange("quarterlyInstallmentsDuration", val)}
                error={errors.quarterlyInstallmentsDuration}
                options={Installment_Durtion}
              />

              <Input
                  label="Quarterly Installment"
                  placeholder="Enter Quarterly Installment"
                  name="quarterlyDurationAmount"
                  type="text"
                  value={formData.quarterlyDurationAmount}
                  onChange={(e) => handleChange("quarterlyDurationAmount", e.target.value)}
                  error={errors.quarterlyDurationAmount}
                />

              <DatePicker
                label="Quarterly Start Date"
                placeholder="Select Quarterly Start Date"
                name="quarterlyStartDate"
                value={formData.quarterlyStartDate}
                onChange={(val) => handleChange("quarterlyStartDate", val)}
                error={errors.quarterlyStartDate}
              />
            </div>
     

     
           

        </>
      )}


    {isResidential && (
        <>
  
            <h3 className="text-lg font-semibold mb-0.5 px-2 py-6">Monthly Installments</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3 pb-6">
              <Input
                label="Monthly Installment Count"
                placeholder="Enter Monthly Installment Count"
                

                name="monthlyInstallment"
                value={formData.monthlyInstallment}
                onChange={(e) => handleChange("monthlyInstallment", e.target.value)}
                error={errors.monthlyInstallment}
      
              />

              <MultiSelect
                label="Monthly Duration"
                placeholder="Enter Monthly Duration"
                name="monthlyInstallmentsDuration"
                value={formData.monthlyInstallmentsDuration}
                onChange={(val) => handleChange("monthlyInstallmentsDuration", val)}
                error={errors.monthlyInstallmentsDuration}
                options={Monthly_Durtion}
              />

              <Input
                label="Monthly Installment Amount"
                placeholder="Enter Monthly Installment Amount"
                name="monthlyDurationAmount"
                type="text"
                value={formData.monthlyDurationAmount}
                onChange={(e) => handleChange("monthlyDurationAmount", e.target.value)}
                error={errors.monthlyDurationAmount}
              />

              <DatePicker
                label="Monthly Start Date"
                placeholder="Enter Monthly Start Date"
                name="monthlyStartDate"
                value={formData.monthlyStartDate}
                onChange={(val) => handleChange("monthlyStartDate", val)}
                error={errors.monthlyStartDate}
              />
            </div>

                        <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

     

     
            <h3 className="text-lg font-semibold mb-0.5 px-2 py-6">Yearly Installments</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3">
              <Input
                label="Yearly Installment Count"
                placeholder="Enter Yearly Installment Count"
                name="yearlyInstallment"
                value={formData.yearlyInstallment}
                onChange={(e) => handleChange("yearlyInstallment", e.target.value)}
                error={errors.yearlyInstallment}
          
              />

              <MultiSelect
                label="Yearly Duration"
                placeholder="Enter Yearly Duration"
                name="yearlyInstallmentDuration"
                value={formData.yearlyInstallmentDuration}
                onChange={(val) => handleChange("yearlyInstallmentDuration", val)}
                error={errors.yearlyInstallmentDuration}
                options={Yearly_Durtion}
              />

              <Input
                label="Yearly Installment Amount"
                placeholder="Enter Yearly Installment Amount"
                name="yearlyDurationAmount"
                type="text"
                value={formData.yearlyDurationAmount}
                onChange={(e) => handleChange("yearlyDurationAmount", e.target.value)}
                error={errors.yearlyDurationAmount}
              />

              <DatePicker
                label="Yearly Start Date"
                placeholder="Enter Yearly Start Date"
                name="yearlyStartDate"
                value={formData.yearlyStartDate}
                onChange={(val) => handleChange("yearlyStartDate", val)}
                error={errors.yearlyStartDate}
              />
            </div>

        </>
      )}

{isInstallment && (
     <>
      <div className="flex flex-col gap-3 mt-6 py-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3 ">
          <MultiSelect
            label="Quarterly Installment Type"
            placeholder="Select Quarterly Installment Type"
            name="quarterlyInstallment"
            value={formData.quarterlyInstallment}
            onChange={(val) => handleChange("quarterlyInstallment", val)}
            error={errors.quarterlyInstallment}
            options={Installment_Options}
          />

          <MultiSelect
            label="Quarterly Duration"
            placeholder="Enter Quarterly Duration"
            name="quarterlyInstallmentsDuration"
            value={formData.quarterlyInstallmentsDuration}
            onChange={(val) => handleChange("quarterlyInstallmentsDuration", val)}
            error={errors.quarterlyInstallmentsDuration}
            options={Installment_Durtion}
          />

          <Input
            label="Quarterly Duration Amount"
            placeholder="Enter Quarterly Duration Amount"
            name="quarterlyDurationAmount"
            type="text"
            value={formData.quarterlyDurationAmount}
            onChange={(e) => handleChange("quarterlyDurationAmount", e.target.value)}
            error={errors.quarterlyDurationAmount}
          />

          <DatePicker
            label="Quarterly Start Date"
            placeholder="Enter Quarterly Start Date"
            name="quarterlyStartDate"
            value={formData.quarterlyStartDate}
            onChange={(val) => handleChange("quarterlyStartDate", val)}
            error={errors.quarterlyStartDate}
          />
        </div>
      </div>
      </>
)}

   {isInstallment && (
    <>
      <div className="flex flex-col gap-3">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3 pb-4  ">
          <MultiSelect
            label="Monthly Installment Type"
            placeholder="Enter Monthly Installment Type"
            name="monthlyInstallment"
            value={formData.monthlyInstallment}
            onChange={(val) => handleChange("monthlyInstallment", val)}
            error={errors.monthlyInstallment}
            options={Installment_Options}
          />

          <MultiSelect
            label="Monthly Duration"
            placeholder="Enter Monthly Duration"
            name="monthlyInstallmentsDuration"
            value={formData.monthlyInstallmentsDuration}
            onChange={(val) => handleChange("monthlyInstallmentsDuration", val)}
            error={errors.monthlyInstallmentsDuration}
            options={Monthly_Durtion}
          />

          <Input
            label="Monthly Duration Amount"
            placeholder="Enter Monthly Duration Amount"
            name="monthlyDurationAmount"
            type="text"
            value={formData.monthlyDurationAmount}
            onChange={(e) => handleChange("monthlyDurationAmount", e.target.value)}
            error={errors.monthlyDurationAmount}
          />

          <DatePicker
            label="Monthly Start Date"
            placeholder="Enter Monthly Start Date"
            name="monthlyStartDate"
            value={formData.monthlyStartDate}
            onChange={(val) => handleChange("monthlyStartDate", val)}
            error={errors.monthlyStartDate}
          />
        </div>
                    <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

      </div>
      </>)}

    {isInstallment && (
      <>
      <div className="flex flex-col gap-3 mt-6 py-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3 ">
          <MultiSelect
            label="Yearly Installment Type"
            placeholder="Select Yearly Installment Type"
            name="yearlyInstallment"
            value={formData.yearlyInstallment}
            onChange={(val) => handleChange("yearlyInstallment", val)}
            error={errors.yearlyInstallment}
            options={Installment_Options}
          />

          <MultiSelect
            label="Yearly Duration" 
            placeholder="Select Yearly Duration" 
            
            name="yearlyInstallmentDuration"
            value={formData.yearlyInstallmentDuration}
            onChange={(val) => handleChange("yearlyInstallmentDuration", val)}
            error={errors.yearlyInstallmentDuration}
            options={Yearly_Durtion}
          />

          <Input
            label="Yearly Duration Amount"
            placeholder="Select Yearly Duration Amount"
            name="yearlyDurationAmount"
            type="text"
            value={formData.yearlyDurationAmount}
            onChange={(e) => handleChange("yearlyDurationAmount", e.target.value)}
            error={errors.yearlyDurationAmount}
          />

          <DatePicker
            label="Yearly Start Date"
            placeholder="Select Yearly Start Date"
            name="yearlyStartDate"
            value={formData.yearlyStartDate}
            onChange={(val) => handleChange("yearlyStartDate", val)}
            error={errors.yearlyStartDate}
          />
        </div>
      </div>
      </>)}

      {/* SUBMIT BUTTON */}

         <div className="px-3 pb-4 w-full flex  justify-end">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          className=""

                        >
                          <CancelButton/>
                        </button>

                          <button
                          type="button"
                          className="bg-gray3 rounded-full text-white px-4 py-1.5"
                          onClick={() => navigate("/app/installments")}
                        >
                          Perview
                        </button>
                        {/* <button
            onClick={handleSubmit}
                          className="btn-primary py-2 sm:px-12 px-6 w-fit"
                          disabled={createLoading}
                        >
                          {createLoading ? <PulseLoader size={12} color='white'  /> : "Purchase Plan"}
                        </button> */}
                      </div>
                    </div>
  
    </div>
  );
});

export default InventoryPurchaseForm;

