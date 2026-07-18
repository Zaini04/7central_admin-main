import React, { useState, useEffect,useRef, forwardRef, useImperativeHandle } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import inventoryDocumentValidation from "validations/inventoryDocumentValidation";
import UploadedTable from './UploadedTable';
import { RECORD_TYPES, DOCUMENT_TYPE_MAP } from "constants/app.constants";
import { setDocCustomerDocumnet } from "redux/slices/customerSlice";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import { customer_documnet } from "redux/actions/customerActions";
import { useQuery,useQueryClient } from 'react-query';
import { useSelector, useDispatch } from "react-redux";
import Axios from "config/api";
// import toast from "react-hot-toast";
import ViewDeatilPop  from './viewDeatilPop';
import NextButton from "components/global/form/NextButton";
import CancelButton from "components/global/form/CancelButton";
import { FaCheck } from "react-icons/fa";




const initValues = {
  name: "",
  type: "",
  attachments: [],
  attachments_front: [],
  attachments_back: [],
  image: null,
  image_tags: [],
  others:'',
};

const DocumnetCustomerForm = forwardRef((props, ref) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const queryClient = useQueryClient();               
    const navigationRef = useRef(false);  
  const { docCustomerDocumnet, createCustomerDocumnetLoading } = useSelector(
    (state) => state.customer
  );

 const [viewDetail,setVeiwDetail]=useState(false);
  

const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);




  const { data, isLoading, isError, error } = useQuery(
    ["customerDocumnet", id,currentPage, limit,],
    () => Axios(`/document?customer=${id}&pageSize=${limit}&page=${currentPage}`)
  );

const totalPages = data?.data?.data?.pages || 0;
const totalDocs = data?.data?.data?.docsCount || 0;




  useEffect(() => {
    if (!data?.data?.data?.docs) return;
    dispatch(setDocCustomerDocumnet(data.data.data.docs));
  }, [data, dispatch]);


  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { attachments, image, image_tags, attachments_back, attachments_front, type,  others, ...rest } = values;

      let finalAttachments = [];

      if (type === "Cnic" && attachments?.length > 0) {
        if (attachments[0]) {
          finalAttachments.push({
            ...(attachments_front?.length > 0 && { tags: attachments_front }),
            fileUrl: attachments[0],
          });
        }

        if (attachments[1]) {
          finalAttachments.push({
            ...(attachments_back?.length > 0 && { tags: attachments_back }),
            fileUrl: attachments[1],
          });
        }
      }

      if (type !== "Cnic" && image) {
        finalAttachments = [
          {
            ...(image_tags?.length > 0 && { tags: image_tags }),
            fileUrl: image,
          },
        ];
      }

      const payload = {
        ...rest,
        other:others,
        type: DOCUMENT_TYPE_MAP[type] || type,
        customer: id,
        ...(finalAttachments.length > 0 ? { attachments: finalAttachments } : {}),
      };

      console.log("Final Payload:", payload);
           await dispatch(customer_documnet(payload));
        queryClient.invalidateQueries(["customerDocumnet"]);
         queryClient.invalidateQueries(["fetch-content-details"]);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (


    <>

       {viewDetail  &&      <ViewDeatilPop  setVeiwDetail={setVeiwDetail}/>}

   <div className="flex flex-col gap-2">

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5 w-full py-3 px-3">
          <h3 className="text-lg font-semibold">Documents</h3>
          
        </div>


        <Formik
          initialValues={initValues}
          validationSchema={inventoryDocumentValidation}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {(formik) => {
            {/* submitFormFn = formik.submitForm; */}

            return (
              <Form className="flex flex-col gap-6 mt-4">

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 px-3 border-b pb-4">
                  <FormControl
                    control="input"
                    type="text"
                    label="Document Name"
                    placeholder="Enter Document Name"
                    name="name"
                    formik={formik}
                  />

                  <FormControl
                    control="multiple-option"
                    label="Document Type"
                    placeholder="Select Document Type"
                    name="type"
                    formik={formik}
                    options={RECORD_TYPES}
                  />
                          <div className="sm:col-span-2 ">
                              {formik.values.type === "Other" && (
                      <FormControl
                        control="textarea"
                        label="Note"
                        name="others"
                        formik={formik}
                      />
                              )}
                          </div>

                  <div className="sm:col-span-2">
                    {formik.values.type === "Cnic" ? (
                      <FormControl
                        control="frontBack-file"
                        label="Front Back"
                        name="attachments"
                        formik={formik}
                      />
                    ) : (
                      <FormControl
                        control="capture-image"
                        label="Document Image"
                        name="image"
                        formik={formik}
                      />
                    )}
                  </div>
                </div>

                <div className="px-3 w-full flex justify-end">
                  <div className="flex items-center gap-2">
                    <button 
                       onClick={() => formik.resetForm()}
                    type="button"
                     className="">
                      <CancelButton/>
                     </button>

                      <button
                        type="submit"
                        disabled={createCustomerDocumnetLoading}
                        className={` w-fit ${
                          createCustomerDocumnetLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                       <NextButton label="Save" createLoading={createCustomerDocumnetLoading} isIcon={false} />
                      </button>

                  </div>
                </div>

              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="flex gap-x-10 gap-y-3 flex-wrap w-[98%] mx-auto mt-4">
        {RECORD_TYPES.map((typeLabel, i) => {
          const mappedValue = DOCUMENT_TYPE_MAP[typeLabel] || typeLabel;
          const isUploaded = docCustomerDocumnet?.some(
            (doc) => doc.type === mappedValue
          );
      
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  isUploaded
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isUploaded && <FaCheck className="text-white text-[9px]" />}
              </span>
              <span
                className={`text-sm ${
                  isUploaded ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {typeLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : docCustomerDocumnet?.length > 0 ? (
          <UploadedTable docs={docCustomerDocumnet}  
         totalPages={totalPages}
    totalDocs ={totalDocs}


   currentPage={currentPage}
   limit={limit}
    setCurrentPage={setCurrentPage}
    setLimit={setLimit}
            setVeiwDetail={setVeiwDetail}/>
        ) : (
          <ItemNotFound message="No documents found" />
        )}
      </div>

    </div>


    </>
 
  );
});

export default DocumnetCustomerForm;
