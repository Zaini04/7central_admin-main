import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  PulseLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import InventoriesDetailValidations from "validations/InventoriesDetailValidations";
import {update_details} from 'redux/actions/inventoryActions'
import { useParams } from "react-router-dom";
  import { useQueryClient } from 'react-query';


const InventoryDetailsForm = ({readOnly}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}=useParams();
   const queryClient = useQueryClient();

  const {docDetails,updateLoading } = useSelector((state) => state.inventory);
  console.log('this is   docDetails  insie ',docDetails)

  console.log('readOnly',readOnly)




  const initValues = {
  project: docDetails?.project?.title || "",
  sector: docDetails?.sector?.title || "",
  plotNumber: docDetails?.plotNumber || "",
  number: docDetails?.number || "",
  fullNumber: docDetails?.fullNumber || "",
  street: docDetails?.street || "",
  approximate: docDetails?.approximateSize || "",
  significance: docDetails?.significance || "",

  // Installment Details — pulling from currentSale
  actualPrice: docDetails?.currentSale?.actualPrice || "",
  sellingPrice: docDetails?.currentSale?.sellingPrice || "",
  downPayment: docDetails?.currentSale?.plan?.downPayment || "",
  allocation: docDetails?.currentSale?.plan?.allocation || "",
  confirmation: docDetails?.currentSale?.plan?.confirmation || "",
  onPossession: docDetails?.currentSale?.plan?.possession || "",

  // Customer details
  customerName:
    docDetails?.currentSale?.buyers?.[0]?.name ||
    docDetails?.currentSale?.buyersDisplayName ||
    "",
  phoneNumber: docDetails?.currentSale?.buyers?.[0]?.phoneNumber || "",
  Cnic: docDetails?.currentSale?.buyers?.[0]?.cnic || "",
  email: docDetails?.currentSale?.buyers?.[0]?.email || "",
};
const handleSubmit = async (values, { resetForm }) => {
  try {
    const payload = {
      plotNumber: values.plotNumber,
      number: values.number,
      fullNumber: values.fullNumber,
      street: values.street,
      approximateSize: values.approximate,
      significance: values.significance,

    };

    await dispatch(update_details(id, payload));
    queryClient.invalidateQueries(["single-inventory"]);
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div className="w-full rounded-xl  flex flex-col gap-6 px-3 pb-4 bg-white">
      {/* Header */}

      <Formik
        initialValues={initValues}
        validationSchema={InventoriesDetailValidations}
        onSubmit={handleSubmit}
   
      >
        {(formik) => (
   <>
   
          <Form className="flex flex-col gap-6">

          <div className="flex flex-col gap-5 pt-4 px-3 w-full">
      <p className="form-title py-4 ">Inventory Details</p>
               <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 pb-4">
           
          
              <FormControl
                control="input"
                type="text"
                label="Project"
                name="project"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />
              <FormControl
                control="input"
                type="text"
                label="Sector"
                name="sector"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />  
              <FormControl
                control="input"
                type="text"
                label="Plot Number"
                name="plotNumber"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={readOnly}

              />

                 <FormControl
                control="input"
                type="text"
                label="Number"
                name="number"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={readOnly}

              />


                 <FormControl
                control="input"
                type="text"
                label="Full Number"
                name="fullNumber"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={readOnly}

              />

              
                 <FormControl
                control="input"
                type="text"
                label="Street"
                name="street"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={readOnly}

              />



                <FormControl
                control="input"
                type="text"
                label="Approximate Size (In Square Feet)"
                name="approximate"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={readOnly}

              />


              
                <FormControl
                control="input"
                type="text"
                label="Significance"
                name="significance"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={readOnly}

              />

            </div>

                            <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

          

          </div>
                  <div className="flex flex-col gap-5 pt-4 px-3 w-full">
                <p className="form-title py-4 ">Installment Details</p>
               <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 pb-4 ">        
              <FormControl
                control="input"
                type="text"
                label="Actual Price"
                name="actualPrice"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                  readOnly={true}

              />
              <FormControl
                control="input"
                type="text"
                label="Selling Price"
                name="sellingPrice"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />  
              <FormControl
                control="input"
                type="text"
                label="Down Payment"
                name="downPayment"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />

                 <FormControl
                control="input"
                type="text"
                label="Allocation"
                name="allocation"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />


                 <FormControl
                control="input"
                type="text"
                label="Confirmation"
                name="confirmation"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />

              
                 <FormControl
                control="input"
                type="text"
                label="On Possession"
                name="onPossession"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />




            </div>
                          <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>


          </div>
      
             <div className="flex flex-col gap-5 pt-4 px-3 w-full">
      <p className="form-title  py-4">Current Ownership</p>
               <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 ">
           
          
              <FormControl
                control="input"
                type="text"
                label="Customer Name"
                name="customerName"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                                  readOnly={true}

              />
              <FormControl
                control="input"
                type="text"
                label="Phone Number"
                name="phoneNumber"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              readOnly={true}

              />  
            
                 <FormControl
                control="input"
                type="text"
                label="CNIC"
                name="Cnic"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                  readOnly={true}
              />

                <FormControl
                control="input"
                type="email"
                label="Email"
                name="email"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                readOnly={true}

              />


                 




            </div>
          

          </div>

            <div className="px-3 w-full flex justify-center">
              <div className="flex items-center gap-2">
                {/* Clear Button */}
            
                {/* Submit Button */}
               {/* <button
  type="submit"
  className="btn-primary py-2 xl:px-12 px-6 text-sm xs:text-base w-fit"
  disabled={readOnly || updateLoading} 
>
  {updateLoading ? <PulseLoader size={12} color='white' /> : "Update Inventory"}
</button> */}

              </div>
            </div>
          </Form>
          </>
        )}
        
      </Formik>
    </div>
  );
};

export default InventoryDetailsForm;
