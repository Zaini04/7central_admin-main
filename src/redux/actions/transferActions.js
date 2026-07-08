
import Axios from 'config/api';
import toast from 'react-hot-toast';
import {setCreateLoading} from 'redux/slices/transferSlice';
import toastError from 'utils/toastError';






export const  ownerShip_transfer = (data , navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/sale/inventory-ownership-transfer' , data);
        toast.success(message);
           navigate(`/app/inventory`);
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}