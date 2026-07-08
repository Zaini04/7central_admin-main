

import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import { useDispatch,useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import InventoryCustomertable  from './InventoryCustomertable';



const initValues = {
 projectName: "",
  sector: "",
  fullNumber: "",
  street:"",
  sizeIn:"",
  significance:"",
  floor:"",
  tower:"",
};

const InventoryCustomer = () => {





      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
    
   const documentOptions = [
  "My Project", 
];

   const SectorOptions = [
  "Health Insurance",
  "Life Insurance",
  "Motor Insurance",
  "Travel Insurance",
  "Corporate Clients",
  "Hospital Network Management",
  "Claims Processing",
  "Employee Benefits Administration",
  "Medical Billing",
  "Third Party Administration (TPA)",
  "Wellness Programs",
  "Policy Management",
  "Reinsurance Support",
];

const FullNumberOptions = [
  "TP-CB-4.04M-29",
  "TP-CB-4.04M-30",
  "TP-CB-4.05M-10",
  "TP-CB-4.06M-22",
  "TP-CB-4.07M-15",
  "TP-CB-4.08M-19",
];

    
      const handleSubmit = async (values, { resetForm }) => {
        try {
          setLoading(true);
          console.log("Submitted Values:", values);
          resetForm();
        } catch (error) {
          console.error("Error submitting form:", error);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5 w-full py-3 border-b px-3">
          <h3 className="text-lg font-semibold">Assign Inventory</h3>
          <p className="text-sm text-gray-600">
Assign Inventory to Customer
          </p>
        </div>

        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {(formik) => (
            <Form className="flex flex-col gap-6">
               <p className=" text-gunmetal  font-semibold  px-3">Inventory Details</p>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 px-3 border-b pb-4">
               
                <FormControl
                  control="multiple-option"
                  label="Project Name"
                  name="projectName"
                  formik={formik}
                  options={documentOptions}
                />


           <FormControl
                  control="multiple-option"
                  label="Sector"
                  name="sector"
                  formik={formik}
                  options={SectorOptions}
                />

                 <FormControl
                  control="multiple-option"
                  label="Full Number"
                  name="fullNumber"
                  formik={formik}
                  options={FullNumberOptions}
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
                />
             

              <FormControl
                  control="input"
                  type="text"
                  label="Approximate Size (In Square Feet)"
                  name="sizeIn"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
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
                />


                   <FormControl
                  control="input"
                  type="text"
                  label="Floor"
                  name="floor"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />


                   <FormControl
                  control="input"
                  type="text"
                  label="Tower"
                  name="tower"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </div>

              <div className="px-3 w-full flex justify-end">
                <div className="flex items-center gap-2">
                  <button type="button" className="btn-secondary   text-sm sm:text-base ">
                       Skip
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2 sm:px-6 px-6 w-fit  text-sm sm:text-base "
                    disabled={loading}
                  >
                    {loading ? <ClipLoader size={20} /> : "Assign to Customer"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <InventoryCustomertable/>

    </div>
  )
}

export default InventoryCustomer