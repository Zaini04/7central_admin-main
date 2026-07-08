import { Field, ErrorMessage } from 'formik';
import OtpInput from 'react-otp-input';
import TextError from './TextError';

function OtpInputField(props) {
    const { label, name, formik, ...rest } = props;

    return (
        <div className="form-row">
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name}>
                {({ field, form }) => (
                    <OtpInput

                        inputType='number'
                        {...rest}
                        value={field.value}
                        onChange={otp => form.setFieldValue(name, otp)}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input 
                            {...props} 
                            className={`mt-1 h-[40px] rounded-md border outline-none focus:border-primary text-pure sm:mr-4 mr-2
                            ${formik.touched[name] && formik.errors[name] ? 'border-red' : 'border-gray-700'}     
                            `}
                            />}
                        inputStyle={{
                            width: 40,
                            height: 40
                        }}
                    />
                )}
            </Field>
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default OtpInputField;
