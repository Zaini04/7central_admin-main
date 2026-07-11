
import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import passwordValidations from "validations/passwordValidations";
import { PulseLoader } from "react-spinners";
import {updateUserPassword} from  'redux/actions/authActions'
import ClearButton from "components/global/form/ClearButton";
import NextButton from "components/global/form/NextButton";

const initValues = {
oldPassword:'',
newPassword: "",
confrimPassword: "",

};

const SettingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

     const { updatePassword} = useSelector(state => state.user);

  // const documentOptions = ["Select Inventory ",];
 

const handleSubmit = async (values, { resetForm }) => {
  try {
    console.log("Submitted Values:", values);

    const data = {
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confrimPassword,
    };


        // console.log("Submitted api Values:", values);

    await dispatch(updateUserPassword(data, navigate));

    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div className="w-full bg-white flex flex-col md:flex-row justify-between gap-6 px-3 py-6 rounded-xl shadow-sm">


<div className="w-full md:w-5/12 flex  flex-col justify-start items-start   text-start">
      <h2 className="text-dark1 font-semibold text-start">Update Password</h2>
      <p className="text-gray-400 font-normal  text-xs text-start w-full">Change your current Password</p>

      </div>
    <Formik
        initialValues={initValues}
        validationSchema={passwordValidations}
        onSubmit={handleSubmit}
        className="w-full md:w-7/12"
   
      >
        {(formik) => (
   <>
    

   
          <Form className="flex flex-col gap-6 w-full">
            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10  pb-4">
                                     <FormControl
                                                control='password'
                                                name='oldPassword'
                                                formik={formik}
                                                    label=' Old Password'
                                                    placeholder='Enter Old Password'
                                                          autoComplete="off"
                                            /> 
                                  
                                      

          
                                         <FormControl
                                                control='password'
                                                name='newPassword'
                                                formik={formik}
                                                    label='New Password'
                                                    placeholder='Enter New Password'
                                                          autoComplete="off"
                                            />   
                                            
                                            
                                             <FormControl
                                                control='password'
                                                name='confrimPassword'
                                                formik={formik}
                                                    label='Confirm Password'
                                                    placeholder='Enter Confirm Password'
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
                  disabled={updatePassword}
                >
                  <NextButton label="Change Password" createLoading={updatePassword} isIcon={false}/>
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

export default SettingForm;
