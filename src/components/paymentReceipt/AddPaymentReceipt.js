import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import { setPaymentId } from "redux/slices/paymentReceiptSlice";
import * as Yup from "yup";
import  {verify_Payment}  from  'redux/actions/paymentReceiptActions'
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";


const AddPaymentReceipt = () => {
  const mainRef = useRef(null);

const {id}=useParams();

const navigate=useNavigate();
console.log('this is a  id',id)
  const dispatch = useDispatch();
  const { patchLoading } = useSelector((state) => state.paymentReceipt);

  // console.log('this is  paymentId',paymentId)


  const initValues = {
  
    approve:"",
    notes: "",
    files: []
  };

  // const validationSchema = Yup.object({
  //   reason: Yup.string()
  //     .required("notes is required")
  //     .min(5, "notes must be at least 5 characters"),
    
  // });



const handleSubmit = async (values, { resetForm }) => {
  try {
    const formattedValues = {
      payment: id,
      approve: values.approve === "Approve",
      ...(values.files && { files: values.files }),
      ...(values.notes && { notes: values.notes }),
    };


//  console.log(' this isa a formattedValues',formattedValues)

    await dispatch(verify_Payment(formattedValues,navigate));


   
    resetForm();

  } catch (error) {
    console.error("Error submitting form:", error);
  }
};



  return (
 

       <div
        ref={mainRef}
        className="bg-white   w-full rounded-xl py-3 relative  flex flex-col gap-2 "
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full py-3  border-black/10 px-5">
          <h2 className="text-md md:text-lg xl:text-xl font-semibold">
            Payment Verify
          </h2>
     
        </div>

        {/* Form */}
        <div className="mt-4 w-full flex flex-col gap-x-5 gap-y-10 px-5  pb-4">
          <Formik
            initialValues={initValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="flex flex-col gap-6">
                <div className="w-full grid grid-cols-1 gap-x-5 gap-y-10">
                      

                     <FormControl
                    control="multiple-option"
               label="Approve Payment"
               placeholder="Select Payment Approve"
                    name="approve"
                    formik={formik}
                    options={['Approve','Rejected']}
                  />


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
                    minWidth={800}
                    minHeight={600}
                  />
                </div>

                <div className="px-3 w-full flex justify-end">
                  <div className="flex items-center gap-2">
                    <button
                  
                      type="button"
                      className="w-fit"
                    >
                      <CancelButton/>
                    </button>

                        <button disabled={patchLoading} type="submit" className="w-fit" >
                         <NextButton label="Submit" createLoading={patchLoading} isIcon={false}/>

                                    </button>
                     
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default AddPaymentReceipt;
