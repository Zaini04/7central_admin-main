import { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PAYMENT_TYPES,
  Applicant_TYPES_self,
  Applicant_TYPES,
  ProjectTypes,
  BlockTypes,
  FloorType,
  INVENTORY_TYPES,
  Inventories,
} from "constants/app.constants.js";
import ProjectSelect from "./assignInventoryInput/ProjectSelect";
import BlockSelect from "./assignInventoryInput/BlockSelect";
import InventorySelect from "./assignInventoryInput/InventorySelect";
import MultiSeclect from "./assignInventoryInput/MultiSeclect";
import Input from "./assignInventoryInput/Input";
import SingleCustomer from "./assignInventoryInput/SingleCustomer";
import MultiCustomerSelect from "./assignInventoryInput/MultiCustomerSelect";
import CustomerCard from "./assignInventoryInput/CustomerCard";
import {
  setDocExtraDetails,
  resetDocMultipleDetails,
} from "redux/slices/customerSlice";
import { customerDocument_Assign } from "redux/actions/customerActions";
import { PulseLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { removeDocMultipleDetails, setDoc } from "redux/slices/customerSlice";
import SingleInventoryCard from "./assignInventoryInput/SingleInventoryCard";
import SingleCustomerCard from "./assignInventoryInput/SingleCustomerCard";
import { setDocinventoryExtraDetails } from "redux/slices/inventorySlice";
import Axios from "config/api";
import { useQuery } from "react-query";
import AmountInput from "components/global/form/AmountInput";
import FormControl from "components/global/form/FormControl";
import Textarea from "./assignInventoryInput/TextInput";
import FileInput from "./assignInventoryInput/FileInput";
import ConfirmPricePopup from "./assignInventoryInput/ConfirmPricePopup";
import AttachmentCapture from "./assignInventoryInput/AttachmentCapture";

const AssignInventoryForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { docExtraDetails, docMultipleDetails, doc } = useSelector(
    (state) => state.customer,
  );
  const { docinventoryExtraDetails } = useSelector((state) => state.inventory);
  let submitFormFn = null;

  const [formData, setFormData] = useState({
    project: "",
    sector: "",
    inventory: "",
    customer: [],
    customerName: "",
    applicantType: "self",
    paymentType: "",
    sellingPrice: "",
    actualPrice: "",
    attachments: null,
  });

  const [errors, setErrors] = useState({});

const { data, isLoadingCustomer, isErrorCustomer } = useQuery(
  ["single-customer", id],
  () => Axios(`/customer/${id}`),
  {
    enabled: !!id,               // id na ho to query chale hi na
    refetchOnWindowFocus: false, // tab switch pe refetch band
    refetchOnMount: false,       // sirf ek dafa fetch ho
  }
);

  useEffect(() => {
  const d = data?.data?.data?.doc;
  if (!d) return;

  dispatch(setDoc(d));

  setFormData((prev) => {
    const selfObj = d?.customer;
    if (!selfObj?._id) return { ...prev, customerName: selfObj?.name || "" };

    const existingJoint = Array.isArray(prev.customer)
      ? prev.customer.filter(
          (c) => (typeof c === "string" ? c : c?._id) !== selfObj._id
        )
      : [];

    return {
      ...prev,
      customer: [selfObj, ...existingJoint], // self hamesha included
      customerName: selfObj?.name || "",
    };
  });
}, [data]);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit();
    },
  }));

