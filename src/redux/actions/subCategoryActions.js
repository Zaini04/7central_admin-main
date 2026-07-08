import Axios from 'config/api';
import toast from 'react-hot-toast';
import { setUpdateLoading , updateDoc , addDoc, setCreateLoading, setDeleteLoading, setLoading, setStats, removeDoc } from 'redux/slices/subCategorySlice';
import toastError from 'utils/toastError';

const url = '/sub-category';
const navigateUrl = '/app/sub-categories'

export const subCat_getTotal = (data , navigate) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { docs  } } } = await Axios.get(`${url}/total` , data);
        dispatch(setStats(docs));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const subCat_createDoc = (data , navigate) => async (dispatch) => {
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

export const subCat_edit = (itemId , updateData , navigate) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`${url}/${itemId}` , updateData );
        toast.success(message)
        dispatch(updateDoc(doc));
        navigate(navigateUrl)
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const subCat_delete = (itemId) => async (dispatch , getState) => {
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