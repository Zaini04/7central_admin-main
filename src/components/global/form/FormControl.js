import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker'
import PasswordInput from './PasswordInput'
import ToggleButton from './ToggleButton'
import OtpInputField from './OtpInputField'
import TagsInput from './TagsInput'
import MetaTagsInput from './MetaTagsInput'
import FaqsInput from './FaqsInput'
import FileInputBase64 from './FileInputBase64'
import MultiFileBase64 from './MultiFileBase64'
import AudioFileInput from './AudioFileInput'
import FormikFileInput from './FormikFileInput'
import MultiSelect from './MultiSelect'
import SelectInput   from './SelectInput';
import DateInput from './DateInput'
import InputSelect   from './InputSelect'
import MultiSelectOption    from './MultiSelectOption';
import CaptureImage   from './CaptureImage';
import UploadFile from './UploadFile';
import BrowseImage  from './BrowseImage';
import FrontBackFileInput  from './FrontBackFileInput';


function FormControl (props) {
    const { control, ...rest } = props;
    
    switch (control) {
        case 'input':
            return <Input {...rest} />
     case 'multiple-option':
      return <InputSelect {...rest} />
  case 'multiple-select-option':
      return <MultiSelectOption {...rest} />
                 case 'BrowseImage-option':
            return <BrowseImage {...rest} />
            case 'capture-image':
            return <CaptureImage {...rest} />
                case 'frontBack-file':
            return <FrontBackFileInput {...rest} />
               case 'upload-file':
            return <UploadFile {...rest} />
        case 'date-input':
            return <DateInput {...rest} />
        case 'otp':
            return <OtpInputField {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'filter-select':
            return <SelectInput {...rest} />
              case 'select-input':
            return <Select {...rest} />
        case 'multi-select':
            return <MultiSelect {...rest} />
        case 'radio':
            return <RadioButtons {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        case 'password':
            return <PasswordInput {...rest} />
        case 'file':
            return <FormikFileInput {...rest} />
        case 'file-base64':
            return <FileInputBase64 {...rest} />
        case 'multi-file-base64':
            return <MultiFileBase64 {...rest} />
        case 'toggle':
            return <ToggleButton {...rest} />
        case 'audio':
            return <AudioFileInput {...rest} />
        case 'tags':
            return <TagsInput {...rest} />
        case 'meta':
            return <MetaTagsInput {...rest} />
        case 'faq':
            return <FaqsInput {...rest} />
        default:
            return null
    }
}

export default FormControl;
