import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name : 'app' ,
    initialState : {
        showSidebar : false ,
    } ,
    reducers : {
        setShowSidebar (state , action) {
            state.showSidebar = action.payload;
        } 
    }
});

export const { setShowSidebar } = appSlice.actions;
export default appSlice.reducer;