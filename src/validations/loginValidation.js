import * as Yup from 'yup';

const loginValidations = Yup.object({
  identifier: Yup.string()
    .required('Username or email is required'),
  
    
  password: Yup.string()
    .min(8, 'Password should have at least 8 characters')
    .required('Password is required'),
});

export default loginValidations;
