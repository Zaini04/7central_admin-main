import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import { setProvisionalId } from "redux/slices/provisionalReceiptSlice";
import * as Yup from "yup";
import  {bounce_Provisional}  from  'redux/actions/provisionalReceiptActions'
import { PulseLoader } from "react-spinners";

const BounceProvisnal = ({ setAddBounce }) => {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { provisionalId,bounceLoading } = useSelector((state) => state.provisionalReceipt);



  const initValues = {
    reason: "",
    files: []
  };

  const validationSchema = Yup.object({
    reason: Yup.string()
      .required("Reason is required")
      .min(5, "Reason must be at least 5 characters"),
    
  });

  useClickOutside(mainRef, () => {
    setAddBounce(false);
    dispatch(setProvisionalId(null));
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        ...(values.files && { files: values.files })
      };
      console.log("Submitted Values:", formattedValues);

   dispatch(bounce_Provisional(provisionalId,formattedValues));
     queryClient.invalidateQueries(["fetch-all-ProvisionalReceipt"]);
    dispatch(setProvisionalId(null))
        setAddBounce(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[90%] sm:w-[60%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh] flex flex-col gap-2 popup"
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full py-3 border-b border-black/10 px-5">
          <h2 className="text-md md:text-lg xl:text-xl font-semibold">
            Cheque Dishonored
          </h2>
          <button
            onClick={() => {
              setAddBounce(false);
              dispatch(setProvisionalId(null));
            }}
            className="text-gray-500 h-[30px] w-[30px] rounded-md hover:text-black hover:bg-primary/20 flex items-center justify-center cursor-pointer"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col gap-3 px-5 mt-2 pb-3">
          <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="flex flex-col gap-6">
                <div className="w-full grid grid-cols-1 gap-5">

                  <FormControl
                    control="textarea"
                    type="text"
                    label="Reason"
                    name="reason"
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
                      onClick={() => {
                        setAddBounce(false);
                        dispatch(setProvisionalId(null));
                      }}
                      type="button"
                      className="btn-secondary text-sm xs:text-base w-fit md:w-[148px]"
                    >
                      Cancel
                    </button>
                       <button type="submit" className="btn-primary py-2 xl:px-12 px-6 text-sm xs:text-base w-fit" >
                         
                                              {bounceLoading ? <PulseLoader size={12} color='white' /> : "Add"}
                                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BounceProvisnal;
