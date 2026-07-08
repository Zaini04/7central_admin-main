
import { useState } from "react";
import {forwardRef,useEffect, useImperativeHandle, } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import FormControl from "components/global/form/FormControl";
import inventoryDocumentValidation from "validations/inventoryDocumentValidation";
import { RECORD_TYPES,DOCUMENT_TYPE_MAP } from "constants/app.constants"; 
import Axios from "config/api";
import toast from "react-hot-toast";
import {create_InstallmentPlan} from 'redux/actions/customerActions'
import  {setDocInventoryDocument}   from 'redux/slices/inventorySlice';
import { useQuery,useQueryClient } from 'react-query';
import UploadedTable  from './UploadedTable';
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import ViewDeatilPop  from './viewDeatilPop';
import { PulseLoader } from "react-spinners";
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";



const initValues = {
  name: "",
  type: "",
    attachments: [], 
    attachments_front:[],
       attachments_back:[],
  image: null,
    image_tags: [],
      others:'',
};

const DocumnetInventoryForm = forwardRef((props, ref) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {addInventoryDocument,docInventoryDocument} = useSelector((state) => state.inventory);
        const {createCustomerInventoryInstallmentLoading} = useSelector((state) => state.customer);

const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const inventoryId = searchParams.get("inventory");

  const queryClient = useQueryClient();        

  const [viewDetail,setVeiwDetail]=useState(false);
 

  const { data, isLoading, isError, error } = useQuery(
    ["InventoryDocumnet", inventoryId,currentPage, limit],
    () => Axios(`/document?inventory=${inventoryId}&pageSize=${limit}&page=${currentPage}`)
  );
  const totalPages = data?.data?.data?.pages || 0;
const totalDocs = data?.data?.data?.docsCount || 0;



  useEffect(() => {
    if (!data?.data?.data?.docs) return;
    dispatch(setDocInventoryDocument(data.data.data.docs));
  }, [data, dispatch]);

 let submitFormFn = null;

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (submitFormFn) submitFormFn();
    },
  }));
const handleSubmit = async (values, { resetForm }) => {
  try {
    const { attachments, image,image_tags, attachments_back,attachments_front, type,others, ...rest } = values;
    let finalAttachments = [];

    if (type === "Cnic" && attachments?.length > 0) {
      if (attachments[0]) {
        finalAttachments.push({
         ...(attachments_front?.length > 0 && { tags:attachments_front }),
           fileUrl:attachments[0]
        });
      }

      if (attachments[1]) {
        finalAttachments.push({
        ...(attachments_back?.length > 0 && { tags: attachments_back }),
        
         fileUrl:attachments[1]
        
        });
      }
    }


   if (type !== "Cnic" && image) {

  finalAttachments = [
    {
      ...(image_tags?.length > 0 && { tags: image_tags }),
     fileUrl: image 
      
    }
  ];
}


    const payload = {
      ...rest,
          other:others,
      type: DOCUMENT_TYPE_MAP[type] || type,
      inventory: inventoryId,
      ...(finalAttachments.length > 0 ? { attachments: finalAttachments } : {})
    };


     console.log(' this is a payload',payload)
    await dispatch(create_InstallmentPlan(payload));
    queryClient.invalidateQueries(["InventoryDocumnet"]);
            queryClient.invalidateQueries(["fetch-content-details"]);
    resetForm();

  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to submit document");
  }
};




  return (

    <>
    {viewDetail  &&      <ViewDeatilPop  setVeiwDetail={setVeiwDetail}/>}
       <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5 w-full py-3 px-3">
          <h3 className="text-lg font-semibold py-3">Inventory Documents</h3>
            <hr className="w-[100%] h-[1px]  mx-auto bg-[#9A9A9A]"/>

          
        </div>

        <Formik
          initialValues={initValues}
          validationSchema={inventoryDocumentValidation}
        onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {(formik) => {
    submitFormFn = formik.submitForm;
              return (
            <Form className="flex flex-col gap-6 mt-4">
              <div className=" mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 px-3  pb-4">
                <FormControl
                  control="input"
                  type="text"
                  placeholder="Enter Document Name"
                  label="Document Name"
                  name="name"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />

                <FormControl
                  control="multiple-option"
                  placeholder="Select Document Type"
                  label="Document Type"
                  name="type"
                  formik={formik}
                  options={RECORD_TYPES}
                />

              
               <div className="sm:col-span-2">
              {formik.values.type === "Other" && (
                      <FormControl
                        control="textarea"
                        placeholder="Enter Note"
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
                    className="sm:col-span-2"
                  />
                ) : (
                  <FormControl
                    control="capture-image"
                    label="Document Image"
                    name="image"
                    formik={formik}
                    className="sm:col-span-2"
                  />
                )}
             </div>

             
              </div>

              <div className="px-3 w-full flex justify-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className=""
                    onClick={() => formik.resetForm()}
                  >
                    <CancelButton/>
                  </button>
                 <button
                        type="submit"
                        disabled={createCustomerInventoryInstallmentLoading}
                        className={` w-fit ${
                          createCustomerInventoryInstallmentLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        <NextButton label="Save" createLoading={createCustomerInventoryInstallmentLoading}/>
                      </button>

  

                </div>
              </div>
                                <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>
            </Form>
          )
          }
          }
        </Formik>
      </div>



          <div className="mt-4">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : docInventoryDocument?.length > 0 ? (
          <UploadedTable 
          docs={docInventoryDocument}  
          setVeiwDetail={setVeiwDetail}
         totalPages ={totalPages}
         totalDocs ={totalDocs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
   limit={limit}
    setLimit={setLimit}
             />
        ) : (
          <ItemNotFound message="No documents found" />
        )}
      </div>
    </div>
    </>
   
  );
});

export default DocumnetInventoryForm;
