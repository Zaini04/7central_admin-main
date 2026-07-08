import { useEffect, useState } from "react";
import { Formik, Form, FieldArray, getIn } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import { pay_inventory } from "redux/actions/inventoryActions";
import MultiSelect from "./inputinstallment/MultiSelect";
import InputDate from "./inputinstallment/inputDate";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import SelectInventory from "./inputinstallment/SelectInventory";
import { useLocation } from "react-router-dom";
import SingleInventoryCard from "./inputinstallment/SingleInventoryCard";
import { setDocinventoryExtraDetails } from "redux/slices/inventorySlice";
import BlockSelect from "./inputinstallment/BlockSelect";
import ProjectSelect from "./inputinstallment/ProjectSelect";
import { setDoc } from "redux/slices/inventorySlice";
import Axios from "config/api";
import { useQuery } from "react-query";
import ClearButton from "components/global/form/ClearButton";
import NextButton from "components/global/form/NextButton";

const validationSchema = Yup.object().shape({
  mainAmount: Yup.number()
    .required("Total Amount is required")
    .min(1, "Total Amount must be greater than 0"),

  // receiptNo: Yup.number()
  //   .required("Receipt No is required"),

  project: Yup.string().when([], {
    is: () => window.location.pathname.includes("/inventory/bulk/"),
    then: (schema) => schema.required("Project is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  sector: Yup.string().when([], {
    is: () => window.location.pathname.includes("/inventory/bulk/"),
    then: (schema) => schema.required("Sector is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  parts: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.number()
          .required("Amount is required")
          .min(1, "Amount must be greater than 0"),

        paidAt: Yup.date().required("Paid date is required"),

        reference: Yup.string().nullable(),
      }),
    )
    .min(1, "At least one payment method is required"),

  notes: Yup.string().nullable(),
  files: Yup.array(),
});

const initValues = {
  mainAmount: 1,
  project: "",
  sector: "",
  receiptNo: "",
  parts: [],
  notes: "",
  files: [],
  selectedInventory: null,
};

const PayInventoryForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const { doc } = useSelector((state) => state.inventory);
  //  console.log('docInventory  docInventory',doc)

  const isBulkInventory = location.pathname.includes("/inventory/bulk/");
  useEffect(() => {
    if (isBulkInventory) {
      dispatch(setDocinventoryExtraDetails(null));
      dispatch(setDoc(null));
    }
  }, [isBulkInventory, dispatch]);

  const { payInvetoryLoading, docinventoryExtraDetails } = useSelector(
    (state) => state.inventory,
  );

  const validateForm = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors = {};

      err.inner.forEach((e) => {
        errors[e.path] = e.message;
        toast.error(e.message);
      });

      return errors;
    }
  };

  const { data, isLoadingInventory, isErrorInventory } = useQuery(
    ["single-inventory", id],
    () => Axios(`/inventory/${id}`),
  );

  useEffect(() => {
    const d = data?.data?.data?.doc;
    if (!d) return;
    dispatch(setDoc(d));
  }, [data, dispatch]);

  const formatDate = (date) => {
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // const distributeAmounts = (selectedMethods, mainAmount, currentParts = []) => {
  //   if (!mainAmount || selectedMethods.length === 0) return [];

  //   const amountPerMethod = (parseFloat(mainAmount) / selectedMethods.length).toFixed(2);

  //   return selectedMethods.map(method => {
  //     const existingPart = currentParts.find(part => part.method === method);

  //     return {
  //       method: method,
  //       amount: amountPerMethod,
  //       paidAt: existingPart ? existingPart.paidAt : "",
  //       reference: existingPart ? existingPart.reference : "",
  //     };
  //   });
  // };

  // SELECT METHOD
  const handleMethodSelect = (selectedMethod, formik) => {
    const exists = formik.values.parts.some(
      (p) => p.method === selectedMethod.value,
    );

    if (!exists) {
      const newPart = {
        method: selectedMethod.value,
        amount: "",
        paidAt: "",
        reference: "",
      };
      formik.setFieldValue("parts", [...formik.values.parts, newPart]);
    }
  };

  const handleMethodRemove = (removedMethod, formik) => {
    const filteredParts = formik.values.parts.filter(
      (p) => p.method !== removedMethod.value,
    );
    formik.setFieldValue("parts", filteredParts);
  };

  const handleMainAmountChange = (e, formik) => {
    formik.handleChange(e);
  };

  // const handleMethodRemove = (removedMethod, formik) => {
  //   const newMethods = formik.values.parts
  //     .map(p => p.method)
  //     .filter(method => method !== removedMethod.value);

  //   const filteredParts = formik.values.parts.filter(p => p.method !== removedMethod.value);

  //   const distributedParts = distributeAmounts(
  //     newMethods,
  //     formik.values.mainAmount,
  //     filteredParts
  //   );

  //   formik.setFieldValue("parts", distributedParts);
  // };

  // const handleMainAmountChange = (e, formik) => {
  //   formik.handleChange(e);

  //   if (formik.values.parts.length > 0) {
  //     const mainAmount = e.target.value;
  //     const selectedMethods = formik.values.parts.map(part => part.method);
  //     const distributedParts = distributeAmounts(
  //       selectedMethods,
  //       mainAmount,
  //       formik.values.parts
  //     );
  //     formik.setFieldValue("parts", distributedParts);
  //   }
  // };
  const handleInventorySelect = (inventory, formik) => {
    formik.setFieldValue("selectedInventory", inventory);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const errors = await validateForm(values);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      let inventoryId;
      if (isBulkInventory) {
        inventoryId = values.selectedInventory?._id;
      } else {
        inventoryId = id;
      }

      if (!inventoryId) {
        toast.error("Inventory ID is required");
        return;
      }

      const formattedValues = {
        inventory: inventoryId,
        receiptNo: values?.receiptNo?.toString() || "",
        totalAmount: Number(values?.mainAmount),
        parts: values.parts.map((p) => ({
          method: p.method,
          amount: Number(p.amount),
          paidAt: formatDate(p.paidAt),
          reference: p.reference || "",
        })),
        notes: values.notes || "",
        files: values.files || [],
      };

      console.log("Submitted Values:", formattedValues);
      dispatch(pay_inventory(formattedValues, navigate));
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong while submitting");
    }
  };

  const paymentOptions = [
    { label: "Online Transfer", value: "online_transfer" },
    { label: "Cheque", value: "cheque" },
    { label: "Cheque1", value: "cheque1" },
    { label: "Cheque2", value: "cheque2" },
    { label: "Cheque3", value: "cheque3" },
    { label: "Pay Order", value: "pay_order" },
    { label: "Cash", value: "cash" },
    { label: "Other", value: "other" },
  ];

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
    <div className="w-full flex flex-col gap-6 px-3 pb-4">
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 px-3 w-full">
              <p className="form-title">Pay Inventory </p>
              <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]" />

              <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {isBulkInventory && (
                  <>
                    <ProjectSelect
                      placeholder="Select Project"
                      label="Select Project"
                      name="project"
                      formik={formik}
                    />

                    <BlockSelect
                      placeholder="Select Sector"
                      label="Select Sector"
                      name="sector"
                      formik={formik}
                    />
                    <SelectInventory
                      label="Select Inventory"
                      placeholder="Select Inventory"
                      project={formik.values.project}
                      sector={formik.values.sector}
                      value={formik.values.selectedInventory}
                      onSelect={(inventory) =>
                        handleInventorySelect(inventory, formik)
                      }
                      error={
                        formik.errors.selectedInventory &&
                        formik.touched.selectedInventory
                          ? formik.errors.selectedInventory
                          : null
                      }
                      disabled={!formik.values.project || !formik.values.sector}
                    />
                  </>
                )}

                <FormControl
                  control="input"
                  type="number"
                  label="Total Amount to Pay"
                  placeholder="Total Amount to Pay"
                  name="mainAmount"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  onChange={(e) => handleMainAmountChange(e, formik)}
                />

                <FormControl
                  control="input"
                  type="text"
                  placeholder="Enter Receipt No"
                  label="Receipt No"
                  name="receiptNo"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />

                <MultiSelect
                  label="Payment Method"
                  placeholder="Select Payment Method"
                  name="parts"
                  formik={formik}
                  options={paymentOptions}
                  onSelect={(selectedMethod) =>
                    handleMethodSelect(selectedMethod, formik)
                  }
                  onRemove={(removedMethod) =>
                    handleMethodRemove(removedMethod, formik)
                  }
                />

              </div>
                                              <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

              {formik.values.parts?.map((part, index) => (
                <div
                  key={index}
                  className=" mt-10 mb-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 "
                >
                  <FormControl
                    control="input"
                    type="text"
                    label="Paid By"
                    name={`parts[${index}].method`}
                    formik={formik}
                    value={getIn(formik.values, `parts[${index}].method`)}
                    onChange={formik.handleChange}
                    readOnly
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Reference #"
                    placeholder="Enter Reference #"
                    name={`parts[${index}].reference`}
                    formik={formik}
                    value={getIn(formik.values, `parts[${index}].reference`)}
                    onChange={formik.handleChange}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    inputMode="decimal"
                    label="Paid Amount"
                    placeholder="Enter Paid Amount"
                    name={`parts[${index}].amount`}
                    formik={formik}
                    value={formatNumber(
                      getIn(formik.values, `parts[${index}].amount`),
                    )}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `parts[${index}].amount`,
                        parseNumber(e.target.value),
                      )
                    }
                    onBlur={formik.handleBlur}
                    step="0.01"
                  />
                  {/* <FormControl
                    control="input"
                    type="number"
                    label="Paid Amount"
                    name={`parts[${index}].amount`}
                    formik={formik}
                    value={getIn(formik.values, `parts[${index}].amount`)}
                    onChange={formik.handleChange}
                    step="0.01"
                  /> */}
                  <InputDate
                    label="Paid Date"
                    placeholder="Select Paid Date"

                    name={`parts[${index}].paidAt`}
                    formik={formik}
                    // value={getIn(formik.values, `parts[${index}].paidAt`)}
                    onChange={formik.handleChange}
                  />
                </div>
              ))}

              {doc && (
                <div className="sm:col-span-2 mb-4">
                  <SingleInventoryCard data={doc} />
                </div>
              )}

              {docinventoryExtraDetails && isBulkInventory && (
                <div className="sm:col-span-2 mb-4">
                  <SingleInventoryCard data={docinventoryExtraDetails} />
                </div>
              )}

              <FormControl
                control="textarea"
                type="text"
                label="Notes"
                placeholder="Enter Notes..."
                name="notes"
                formik={formik}
              />
              <FormControl
                control="multi-file-base64"
                label="Add Files (Optional)"
                name="files"
                formik={formik}
              />
            </div>

            {/* Buttons */}
            <div className="px-3 w-full flex justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-fit "
                  onClick={() => formik.resetForm()}
                >
                  <ClearButton/>
                </button>
                <button
                  type="submit"
                  className=" w-fit"
                  disabled={payInvetoryLoading}
                >
                 <NextButton label="Submit" createLoading={payInvetoryLoading} isIcon={false}/>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PayInventoryForm;
