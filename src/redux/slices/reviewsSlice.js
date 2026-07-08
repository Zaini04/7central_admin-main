import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name : 'review' ,
    initialState : {
        docs : [] ,
        deleteLoading : false ,
        page : 1 ,
        pages : 1 , 
        docsCount : 0 , 
    } , 
    reducers : {
        setStats (state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.page = page;
            state.pages = pages;
        } ,
        removeDoc (state , action) {
            state.docs = state.docs.filter(i => i._id !== action.payload);
        } , 
        setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
    }
});

export const { 
    setStats , setDeleteLoading  , removeDoc 
} = reviewSlice.actions;

export default reviewSlice.reducer;