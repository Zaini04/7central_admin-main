import React, { useState } from "react";
import { Formik, Form,FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import InstallmentTable   from './InstallmentTable';


const InventoryOptions = [
  "Plan A",
  "Plan B",
  "Plan C",
  "Plan D",
];



const initValues = {
  selectInventory: "",
  installmentCategory: "",
  actualPrice:"",
  sellingPrice:"",
  downPayment:"",
  allocation:"",
  confirmation:"",
  installment:[
    {
        selectInstallment:'',
         SelectInstallmentsDuration:'',
          selectAmount:'',
    }
  ]
 
};
const InstallmentCustomer = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
    
      const InventoryOptions = [
        "Inventory Number"
      ];


   const InstallmentOptions = [
  "3 Months Plan",
  "6 Months Plan",
  "12 Months Plan (1 Year)",
  "18 Months Plan",
  "24 Months Plan (2 Years)",
  "36 Months Plan (3 Years)",
  "48 Months Plan (4 Years)",
  "60 Months Plan (5 Years)",
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
          <h3 className="text-lg font-semibold">Installment Plan</h3>
          <p className="text-sm text-gray-600">
            Create Installment Plan for Customer
          </p>
        </div>

        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {(formik) => (
            <Form className="flex flex-col gap-6">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3 border-b pb-4">
           

                <FormControl
                  control="multiple-option"
                  label="Select Inventory"
                  name="selectInventory"
                  formik={formik}
                  options={InventoryOptions}
                />

                                <FormControl
                    control="multiple-option"
                    label="Select Installment Category"
                    name="installmentPlan"
                    formik={formik}
                    options={InstallmentOptions}
                    />


                 <FormControl
                                 control="input"
                                 type="text"
                                 label="Actual Price"
                                 name="actualPrice"
                                 formik={formik}
                                 autoComplete="off"
                                 autoCapitalize="off"
                                 spellCheck={false}
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
                               />
           
              </div>

           <div className=" flex flex-col gap-6">
            <FieldArray name="installment">
            {({ push }) => (
              <>
                {formik.values.installment.map((_, index) => (
                  <div
                    key={index}
                    className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 px-3 border-b pb-4"
                  >
                    <FormControl
                      control="multiple-option"
                      label="Select Installments"
                      name={`installment[${index}].selectInstallment`}
                      formik={formik}
                      options={InventoryOptions}
                    />
                    <FormControl
                      control="multiple-option"
                      label="Select Installments Duration"
                      name={`installment[${index}].SelectInstallmentsDuration`}
                      formik={formik}
                      options={InventoryOptions}
                    />
                    <FormControl
                control="input"
                                 type="text"                  
                                     label="Amount"
                      name={`installment[${index}].selectAmount`}
                      formik={formik}
                          autoComplete="off"
                                 autoCapitalize="off"
                                 spellCheck={false}
                    />
                  </div>
                ))}

                <div className="flex justify-end w-full px-3">
                  <button
                    type="button"
                    className="btn-primary py-2 sm:px-6 px-6 w-fit flex items-center gap-2"
                    onClick={() =>
                      push({
                        selectInstallment: "",
                        SelectInstallmentsDuration: "",
                        selectAmount: "",
                      })
                    }
                  >
                    <i className="uil uil-plus text-sm sm:text-base md:text-lg"></i>
                    Add More
                  </button>
                </div>
              </>
            )}
          </FieldArray>

           </div>
           

              <div className="px-3 w-full flex justify-start md:justify-end">
                <div className="flex items-center gap-2">
                  <button type="button" className="btn-secondary   text-xs xs:text-sm md:text-base">
                   Preview Installment Plan
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2 sm:px-6 px-6 w-fit text-xs xs:text-sm md:text-bas"
                    disabled={loading}
                  >
                    {loading ? <ClipLoader size={20} /> : "Create Installment Plan"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <InstallmentTable/>

    </div>
  )
}

export default InstallmentCustomer