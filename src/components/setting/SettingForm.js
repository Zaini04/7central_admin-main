
import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import passwordValidations from "validations/passwordValidations";
import { PulseLoader } from "react-spinners";
import {updateUserPassword} from  'redux/actions/authActions'

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
    <div className="w-full bg-white flex flex-col gap-6 px-3 py-6 rounded-xl shadow-sm">


    <Formik
        initialValues={initValues}
        validationSchema={passwordValidations}
        onSubmit={handleSubmit}
   
      >
        {(formik) => (
   <>
   
          <Form className="flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                                   <div className="sm:col-span-2">
                                     <FormControl
                                                control='password'
                                                name='oldPassword'
                                                formik={formik}
                                                    label=' Old Password'
                                                          autoComplete="off"
                                            /> 
                                   </div>
                                      

          
                                         <FormControl
                                                control='password'
                                                name='newPassword'
                                                formik={formik}
                                                    label='New Password'
                                                          autoComplete="off"
                                            />   
                                            
                                            
                                             <FormControl
                                                control='password'
                                                name='confrimPassword'
                                                formik={formik}
                                                    label='Confirm Password'
                                                          autoComplete="off"
                                            />
          

           
            </div>

            <div className="px-3 w-full flex justify-center">
              <div className="flex items-center gap-2">
                {/* Clear Button */}
                <button
                  type="button"
                  className="btn-secondary text-sm xs:text-base w-fit md:w-[148px]"
                  onClick={() => formik.resetForm()}
                >
                  Clear
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary py-2  px-6 text-sm xs:text-base w-fit"
                  disabled={updatePassword}
                >
                  {updatePassword ? <PulseLoader size={12} /> : "Change Password"}
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
