import { createSlice } from '@reduxjs/toolkit';

const provisionalReceiptSlice = createSlice({
  name: 'ProvisionalReceipt',
  initialState: {
    docs:false,
    createLoading:false,
    patchLoading:false,
      provisionalId:null,
         provisionalData:false,
      bounceLoading:false,
        page : 1 ,
    pages : 1 , 
    docsCount : 0 , 

  },
  reducers: {

   setStats(state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.page = page;
            state.pages = pages;
        } ,

    setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,

           setPatchLoading (state , action ) {
            state.patchLoading = action.payload
        } ,

         setBounceLoading (state , action ) {
            state.bounceLoading = action.payload
        } ,
            setProvisionalId (state , action ) {
            state.provisionalId = action.payload
        } ,


           setProvisionalData(state , action ) {
            state.provisionalData = action.payload
        } ,
        
  
        

  },
});

export const {setDocs,setCreateLoading,setBounceLoading,setStats,setPatchLoading,setProvisionalId, setProvisionalData } = provisionalReceiptSlice.actions;
export default provisionalReceiptSlice.reducer;
