import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    docs: [],
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
  },
});

export const {    
   setStats 
} = projectSlice.actions;
export default projectSlice.reducer;
