
import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import userpanelValidations from "validations/userpanelValidations";
import { admin_createDoc}  from 'redux/actions/adminActions'
import { PulseLoader } from "react-spinners";
import ClearButton from "components/global/form/ClearButton";
import NextButton from "components/global/form/NextButton";


const initValues = {
  username: "",
  email: "",
password: "",

};

const AddPanelForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {createLoading} = useSelector((state) => state.admin);
 

  const documentOptions = ["Select Inventory ",];
 

const handleSubmit = async (values, { resetForm }) => {
  try {
    console.log("Submitted Values:", values);
    
    await dispatch(admin_createDoc(values,navigate));

    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div className="w-full bg-white flex flex-col md:flex-row justify-between items-start gap-6 px-3 py-6 rounded-xl shadow-sm">


<div className="w-full md:w-5/12 flex  flex-col justify-start items-start   text-start">
      <h2 className="text-dark1 font-semibold text-start">New User</h2>
      <p className="text-gray-400 font-normal  text-xs text-start w-full">Add new panel user in the system</p>

      </div>

    <Formik
        initialValues={initValues}
        validationSchema={userpanelValidations}
        onSubmit={handleSubmit}
        className='w-full md:w-7/12'
   
      >
        {(formik) => (
   <>
   
          <Form className="flex flex-col gap-6 mt-4 w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 pb-4">
            


            <FormControl
                control="input"
                type="text"
                label="User Name"
                placeholder="Enter User Name"
                name="username"
                formik={formik}
                autoComplete=""
                autoCapitalize=""
                spellCheck={false}
              />

               <FormControl
                control="input"
                type="email"
                label="Email"
                placeholder="Enter Email"
                name="email"
                formik={formik}
                autoComplete=""
                autoCapitalize=""
                spellCheck={false}
              />

                              <FormControl
                                                control='password'
                                                name='password'
                                                formik={formik}
                                                    label='Password'
                                                    placeholder='Enter Password'
                                                          autoComplete="off"
                                            /> 

           
            </div>

            <div className="px-3 w-full flex justify-end">
              <div className="flex items-center gap-2">
                {/* Clear Button */}
                <button
                  type="button"
                  onClick={() => formik.resetForm()}
                >
                  <ClearButton/>
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={createLoading}
                >
             
                           
                                                    <NextButton label="Submit" createLoading={createLoading} isIcon={false}/>
                </button>
              </div>
            </div>
          </Form>
          </>
        )}
        
      </Formik>
    </div>
  );
};

export default AddPanelForm;
