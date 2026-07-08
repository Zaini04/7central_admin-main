import Axios from 'config/api';
import toast from 'react-hot-toast';
import {setCreateLoading,setPatchLoading,setBounceLoading,setDeleteLoading} from 'redux/slices/paymentReceiptSlice';
import toastError from 'utils/toastError';





export const verify_Payment = (data,navigate) => async (dispatch) => {
  dispatch(setPatchLoading(true));

  try {
    const response = await Axios.put(
      `/payment/verify-payment-from-admin`,
      data
    );

    const {
      data: {
        data: { doc, message },
      },
    } = response;

    toast.success(message);
    navigate('/app/payment')
    dispatch(setPatchLoading(false));
    return doc;
    
  } catch (err) {
    dispatch(setPatchLoading(false));
    console.log("error", err);
    toastError(err);
  }
};






