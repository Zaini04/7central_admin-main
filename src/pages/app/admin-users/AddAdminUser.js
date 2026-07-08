import BackBtn from 'components/global/BackBtn'
import FormControl from 'components/global/form/FormControl'
import { Formik , Form } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { admin_createDoc } from 'redux/actions/adminActions'
import castValidations from 'validations/adminUserValidations'

const initValues = {
    username: '',
    email: '',
    password: '' ,
}


const AddAdminUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { createLoading } = useSelector(state => state.admin)

    // const submitHandler = async (values) => {
    //     const formData = new FormData();
    //     formData.append('username' , values?.username)
    //     formData.append('email' , values?.email)
    //     formData.append('password' , values?.password)

    //     dispatch(admin_createDoc(formData , navigate))
    // }

     const handleSubmit = (formData , { resetForm }) => {
            dispatch(admin_createDoc(formData , navigate , resetForm))
        }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='section-heading'>
                    ADD ADMIN USER
                </h1>
                <BackBtn />
            </div>
            <div className='mt-12 bg-dark2 shadow-circle rounded-lg p-6'>
                <Formik
                    initialValues={initValues}
                    validationSchema={castValidations}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => {
                            
                            return (
                                <Form className='flex md:gap-12 gap-4 md:flex-row flex-col'>
                                    <div className='flex-[0.7] flex flex-col gap-4'>
                                        <div className='flex gap-4 md:flex-row flex-col'>
                                            <FormControl
                                                control='input'
                                                label='Username'
                                                placeholder='Enter admin username'
                                                name='username'
                                                formik={formik}
                                            />
                                            <FormControl
                                                control='input'
                                                label='Email'
                                                type='email'
                                                placeholder='Enter email address'
                                                name='email'
                                                formik={formik}
                                            />
                                    
                                        </div>
                                        <div className='flex gap-4 md:flex-row flex-col'>
                                           <FormControl
                                                control='password'
                                                label='Password'
                                                placeholder='Password'
                                                name='password'
                                                formik={formik}
                                            />
                                           
                                        </div>
                                    

                                    </div>
                                    <div className='flex-[0.3] flex flex-col justify-end'>
                                      
                                        <div className="md:mt-4 mt-10 flex items-end justify-end">
                                            <button 
                                            className="btn-primary py-3 px-12"
                                            disabled={createLoading || !formik.isValid}
                                            >
                                                {
                                                    createLoading
                                                    ? 
                                                        <ClipLoader size={20} color='white' />
                                                    : 
                                                        'Submit'
                                                }
                                            </button>
                                        </div>
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

export default AddAdminUser