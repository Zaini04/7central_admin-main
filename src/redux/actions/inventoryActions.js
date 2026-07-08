import Axios from 'config/api';
import toast from 'react-hot-toast';
import {setAssignInventoryLoading,setDocumentInventoryLoading,setCreateLoading,setAddInventoryDocument,setCreatePurchaseLoading,setPayInvetoryLoading,setDeleteLoading,setUpdateLoading} from 'redux/slices/inventorySlice';
import toastError from 'utils/toastError';


const url = '/sale/assign-inventory';


export const  add_Inventory = (data , navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/inventory' , data);
        toast.success(message);
        
     navigate(`/app/inventory`);
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const Add_Upload_Inventory = (data, navigate) => async (dispatch,) => {
 dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/inventory/upload-by-csv' , data);
        toast.success(message);
        
     navigate(`/app/inventory`);
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
};

export const   assign_Inventory = (data , navigate) => async (dispatch) => {
    dispatch(setAssignInventoryLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post(url , data);
        toast.success(message);
      if (doc?.inventory?._id) { navigate(`/app/inventory/${doc?.inventory._id}/document`); }
        dispatch(setAssignInventoryLoading(false));
    } catch (err) {
        dispatch(setAssignInventoryLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const   addDocumentInventory = (data , navigate) => async (dispatch) => {
    dispatch(setDocumentInventoryLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/document/create-inventory-document' , data);
        toast.success(message);
        if (doc?.inventory && navigate) { navigate(`/app/inventory/${doc?.inventory}/purchase-plan`); }
         setAddInventoryDocument(doc);
        dispatch(setDocumentInventoryLoading(false));
    } catch (err) {
        dispatch(setDocumentInventoryLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const  create_purchasePlan = (data , navigate) => async (dispatch) => {
    dispatch(setCreatePurchaseLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/sale/create-purchase-plan' , data);
        toast.success(message);
           navigate(`/app/installments`);
        dispatch(setCreatePurchaseLoading(false));
    } catch (err) {
        dispatch(setCreatePurchaseLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const  update_purchasePlan = (data , navigate) => async (dispatch) => {
    dispatch(setCreatePurchaseLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/sale/update-purchase-plan' , data);
        toast.success(message);
           navigate(`/app/installments`);
        dispatch(setCreatePurchaseLoading(false));
    } catch (err) {
        dispatch(setCreatePurchaseLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}





export const  pay_inventory = (data , navigate) => async (dispatch) => {
    dispatch(setPayInvetoryLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post('/payment/submit-inventory-payment' , data);
        toast.success(message);
           navigate(`/app/inventory`);
        dispatch(setPayInvetoryLoading(false));
    } catch (err) {
        dispatch(setPayInvetoryLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}





export const update_details = (id, data) => async (dispatch) => {
  dispatch(setUpdateLoading(true));

  try {
    const response = await Axios.put(
      `/inventory/${id}`,
      data
    );

    const {
      data: {
        data: { doc, message },
      },
    } = response;

    toast.success(message);
    dispatch(setUpdateLoading(false));
    return doc;
    
  } catch (err) {
    dispatch(setUpdateLoading(false));
    console.log("error", err);
    toastError(err);
  }
};







export const deleteInventory = (id) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/inventory/${id}`);

        dispatch(setDeleteLoading(false));
        toast.success(message);
    } catch (err) {
        dispatch(setDeleteLoading(false))
         toastError(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}
