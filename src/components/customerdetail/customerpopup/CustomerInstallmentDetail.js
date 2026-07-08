import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { setCustomerDocumnet } from "redux/slices/customerSlice";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";

const CustomerInstallmentDetail = ({ setInstallmentsDetail }) => {
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const { customerInstallmentsDetail } = useSelector(
    (state) => state.customer
  );


 console.log(' this is a customerInstallmentsDetail',customerInstallmentsDetail)

  const initValues = {
    // Installment details
    documentType: customerInstallmentsDetail?.type || "",
    seq: customerInstallmentsDetail?.seq || "",
    dueDate: customerInstallmentsDetail?.dueDate?.slice(0, 10) || "",
    amount: customerInstallmentsDetail?.amount || "",
    status: customerInstallmentsDetail?.status || "",

    // Plan details
    downPayment: customerInstallmentsDetail?.plan?.downPayment || "",
    allocation: customerInstallmentsDetail?.plan?.allocation || "",
    confirmation: customerInstallmentsDetail?.plan?.confirmation || "",
    possession: customerInstallmentsDetail?.plan?.possession || "",
    totalScheduled: customerInstallmentsDetail?.plan?.totalScheduled || "",
    category: customerInstallmentsDetail?.plan?.category || "",
    currency: customerInstallmentsDetail?.plan?.currency || "",



  quarterlyAmount: customerInstallmentsDetail?.plan?.quarterly?.amount|| "",
    quarterlyDuration: customerInstallmentsDetail?.plan?.quarterly?.duration || "",
    quarterlyCount: customerInstallmentsDetail?.plan?.quarterly?.count || "",

    // Monthly plan
    monthlyAmount: customerInstallmentsDetail?.plan?.monthly?.amount || "",
    monthlyDuration: customerInstallmentsDetail?.plan?.monthly?.duration || "",
    monthlyCount: customerInstallmentsDetail?.plan?.monthly?.count || "",

    // Balloon plan
    balloonAmount: customerInstallmentsDetail?.plan?.balloon?.amount || "",
    balloonDuration: customerInstallmentsDetail?.plan?.balloon?.duration || "",
    balloonCount: customerInstallmentsDetail?.plan?.balloon?.count || "",

    // Sale details
    buyerName: customerInstallmentsDetail?.sale?.buyersDisplayName || "",
    sellingPrice: customerInstallmentsDetail?.sale?.sellingPrice || "",
    actualPrice: customerInstallmentsDetail?.sale?.actualPrice || "",

    // Inventory details
    plotNumber: customerInstallmentsDetail?.inventory?.plotNumber || "",
    street: customerInstallmentsDetail?.inventory?.street || "",
    approximateSize: customerInstallmentsDetail?.inventory?.approximateSize || "",
  };

  // Close popup on outside click
  useClickOutside(mainRef, () => {
    setInstallmentsDetail(false);
    dispatch(setCustomerDocumnet(null));
  });

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[95%] sm:w-[70%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full py-3 border-b px-5">
          <h2 className="text-lg font-semibold">Installment Details</h2>

          <button
            onClick={() => {
              setInstallmentsDetail(false);
              dispatch(setCustomerDocumnet(null));
            }}
            className="text-gray-500 h-[30px] w-[30px] rounded-md 
                       hover:text-black hover:bg-primary/20 flex 
                       items-center justify-center"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        <div className="p-4">
          <Formik initialValues={initValues} enableReinitialize>
            {(formik) => (
              <Form className="flex flex-col gap-6">

                <h3 className="text-[17px] font-semibold">Installment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                  <FormControl control="input" label="Document Type" name="documentType" disabled formik={formik} />
                  <FormControl control="input" label="Sequence" name="seq" disabled formik={formik} />
                  <FormControl control="input" type="date" label="Due Date" name="dueDate" disabled formik={formik} />

                  <FormControl control="input" label="Amount" name="amount" disabled formik={formik} />
                  <FormControl control="input" label="Status" name="status" disabled formik={formik} />
                </div>

                <h3 className="text-[17px] font-semibold">Plan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormControl control="input" label="Category" name="category" disabled formik={formik} />
                  <FormControl control="input" label="Currency" name="currency" disabled formik={formik} />
                  <FormControl control="input" label="Total Scheduled" name="totalScheduled" disabled formik={formik} />

                  <FormControl control="input" label="Down Payment" name="downPayment" disabled formik={formik} />
                  <FormControl control="input" label="Allocation" name="allocation" disabled formik={formik} />
                  <FormControl control="input" label="Confirmation" name="confirmation" disabled formik={formik} />
                  <FormControl control="input" label="Possession" name="possession" disabled formik={formik} />
                </div>

                {/* Monthly */}


                {
            customerInstallmentsDetail?.plan?.quarterly?.amount&&(
                        <>
                             <h4 className="text-[17px] font-semibold">Quarterly Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormControl control="input" label="Quarterly Amount" name="quarterlyAmount" disabled formik={formik} />
                  <FormControl control="input" label="Quarterly Duration" name="quarterlyDuration" disabled formik={formik} />
                  <FormControl control="input" label="Quarterly Count" name="quarterlyCount" disabled formik={formik} />
                </div>
                        </>
            )
                }

                {
                    customerInstallmentsDetail?.plan?.monthly?.amount   &&(
                        <>
                             <h4 className="text-md font-semibold pl-1">Monthly Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormControl control="input" label="Monthly Amount" name="monthlyAmount" disabled formik={formik} />
                  <FormControl control="input" label="Monthly Duration" name="monthlyDuration" disabled formik={formik} />
                  <FormControl control="input" label="Monthly Count" name="monthlyCount" disabled formik={formik} />
                </div>
                        </>
                  
                    )   
                }
                

                {/* Balloon */}

                {
                    customerInstallmentsDetail?.plan?.balloon?.amount    &&(
  <>
  <h4 className="text-[17px] font-semibold">Balloon Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormControl control="input" label="Balloon Amount" name="balloonAmount" disabled formik={formik} />
                  <FormControl control="input" label="Balloon Duration" name="balloonDuration" disabled formik={formik} />
                  <FormControl control="input" label="Balloon Count" name="balloonCount" disabled formik={formik} />
                </div>
                </>
                    )
                }
              

                {/* ===================== Sale Section ===================== */}
                <h3 className="text-[17px] font-semibold">Sale Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormControl control="input" label="Buyer Name" name="buyerName" disabled formik={formik} />
                  <FormControl control="input" label="Selling Price" name="sellingPrice" disabled formik={formik} />
                  <FormControl control="input" label="Actual Price" name="actualPrice" disabled formik={formik} />
                </div>

                {/* ===================== Inventory Section ===================== */}
                <h3 className="text-[17px]  font-semibold">Inventory Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormControl control="input" label="Plot Number" name="plotNumber" disabled formik={formik} />
                  <FormControl control="input" label="Street" name="street" disabled formik={formik} />
                  <FormControl control="input" label="Approximate Size" name="approximateSize" disabled formik={formik} />
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CustomerInstallmentDetail;
