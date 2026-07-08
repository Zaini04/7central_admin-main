import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from 'formik';
import { parse, isValid } from 'date-fns';

const DateInput = ({ label, name }) => {
    const [field, meta, helpers] = useField(name);

    const parsedDate = field.value
        ? typeof field.value === 'string'
            ? parse(field.value, 'dd/MM/yyyy', new Date())
            : new Date(field.value)
        : null;

    return (
        <div className="form-row">
            {label && <label htmlFor={name}>{label}</label>}
            <DatePicker
                {...field} // ✅ Important to pass this
                id={name}
                selected={isValid(parsedDate) ? parsedDate : null}
                onChange={(val) => helpers.setValue(val)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className={`form-input z-20 ${meta.touched && meta.error ? 'border-red' : ''}`}
                onBlur={() => helpers.setTouched(true)} 
            />
            {meta.touched && meta.error && (
                <div className="text-red-500 text-sm">{meta.error}</div>
            )}
        </div>
    );
};


export default DateInput;