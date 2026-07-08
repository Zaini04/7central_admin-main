import BackBtn from 'components/global/BackBtn'
import DisplayError from 'components/global/DisplayError'
import FormControl from 'components/global/form/FormControl'
import ItemNotFound from 'components/global/ItemNotFound'
import Loader from 'components/global/Loader'
import Axios from 'config/api'
import { castRoles, genderOptions } from 'constants/app.constants'
import { Formik, Form } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { admin_edit } from 'redux/actions/adminActions'
import { setDocDetails } from 'redux/slices/adminSlice'
import castValidations from 'validations/adminUserValidations'




const EditAdminUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { docDetails, updateLoading } = useSelector(state => state.admin);

    const initValues = {

        username: docDetails?.username || '',
        email: docDetails?.email || '',
        password: '' ,
        
    }


    const queryKey = ['fetch-admin-user-details', id];
    const { isLoading, isError, error } = useQuery({
        queryKey,
        queryFn: () => Axios(`/user/${id}`),
        onSuccess: data => {
            const { data: { data: { doc } } } = data;
            dispatch(setDocDetails(doc))
        },
        enabled: !docDetails,
        refetchOnWindowFocus: false,
    })

    const submitHandler = async (formData) => {
        if (JSON.stringify(formData) === JSON.stringify(initValues)) {
            return toast.error('You have not made any changes to save!')
        }
        dispatch(admin_edit(id, formData, navigate))
    }


    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='section-heading'>
                    Edit Admin User
                </h1>
                <BackBtn />
            </div>
            {
                isLoading
                    ?
                    <Loader />
                    :
                    isError
                        ?
                        <DisplayError message={error} />
                        :
                        docDetails
                            ?
                            <div className='mt-12 bg-dark2 shadow-circle rounded-lg p-6'>
                                <Formik
                                    initialValues={initValues}
                                    validationSchema={castValidations}
                                    onSubmit={submitHandler}
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
                                                      
                                                        <div className="md:mt-4 mt-10 flex items-end justify-end gap-4">
                                                            <button
                                                                className="btn-secondary py-3 px-12"
                                                                disabled={!formik.isValid || updateLoading}
                                                            >
                                                                {
                                                                    updateLoading
                                                                        ?
                                                                        <ClipLoader size={20} color='white' />
                                                                        :
                                                                        'Save'
                                                                }
                                                            </button>
                                                            <button
                                                                className="btn-gray py-3 px-12"
                                                                disabled={updateLoading}
                                                                onClick={() => navigate('/app/cast')}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )
                                        }
                                    }

                                </Formik>


                            </div>
                            :
                            <ItemNotFound message='Details not found.' />
            }

        </div>
    )
}

export default EditAdminUser