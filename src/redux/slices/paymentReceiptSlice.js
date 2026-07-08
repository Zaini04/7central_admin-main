import { createSlice } from '@reduxjs/toolkit';

const paymentReceiptSlice = createSlice({
  name: 'PaymentReceipt',
  initialState: {
    docs:false,
    doc:{},
        page : 1 ,
    pages : 1 , 
    docsCount : 0 , 
        paymentId:null,
        patchLoading:false,
        deleteLoading:false,
  },
  reducers: {
   setStats(state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.page = page;
            state.pages = pages;
        } ,
    setPaymentId (state , action ) {
            state.paymentId = action.payload
        } ,

             setDoc(state , action ) {
            state.doc = action.payload
        } ,

              setPatchLoading (state , action ) {
            state.patchLoading = action.payload
        } ,

           setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
  },
});

export const {setStats,setDoc,setPaymentId,setPatchLoading,setDeleteLoading} = paymentReceiptSlice.actions;
export default paymentReceiptSlice.reducer;
