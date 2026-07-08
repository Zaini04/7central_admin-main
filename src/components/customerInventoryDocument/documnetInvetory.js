import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import inventoryDocumentValidation from "validations/inventoryDocumentValidation";
import { RECORD_TYPES,DOCUMENT_TYPE_MAP } from "constants/app.constants"; 
import Axios from "config/api";
import toast from "react-hot-toast";
import {addDocumentInventory} from 'redux/actions/inventoryActions'
import { useQuery,useQueryClient } from 'react-query';
import { useStateWithHistory } from "react-use";


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

const DocumnetInventoryForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const  [loading,setLoading]=useState(false);


const handleSubmit = async (values, { resetForm }) => {
    setLoading(true); 

  try {
    const { attachments, image,image_tags, attachments_back,attachments_front, others,type, ...rest } = values;
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

    // --- Other document types ---
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
      inventory: id,
      ...(finalAttachments.length > 0 ? { attachments: finalAttachments } : {})
    };

    console.log("Final Payload:", payload);



     const {
          data: {
            data: { doc, message },
          },
        } = await Axios.post(`/document/create-inventory-document`, payload);
        toast.success(message);
        const  customerId = doc?.customer;
        resetForm();
    navigate(-1);
    
        setLoading(false);
    // await dispatch(addDocumentInventory(payload));
    resetForm();

  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to submit document");
  }
  finally {
      setLoading(false);
    }
};




  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5 w-full py-3 border-b px-3">
          <h3 className="text-lg font-semibold">Documents</h3>
          <p className="text-sm text-gray-600">
            Upload and categorize your document details
          </p>
        </div>

        <Formik
          initialValues={initValues}
          validationSchema={inventoryDocumentValidation}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {(formik) => (
            <Form className="flex flex-col gap-6">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 px-3 border-b pb-4">
                <FormControl
                  control="input"
                  type="text"
                  label="Document Name"
                  name="name"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />

                <FormControl
                  control="multiple-option"
                  label="Document Type"
                  name="type"
                  formik={formik}
                  options={RECORD_TYPES}
                />


                   <div className="sm:col-span-2">
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
                    className="btn-secondary"
                    onClick={() => formik.resetForm()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2 sm:px-12 px-6 w-fit"
                    disabled={loading}
                  >                                                       
                    {loading ? <PulseLoader size={12} color='white'  /> : "Submit"}
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

export default DocumnetInventoryForm;
