import Axios from 'config/api';
import toast from 'react-hot-toast';
import { updateDoc , addDoc, setCreateLoading, setDeleteLoading, removeDoc } from 'redux/slices/notificationSlice';
import toastError from 'utils/toastError';

const url = '/notification';
const navigateUrl = '/app/notifications'

export const notification_createDoc = (data , navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post(url , data);
        dispatch(addDoc(doc));
        toast.success(message);
        navigate(navigateUrl)
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const notification_delete = (itemId) => async (dispatch , getState) => {
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