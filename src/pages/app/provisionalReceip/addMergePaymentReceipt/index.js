import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";

import Axios from "config/api";
import FormControl from "components/global/form/FormControl";
import PaymentMultiSelect from "components/addPaymentReceipt/PaymentMultiSelect";

// IMPORTANT: use a controlled inventory component like SelectInventory
import InventoryInput from "components/addPaymentReceipt/inventorySelect";
import SelectInventory from "components/paymentReceipt/inputPayment/SelectInventory";
import toast from "react-hot-toast";
import ClearButton from "components/global/form/ClearButton";
import NextButton from "components/global/form/NextButton";
// ^ use the same one you already have working (recommended)

const initValues = {
  inventory: "",
  paymentIds: [],
  notes: "",
};

const AddMergePaymentReceipt = () => {
  const navigate = useNavigate();
  const { createLoading } = useSelector((s) => s.provisionalReceipt || { createLoading: false });

  const [selectedInventory, setSelectedInventory] = useState("");

  const currentPage = 1;
  const limit = 200;
  const status = "approved";

  // ✅ Add console to confirm it changes
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("selectedInventory changed:", selectedInventory);
  }, [selectedInventory]);

  // ✅ Hook will run ONLY when selectedInventory has truthy value
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery(
    ["fetch-approved-payments-receipts", selectedInventory, currentPage, limit, status],
    async () => {
      const url =
        `/payment?pageSize=${limit}&page=${currentPage}` +
        `&status=${encodeURIComponent(status)}` +
        `&inventory=${encodeURIComponent(selectedInventory)}`;

      // eslint-disable-next-line no-console
      console.log("Fetching:", url);

      const res = await Axios.get(url);
      return res;
    },
         {
              refetchOnWindowFocus: false,
              enabled: Boolean(selectedInventory),
              onSuccess: (res) => {
                const {
                  data: {
                    data: { docs, pages, docsCount, page },
                  },
                } = res;
        
                setPaymentDocs(docs || []);
              },
            }
      
    
    
  );

  const [paymentsDocs,setPaymentDocs] = useState( []);


  return (
    <div className="w-full bg-white flex flex-col gap-6 px-3 pt-4 pb-4 rounded-xl shadow-sm">
      <Formik
        initialValues={initValues}
        enableReinitialize={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (!selectedInventory) throw new Error("Inventory is required.");
            if (!values.paymentIds || values.paymentIds.length < 2) {
              throw new Error("Select at least 2 approved payments to merge.");
            }

            const res = await Axios.post("/payment/merge", {
            //   inventory: selectedInventory,
              paymentIds: values.paymentIds,
              mergeNotes: values.notes || "",
            });

            const mergedPaymentId = res?.data?.data?.mergedPaymentId;
            if (!mergedPaymentId) throw new Error("Merged payment id not returned.");

            resetForm();
            setSelectedInventory("");
            navigate(`/digital-receipt/${mergedPaymentId}`);
          } catch (err) {
             toast.error(err?.response?.data?.msg || err.message || "Merge failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <p className="form-title">Merge Payment Receipts</p>

            <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
              {/*  Controlled inventory exactly like your TransferInventoryForm */}
               <SelectInventory
                    onSelect={setSelectedInventory}
                    label="Select Inventory"
                    formik={formik}
                    
                    />
            

              {/* ✅ Multi select payments */}
              <div>
                <PaymentMultiSelect
                  name="paymentIds"
                  label="Approved Payment Receipts"
                  formik={formik}
                  payments={paymentsDocs}
                  isLoading={isLoading || isFetching}
                  isDisabled={!selectedInventory}
                />

                {selectedInventory && isError ? (
                  <p className="text-red-500 text-xs mt-2">
                    {error?.message || "Failed to load payments"}
                  </p>
                ) : null}

                {selectedInventory && !isLoading && paymentsDocs.length === 0 ? (
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-gray-500 text-xs">No approved payments found for this inventory.</p>
                    <button
                      type="button"
                      className="btn-secondary text-xs px-3 py-1"
                      onClick={() => refetch()}
                    >
                      Retry
                    </button>
                  </div>
                ) : null}

                </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <FormControl
                  control="textarea"
                  label="Notes"
                  name="notes"
                  formik={formik}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="px-3 w-full flex justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className=""
                  onClick={() => {
                    formik.resetForm();
                    setSelectedInventory("");
                  }}
                  disabled={formik.isSubmitting}
                >
              <ClearButton/>
                </button>

                <button
                  type="submit"
                  disabled={formik.isSubmitting || createLoading}
                >
                 <NextButton label="Merge & Create Receipt" createLoading={createLoading} isIcon={false}/>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMergePaymentReceipt;