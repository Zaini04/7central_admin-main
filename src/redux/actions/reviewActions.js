import Axios from 'config/api';
import toast from 'react-hot-toast';
import { setDeleteLoading, removeDoc } from 'redux/slices/reviewsSlice';
import toastError from 'utils/toastError';

const url = '/review';


export const review_delete = (itemId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.delete(`${url}/${itemId}`);
        toast.success(message)
        dispatch(removeDoc(itemId));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err);
    }
}