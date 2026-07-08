
import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import userpanelValidations from "validations/userpanelValidations";
import { admin_createDoc}  from 'redux/actions/adminActions'
import { PulseLoader } from "react-spinners";


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
    <div className="w-full bg-white flex flex-col gap-6 px-3 py-6 rounded-xl shadow-sm">


    <Formik
        initialValues={initValues}
        validationSchema={userpanelValidations}
        onSubmit={handleSubmit}
   
      >
        {(formik) => (
   <>
   
          <Form className="flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
            


            <FormControl
                control="input"
                type="text"
                label="User Name"
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
                  className="btn-primary py-2 xl:px-12 px-6 text-sm xs:text-base w-fit"
                  disabled={createLoading}
                >
             {
                                      createLoading
                                                        ?
                                                            <PulseLoader size={12} color='white' />
                                                        :
                                                            'Submit '
                                                    }
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
