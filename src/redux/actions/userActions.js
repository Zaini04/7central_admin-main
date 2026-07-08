import Axios from 'config/api';
import toast from 'react-hot-toast';
import { setUpdateLoading , updateDoc , setDeleteLoading } from 'redux/slices/userSlice';
import toastError from 'utils/toastError';

const url = '/user';
const navigateUrl = '/app/users'

export const user_edit = (itemId , updateData , navigate) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`${url}/${itemId}` , updateData );
        toast.success(message)
        dispatch(updateDoc(doc));
        if(navigate) {
            navigate(navigateUrl)
        }
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const user_delete = (itemId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`${url}/${itemId}`);
        toast.success(message)
        dispatch(updateDoc(doc));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err);
    }
}