import Axios from 'config/api';
import toast from 'react-hot-toast';
import { setCreateLoading} from 'redux/slices/installmentSlice';
import toastError from 'utils/toastError';

const url = '/payment/submit-pay-installment';
const navigateUrl = '/app/installments'

export const    create_installments = (data , navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/payment/submit-pay-installment' , data);
        toast.success(message);
      navigate(navigateUrl);
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}