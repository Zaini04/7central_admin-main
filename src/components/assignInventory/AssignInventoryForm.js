import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PAYMENT_TYPES, Applicant_TYPES } from "constants/app.constants.js";
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
import { assign_Inventory } from "redux/actions/inventoryActions";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NextButton from "components/global/form/NextButton";
import CancelButton from "components/global/form/CancelButton";

const AssignInventoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { docExtraDetails, docMultipleDetails } = useSelector(
    (state) => state.customer,
  );
  const { assignInventoryLoading } = useSelector((state) => state.inventory);

  const [formData, setFormData] = useState({
    project: "",
    sector: "",
    inventory: "",
    customer: [],
    applicantType: "",
    paymentType: "",
    sellingPrice: "",
    actualPrice: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    if (field === "applicantType") {
      setFormData((prev) => ({
        ...prev,
        applicantType: value,
        customer: [],
      }));

      if (value === "joint") {
        dispatch(setDocExtraDetails(null));
      }

      if (value === "self") {
        dispatch(resetDocMultipleDetails());
      }
      // Clear previous error
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
    if (!formData.sector) newErrors.sector = "Block is required";
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

    if (formData.actualPrice !== "" && Number(formData.actualPrice) <= 0) {
      newErrors.actualPrice = "Actual Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dispatch(setDocExtraDetails(null));
    dispatch(resetDocMultipleDetails());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Build buyers field
    const buyersValue =
      formData.applicantType === "self"
        ? formData.customer
        : formData.customer?.map((item) => item?._id);

    const payload = {
      inventory: formData.inventory,
      buyers: buyersValue,
      paymentType: formData.paymentType,
      onwershipType: formData.applicantType,
      sellingPrice: formData.sellingPrice,
      ...(formData.actualPrice && { actualPrice: formData.actualPrice }),
    };
    try {
      await dispatch(assign_Inventory(payload, navigate));
      dispatch(setDocExtraDetails(null));
      dispatch(resetDocMultipleDetails());

      // Reset form state
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
      <p className="form-title pt-4">Assign Inventory Details</p>
      <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]" />

      <div className=" mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 ">
        {/* Project & Sector */}
        <ProjectSelect
          label="Select Project"
          placeholder="Select Project"
          name="project"
          value={formData.project}
          onChange={(val) => handleChange("project", val)}
          error={errors.project}
        />
        <BlockSelect
          label="Select Block"
          placeholder="Select Block"
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

        {/* Payment Type */}
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
              selectedCustomers={formData.customer} // array
              onChange={(newValue) => handleChange("customer", newValue)}
              error={errors.customer}
            />
          </div>
        )}

       

        {/* Selling & Actual Price */}
        <Input
          label="Selling Price"
          placeholder="Enter Selling Price"
          name="sellingPrice"
          type="text"
          // value={formData.sellingPrice}
          value={formatNumber(formData.sellingPrice)}
          onChange={(e) =>
            handleChange("sellingPrice", parseNumber(e.target.value))
          }
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
          label="Actual Price"
          placeholder="Enter Actual Price"
          name="actualPrice"
          type="text"
          // value={formData.sellingPrice}
          value={formatNumber(formData.actualPrice)}
          onChange={(e) =>
            handleChange("actualPrice", parseNumber(e.target.value))
          }
          error={errors.actualPrice}
        />
        {/* <Input
          label="Actual Price"
          name="actualPrice"
          type="number"
          // value={formData.actualPrice}
          value={formData.actualPrice}
          onChange={(e) => handleChange("actualPrice", e.target.value)}
          error={errors.actualPrice}
        /> */}

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
      <div className="px-3 w-full flex justify-end">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className=" w-fit"
            onClick={() => {
              navigate("/app/inventory");
            }}
          >
            <CancelButton/>
          </button>
          <button
            type="button"
            className="w-fit"
            disabled={assignInventoryLoading}
            onClick={handleSubmit}
          >
          

            <NextButton label="Assign inventory" createLoading={assignInventoryLoading} isIcon={false}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignInventoryForm;
