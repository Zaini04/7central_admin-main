import { createSlice } from '@reduxjs/toolkit';

const installmentSlice = createSlice({
  name: 'installment',
  initialState: {
    docs: [],
    doc:{},
    page : 1 ,
    pages : 1 , 
    docsCount : 0 , 
        createLoading : false , 


  },

  
  reducers: {
  setStats (state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.page = page;
            state.pages = pages;
        } ,
           setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,

               setDoc (state , action ) {
            state.doc = action.payload
        } ,

   
  },
});

export const {  setStats ,
  setCreateLoading,
  setDoc,
} = installmentSlice.actions;
export default installmentSlice.reducer;
