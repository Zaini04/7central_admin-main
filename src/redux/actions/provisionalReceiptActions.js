import Axios from 'config/api';
import toast from 'react-hot-toast';
import {setCreateLoading,setPatchLoading,setBounceLoading} from 'redux/slices/provisionalReceiptSlice';
import toastError from 'utils/toastError';


export const  add_Inventory = (data , navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/provisional-receipt' , data);
        toast.success(message);
        
     navigate(`/app/provisional-receipt`);
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}




export const mark_Provisionalreceipt = (id, data = {}) => async (dispatch) => {
  dispatch(setPatchLoading(true));

  try {
    const response = await Axios.put(
      `/provisional-receipt/${id}/cheque-cleared`,
      data
    );

    const {
      data: {
        data: { doc, message },
      },
    } = response;

    toast.success(message);
    dispatch(setPatchLoading(false));
    return doc;
    
  } catch (err) {
    dispatch(setPatchLoading(false));
    console.log("error", err);
    toastError(err);
  }
};




export const bounce_Provisional = (id, data) => async (dispatch) => {
  dispatch(setBounceLoading(true));

  try {
    const response = await Axios.put(
      `/provisional-receipt/${id}/cheque-bounced`,
      data
    );

    const {
      data: {
        data: { doc, message },
      },
    } = response;

    toast.success(message);
    dispatch(setBounceLoading(false));
    return doc;
    
  } catch (err) {
    dispatch(setBounceLoading(false));
    console.log("error", err);
    toastError(err);
  }
};
