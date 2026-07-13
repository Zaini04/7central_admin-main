import LogoSvg from "assets/svgs/LogoSvg"
import Alert from "components/global/Alert"
import FormControl from "components/global/form/FormControl"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { PulseLoader } from "react-spinners";
import { login } from "redux/actions/authActions"
import loginValidations from "validations/loginValidation"
import logo from '../../../assets/images/7 Central.svg';
import loginBanner from '../../../assets/images/bgImage.png';

const initValues = {
    identifier: '',
    password: ''
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading , errors } = useSelector(state => state.auth);

    const handleSubmit = (initValues , { resetForm }) => {
        dispatch(login(initValues , navigate , resetForm))
        
    }

    return (
        <div className='w-full h-screen flex items-center justify-center px-4  relative '>
   <div className=" absolute   left-0 top-0  w-full h-screen z-5">
      <img  src={loginBanner}   className="  w-full   h-full"/>
   </div>
    
        
          <div className="  relative z-10 lg:w-[40%] xl:w-[35%] md:w-[70%] w-full bg-light2    px-9  py-9  rounded-[20px] shadow-[30px_34px_50px_0px_#0B323F1A]
            flex flex-col gap-6">
       
             <img className='h-[76px] w-[109px]' src={logo} alt="Logo" />

          <div className="flex flex-col gap-2 mb-4">
          <h2 className=" text-[32px] font-bold">Welcome  Back</h2>
            <p className=" text-dark1 text-sm">Let’s login into  your 7Central account first</p>

          </div>
           

                  <Formik
                            initialValues={initValues}
                            validationSchema={loginValidations}
                            onSubmit={handleSubmit}
                        >
                            {
                                (formik) => {
                                    return (
                                        <Form className="flex flex-col  gap-x-5 gap-y-8">
                                            {
                                                errors?.login && (
                                                    <Alert message={errors?.login} />
                                                )
                                            }
                                          <FormControl
                                                            control='input'
                                                            type='text'
                                                            label='Email'
                                                            placeholder='Enter Email'
                                                            name='identifier'
                                                            formik={formik}
                                                            autoComplete="off"
                                                            />
                                            <FormControl
                                                control='password'
                                                name='password'
                                                formik={formik}
                                                    label='Password'
                                                    placeholder='Enter Password'
                                                          autoComplete="off"
                                            />
                                            <div >
                                                <button
                                                    type='submit'
                                                    className="btn-primary py-3 sm:px-12 px-6 w-full"
                                                    // disabled={loading}
                                                >
                                                    {
                                                        loading
                                                        ?
                                                            <PulseLoader size={12} color='white' />
                                                        :
                                                            'Login'
                                                    }
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
            </div>
        </div>
    )
}

export default Login