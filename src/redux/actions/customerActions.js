    import Axios from 'config/api';
import toast from 'react-hot-toast';
import { setUpdateLoading , updateDoc , addDoc, setCreateLoading, setDeleteLoading, removeDoc,setCreateCustomerDocumnetLoading,setCreateCustomerInventoryDocumnetLoading,setCreateCustomerAssignLoading,setCreateCustomerInventoryInstallmentLoading,setUpdateCustomerLoading,setDeleteCustomerLoading,setCreateCustomerNextOfKinLoading,setCreateCustomerNotificationLoading } from 'redux/slices/customerSlice';
import toastError from 'utils/toastError';

const url = '/customer';
const navigateUrl = '/app/Customer'

export const customer_create = (data ,original_buyer, navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post(url , data);
        dispatch(addDoc(doc));
        const customerId = doc._id;
        toast.success(message);
        if(original_buyer){

            navigate(`/app/Customer/${customerId}/next-of-kin`);
        }else{
            navigate(`/app/Customer/${customerId}/original-buyer`);

        }

        
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}


export const customer_nextofkin = (data , navigate) => async (dispatch) => {
    dispatch(setCreateCustomerNextOfKinLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/customer/next-of-kin' , data);
            const customerId = doc?.customer;
        toast.success(message);
      navigate(`/app/Customer/${customerId}/referal-program`);

        
        dispatch(setCreateCustomerNextOfKinLoading(false));
    } catch (err) {
        dispatch(setCreateCustomerNextOfKinLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}


export const customer_notifications= (data , navigate) => async (dispatch) => {
    dispatch(setCreateCustomerNotificationLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/notification-setting/create-or-update' , data);
            const customerId = doc?.customer;
        toast.success(message);
      navigate(`/app/Customer/${customerId}/documents`);

        
        dispatch(setCreateCustomerNotificationLoading(false));
    } catch (err) {
        dispatch(setCreateCustomerNotificationLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}



// update

export const customer_update = (id,data , navigate) => async (dispatch) => {
    dispatch(setUpdateCustomerLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`/customer/${id}` , data);
        dispatch(addDoc(doc));
        const customerId = doc._id;
        toast.success(message);
      navigate(`/app/Customer-detail/${customerId}/next-of-kin`);
        dispatch(setUpdateCustomerLoading(false));
    } catch (err) {
        dispatch(setUpdateCustomerLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}


export const customer_documnet = (data, navigate = null) => async (dispatch) => {
    dispatch(setCreateCustomerDocumnetLoading(true));

    try {
        const { data : { data : { doc , message } } } = await Axios.post('/document/create-customer-document', data);
        toast.success(message);
        if (navigate) {
            const customerId = doc?.customer;
            navigate(`/app/Customer/${customerId}/assign-inventory`);
        }
        dispatch(setCreateCustomerDocumnetLoading(false));
    } catch (err) {
        dispatch(setCreateCustomerDocumnetLoading(false));
        console.log('error', err);
        toastError(err);
    }
};







export const customer_delete = (id) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/customer/${id}`);

        dispatch(setDeleteLoading(false));
        toast.success(message);
    } catch (err) {
        dispatch(setDeleteLoading(false))
         toastError(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}



export const deleteCustomer = (id) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteCustomerLoading(true));
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/document/${id}`);

        dispatch(setDeleteCustomerLoading(false));
        toast.success(message);
    } catch (err) {
        dispatch(setDeleteCustomerLoading(false))
         toastError(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}





export const customerDocument_Assign = (data, id, navigate) => async (dispatch) => {
    dispatch(setCreateCustomerAssignLoading(true));

    try {
        const { data: { data: { doc, message } } } = await Axios.post('/sale/assign-inventory', data);
        toast.success(message);
        if (doc?.inventory?._id) {
            navigate(`/app/Customer/${id}/inventory-documents?inventory=${doc?.inventory?._id}`);
        }
        dispatch(setCreateCustomerAssignLoading(false));
    } catch (err) {
        dispatch(setCreateCustomerAssignLoading(false));
        console.log('error', err);
        toastError(err);
    }
};

export const customerDocument_Inventory = (data, id, navigate) => async (dispatch) => {
    dispatch(setCreateCustomerInventoryDocumnetLoading(true));
    try {
        const { data: { data: { doc, message } } } = await Axios.post('/document/create-inventory-document', data);
        toast.success(message);
        if (doc?.inventory?._id) {
            navigate(`/app/Customer/${id}/inventory-documents?inventory=${doc?.inventory?._id}`);
        }
        dispatch(setCreateCustomerInventoryDocumnetLoading(false));
    } catch (err) {
        dispatch(setCreateCustomerInventoryDocumnetLoading(false));
        console.log('error', err);
        toastError(err);
    }
};





export const   create_InstallmentPlan = (data) => async (dispatch) => {
    dispatch(setCreateCustomerInventoryInstallmentLoading(true));
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/document/create-inventory-document' , data);
        toast.success(message);
        dispatch(setCreateCustomerInventoryInstallmentLoading(false));
    } catch (err) {
        dispatch(setCreateCustomerInventoryInstallmentLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}






// export const customer_edit = (itemId , updateData , navigate) => async (dispatch , getState) => {
//     dispatch(setUpdateLoading(true))
//     try {
//         const { data : { data : { doc , message } } } = await Axios.put(`${url}/${itemId}` , updateData );
//         toast.success(message)
//         dispatch(updateDoc(doc));
//         if(navigate) {
//             navigate(navigateUrl)
//         }
//         dispatch(setUpdateLoading(false));
//     } catch (err) {
//         dispatch(setUpdateLoading(false));
//         console.log('error' , err);
//         toastError(err)
//     }
// }

// export const customer_delete = (itemId) => async (dispatch , getState) => {
//     dispatch(setDeleteLoading(true))
//     try {
//         const { data : { data : { message } } } = await Axios.delete(`${url}/${itemId}`);
//         toast.success(message)
//         dispatch(removeDoc(itemId));
//         dispatch(setDeleteLoading(false));
//     } catch (err) {
//         dispatch(setDeleteLoading(false));
//         console.log('error' , err);
//         toastError(err);
//     }
// }