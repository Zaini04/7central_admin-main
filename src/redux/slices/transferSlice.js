import { createSlice } from '@reduxjs/toolkit';

const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    docs: [],
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

   
  },
});

export const {  setStats ,
  setCreateLoading
} = transferSlice.actions;
export default transferSlice.reducer;
