import { createSlice } from '@reduxjs/toolkit';

const OriginalBuyerSlice = createSlice({
  name: 'original-buyer',
  initialState: {
    docs: [],
    doc:{},
    docDetails : null ,
    docExtraDetails:null,
    docMultipleDetails: [],
    docCustomerDocumnet:[],
 createCustomerDocumnetLoading:false,
      



    updateCustomerLoading:false,
    deleteCustomerLoading:false,
// 
    page : 1 ,
    pages : 1 , 
    docsCount : 0 , 
  },

  
  reducers: {
  setStats (state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.page = page;
            state.pages = pages;
        } ,


        setDoc (state , action) {
            state.doc = action.payload
        } ,


        setDocDetails (state , action) {
            state.docDetails = action.payload
        } ,
        setDocSteps (state , action) {
            state.steps = action.payload
        } ,
        
        setDocExtraDetails (state , action) {
            state.docExtraDetails = action.payload
        } ,


           setDocNotification (state , action) {
            state.docNotification = action.payload
        } ,

        

           setDocCustomerDocumnet(state , action) {
            state.docCustomerDocumnet = action.payload
        } ,

            setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,


                setUpdateCustomerLoading (state , action ) {
            state.updateCustomerLoading = action.payload
        } ,


              setDeleteCustomerLoading (state , action ) {
            state.deleteCustomerLoading = action.payload
        } ,


               setCustomerDocumnet (state , action ) {
            state.customerDocumnet = action.payload
        } ,
        
        

        
           setCreateCustomerDocumnetLoading (state , action ) {
            state.createCustomerDocumnetLoading = action.payload
        } ,
  

            setCreateCustomerAssignLoading (state , action ) {
            state.createCustomerAssignLoading = action.payload
        } ,


           setCreateCustomerNextOfKinLoading (state , action ) {
            state.createCustomerNextOfKinLoading = action.payload
        } ,

         setCreateCustomerNotificationLoading (state , action ) {
            state.createCustomerNotificationLoading = action.payload
        } ,


        
          

          


        

   setCreateCustomerInventoryDocumnetLoading (state , action ) {
            state.createCustomerInventoryDocumnetLoading = action.payload
        } ,

        setCreateCustomerInventoryInstallmentLoading (state , action ) {
            state.createCustomerInventoryInstallmentLoading = action.payload
        } ,


        
        
  setDocMultipleDetails(state, action) {
      const customer = action.payload;
      if (!state.docMultipleDetails.some((c) => c?._id === customer?._id)) {
        state.docMultipleDetails.push(customer); 
      }
    },

    removeDocMultipleDetails(state, action) {
      const id = action.payload;
      state.docMultipleDetails = state.docMultipleDetails.filter(
        (c) => c?._id !== id
      );
    },

    resetDocMultipleDetails(state) {
    state.docMultipleDetails = [];
  },

        
        addDoc (state , action) {
            state.docs = [action.payload, ...state.docs];
        } ,
        updateDoc (state , action) {
            const index = state.docs.findIndex(i => i._id === action.payload._id);
            state.docs[index] = action.payload;
            state.docDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.docs = state.docs.filter(i => i._id !== action.payload);
        } , 
        setUpdateLoading (state , action ) {
            state.updateLoading = action.payload
        } ,
        setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,

            setCustomerInstallments (state , action ) {
            state.customerInstallments = action.payload
        } ,

            setCustomerInstallmentsDetail (state , action ) {
            state.customerInstallmentsDetail = action.payload
        } ,



             setCustomerReceipts (state , action ) {
            state.customerReceipts = action.payload
        } ,

            setCustomerReceiptsDetail (state , action ) {
            state.customerReceiptsDetail = action.payload
        } ,


         setCustomerInventories (state , action ) {
            state.customerInventories = action.payload
        } ,

        

        

        
  },
});

export const {  setStats ,setDoc, setDocDetails ,setDocCustomerDocumnet,setCreateCustomerInventoryInstallmentLoading, setCreateCustomerDocumnetLoading,setCreateCustomerInventoryDocumnetLoading,setCreateCustomerAssignLoading,  resetDocMultipleDetails,setDocExtraDetails,setDocMultipleDetails,removeDocMultipleDetails, setDocSteps,setUpdateLoading , setDeleteLoading , updateDoc , removeDoc , addDoc,setCreateLoading,
  setUpdateCustomerLoading,
  setCreateCustomerNextOfKinLoading,
  setCreateCustomerNotificationLoading,
  setDocNotification,
  setDeleteCustomerLoading,
  setCustomerDocumnet,
  setCustomerInstallments,
  setCustomerInstallmentsDetail,
  setCustomerReceipts,
  setCustomerReceiptsDetail,
  setCustomerInventories,
} = OriginalBuyerSlice.actions;
export default OriginalBuyerSlice.reducer;
