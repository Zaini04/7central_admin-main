import { createSlice } from '@reduxjs/toolkit';
// import { addDocumentInventory } from 'redux/actions/inventoryActions';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    docs: [],
      doc:{},
    docDetails : null ,
    docinventoryExtraDetails:null,
    addInventoryDocument:null,

    steps : null ,
    createLoading:false,
    deleteLoading : false ,
    updateLoading : false ,
  assignInventoryLoading: false, 
  documentInventoryLoading:false,
    createPurchaseLoading:false,

docInventoryDocument: [],
  inventoryDocument: null,



        payInvetoryLoading:false,
         deleteLoading:false,
    
    inventoryStats: {},


  
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

         setInventoryStats (state , action) {
                 state.inventoryStats = action.payload
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
        setAddInventoryDocument (state , action) {
            state.addInventoryDocument = action.payload
        } ,

           setDocInventoryDocument (state , action) {
            state.docInventoryDocument = action.payload
        } ,

            setInventoryDocument (state , action) {
            state.inventoryDocument = action.payload
        } ,



        
        

       
        

 setDocinventoryExtraDetails (state , action) {
            state.docinventoryExtraDetails = action.payload
        } ,
        
        addDoc (state , action) {
            state.docs = [action.payload, ...state.docs];
        } ,


         setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,
    



           setOwnerShipLoading (state , action ) {
            state.ownerShipLoading = action.payload
        } ,

    setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
  

        
         setCreatePurchaseLoading(state , action ) {
            state.createPurchaseLoading = action.payload
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
      

         setAssignInventoryLoading (state , action ) {
            state.assignInventoryLoading = action.payload
        } ,


          setPayInvetoryLoading (state , action ) {
            state.payInvetoryLoading = action.payload
        } ,


          setDocumentInventoryLoading (state , action ) {
            state.documentInventoryLoading = action.payload
        } ,

        
  },
});

export const { setTransferDocs,setDoc,   setStats , setDocDetails ,setCreateLoading, setDocSteps,setAddInventoryDocument,setUpdateLoading , setDeleteLoading ,setAssignInventoryLoading,setDocumentInventoryLoading, updateDoc , removeDoc , addDoc,setCreatePurchaseLoading,
    setPayInvetoryLoading,
    setDocinventoryExtraDetails,
    setDocInventoryDocument,
    setInventoryStats,
    setInventoryDocument
} = inventorySlice.actions;
export default inventorySlice.reducer;
