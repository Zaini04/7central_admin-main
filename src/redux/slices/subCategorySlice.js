import { createSlice } from "@reduxjs/toolkit";

const subCategorySlice = createSlice({
    name : 'subCategory' ,
    initialState : {
        docs : [] ,
        docDetails : null ,
        loading : false , 
        createLoading : false , 
        updateLoading : false , 
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
        setDocDetails (state , action) {
            state.docDetails = action.payload
        } ,
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
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
        setUpdateLoading (state , action ) {
            state.updateLoading = action.payload
        } ,
        setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,
        setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
    }
});

export const { 
    setStats , setDocDetails , setLoading , setCreateLoading , setUpdateLoading , setDeleteLoading , updateDoc , removeDoc , addDoc
} = subCategorySlice.actions;

export default subCategorySlice.reducer;