const handleChange = (field, value) => {
  if (field === "applicantType") {
    setFormData((prev) => {
      const selfObj = doc?.customer; // redux se fixed self customer
      let newCustomer;

      if (value === "joint") {
        // self ko rakho + jo pehle se joint mein add tha wo bhi rakho
        const existingJoint = Array.isArray(prev.customer)
          ? prev.customer.filter(
              (c) => (typeof c === "string" ? c : c?._id) !== selfObj?._id
            )
          : [];
        newCustomer = selfObj?._id ? [selfObj, ...existingJoint] : existingJoint;
      } else if (value === "self") {
        // sirf self hi rahe
        newCustomer = selfObj?._id ? [selfObj] : [];
      } else {
        newCustomer = [];
      }

      return { ...prev, applicantType: value, customer: newCustomer };
    });

    if (errors.applicantType) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.applicantType;
        return updated;
      });
    }

    return;
  }

  setFormData((prev) => ({ ...prev, [field]: value }));

  if (errors[field]) {
    setErrors((prev) => {
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

    if (!formData.paymentType)
      newErrors.paymentType = "Payment Type is required";
    if (!formData.applicantType)
      newErrors.applicantType = "Applicant Type is required";

    if (!formData.sellingPrice) {
      newErrors.sellingPrice = "Selling Price is required";
    } else if (Number(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = "Selling Price must be greater than 0";
    }
    if (!formData.attachments || formData.attachments.length === 0) {
      newErrors.attachments = "Attachment is required";
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

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowConfirmPopup(true);
  };

  const handleConfirmSubmit = async () => {
    // Build buyers field
      const buyersValue =
    formData.applicantType === "self"
      ? formData.customer?.filter(Boolean)
      : formData.customer
          ?.map((item) => (typeof item === "string" ? item : item?._id))
          .filter(Boolean);

  if (!buyersValue || buyersValue.length === 0) {
    toast.error("Please select a valid customer");
    setShowConfirmPopup(false);
    return;
  }
    const payload = {
      inventory: formData.inventory,
      buyers: buyersValue,
      paymentType: formData.paymentType,
      onwershipType: formData.applicantType,
      sellingPrice: formData.sellingPrice,
      ...(formData.actualPrice && { actualPrice: formData.actualPrice }),
    };
    try {
      console.log("this is a   payload", payload);
      console.log("attachments (frontend only):", formData.attachments);
      await dispatch(customerDocument_Assign(payload, id, navigate));

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
        attachments: null,
      });
      setErrors({});
      setShowConfirmPopup(false);
    } catch (error) {
      console.error("Error submitting:", error);
      setShowConfirmPopup(false);
    }
  };
  //   const parseNumber = (value = "") =>
  //   value.replace(/,/g, "").replace(/[^\d.]/g, "");

  // const formatNumber = (value) => {
  //   if (value === "" || value === null || value === undefined) return "";
  //   const raw = String(value).replace(/,/g, "");
  //   if (raw === "" || raw === ".") return raw;

  //   const [intPart, decPart] = raw.split(".");
  //   const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  //   return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
  // };

  return (
    <div className="w-full bg-white flex flex-col gap-6 px-3 pb-4 rounded-xl shadow-sm">
      <p className="form-title py-6">Assign Inventory Details</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 items-start">
        <ProjectSelect
          label="Project"
          placeholder="Select Project"
          name="project"
          value={formData.project}
          onChange={(val) => handleChange("project", val)}
          error={errors.project}
        />
        {/* <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <MultiSeclect
          placeholder="Select Project"
          label="Project"
          name="project"
          value={formData.project}
          onChange={(val) => handleChange("project", val)}
          error={errors.project}
          options={ProjectTypes}
        />
        </div> */}
        <BlockSelect
        label="Sector"
          placeholder="Select Sector"
          name="sector"
          value={formData.sector}
          onChange={(val) => handleChange("sector", val)}
          error={errors.sector}
        
        
        />
                {/* <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <MultiSeclect
          label="Sector"
          placeholder="Select Sector"
          name="sector"
          value={formData.sector}
          onChange={(val) => handleChange("sector", val)}
          error={errors.sector}
          options={BlockTypes}
        />
        </div> */}
                <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <MultiSeclect
          label="Inventory Type"
          placeholder="Select type of Inventory"
          name="inventoryType"
          value={formData.inventoryType}
          onChange={(val) => handleChange("inventoryType", val)}
          error={errors.inventoryType}
          options={INVENTORY_TYPES}
        />
        </div>
                <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <MultiSeclect
          label="Floor"
          placeholder="Select Floor"
          name="floor"
          value={formData.floor}
          onChange={(val) => handleChange("floor", val)}
          error={errors.floor}
          options={FloorType}
        />
        </div>

        {/*   
           <MultiSeclect
            placeholder="Select Payment Type"
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={(val) => handleChange("paymentType", val)}
            error={errors.paymentType}
            options={PAYMENT_TYPES}
          /> */}
        {/* <MultiSeclect
            placeholder="Select Inventory"
            label="Inventory"
            name="inventory"
            value={formData.inventory}
            onChange={(val) => handleChange("inventory", val)}
            error={errors.inventory}
            options={Inventories}
          /> */}
                  <div className="col-span-3 sm:col-span-2 lg:col-span-1">

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
</div>
        <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <MultiSeclect
          label="Applicant Type"
          placeholder="Select Applicant Type"
          name="applicantType"
          value={formData.applicantType}
          onChange={(val) => handleChange("applicantType", val)}
          error={errors.applicantType}
          options={Applicant_TYPES}
        />
        </div>
        {formData.applicantType === "self" && (
        <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <Input
          label="Customer"
          placeholder="Select"
          name="customerName"
          value={formData.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
          readOnly={true}
          error={errors.customerName}
        />
        </div>
        )}
        {formData.applicantType === "joint" && (
          <div className="sm:col-span-3">
            <MultiCustomerSelect
              label="Customer"
              name="customer"
              selectedCustomers={formData.customer} 
              onChange={(newValue) => handleChange("customer", newValue)}
                   error={errors.customer}
            />
           
          </div>
        )}

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
                <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <MultiSeclect
          placeholder="Select Payment Type"
          label="Payment Type"
          name="paymentType"
          value={formData.paymentType}
          onChange={(val) => handleChange("paymentType", val)}
          error={errors.paymentType}
          options={PAYMENT_TYPES}
        />
        </div>
        {/* </div> */}

        {/* Selling & Actual Price */}
                <div className="col-span-3 sm:col-span-2 lg:col-span-1">

        <AmountInput
          label="Selling Price"
          name="sellingPrice"
          placeholder="Enter Selling Price"
          value={formData.sellingPrice}
          onChange={(name, val) => handleChange(name, val)}
          error={errors.sellingPrice}
        />
        </div>
        <div className="col-span-3 sm:col-span-2 lg:col-span-3">
          <Textarea
            label="Remarks"
            // formik={formik}
            name="remarks"
            placeholder="Enter Remarks"
            rows={4}
            value={formData.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
            error={errors.remarks}
          />
        </div>
        <div className="col-span-3 sm:col-span-2 lg:col-span-3">
          <AttachmentCapture
            label="Inventory Price Attachment"
            name="attachments"
            value={formData.attachments}
            onChange={(field, val) => handleChange(field, val)}
            error={errors.attachments}
          />
        </div>
        {/* <Input
          label="Selling Price"
          name="sellingPrice"
          placeholder="Enter Selling Price"
          type="text"
          // value={formData.sellingPrice}
          value={formatNumber(formData.sellingPrice)}

          onChange={(e) => handleChange("sellingPrice", parseNumber(e.target.value))}
          error={errors.sellingPrice}
        /> */}
        {/* <Input
          label="Selling Price"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={(e) => handleChange("sellingPrice", e.target.value)}
          error={errors.sellingPrice}
        /> */}
        {/* <Input
          placeholder="Enter Actual Price"
          label="Actual Price"
          name="actualPrice"
          type="text"
          // value={formData.sellingPrice}
          value={formatNumber(formData.actualPrice)}

          onChange={(e) => handleChange("actualPrice", parseNumber(e.target.value))}
          error={errors.actualPrice}
        /> */}

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

        {showConfirmPopup && (
          <ConfirmPricePopup
            sellingPrice={formData.sellingPrice}
            onCancel={() => setShowConfirmPopup(false)}
            onConfirm={handleConfirmSubmit}
            loading={false /* agar loading state hai to yahan use karo */}
          />
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
