import { createSlice } from '@reduxjs/toolkit';

const purchasePlanSlice = createSlice({
  name: 'Purchase Plan',
  initialState: {
      
     docs:[],

    createLoading:false,
  
  
   
  },
  reducers: {

            setDocs(state , action ) {
            state.docs = action.payload
        } ,
         setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,
    
        
  },
});

export const {
    setCreateLoading,  setDocs
} = purchasePlanSlice.actions;
export default purchasePlanSlice.reducer;
