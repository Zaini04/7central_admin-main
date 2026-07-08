import { createSlice } from '@reduxjs/toolkit';
import { getUser } from 'utils/authLocalStorage';

const errorsInitState = {
    login : '' ,
}

const authSlice = createSlice({
    name : 'auth' ,
    initialState : {
        user : getUser() || null ,
        loading : false ,
        errors : errorsInitState ,
        updatePassword:false,

         
    } ,
    reducers : {
        setUser(state , action) {
            state.user = action.payload;
        } , 
        setLoading(state , action){
            state.loading = action.payload;
        } ,
        setError (state , action) {
            state.errors = {...action.payload};
        } ,
        clearErrors (state , action) {
            state.errors = errorsInitState;
        },
         setUpdatePassword(state, action) {
      state.updatePassword = action.payload;
    },
    }
    
});

export const { setUser , setLoading , setError ,setUpdatePassword, clearErrors } = authSlice.actions;
export default authSlice.reducer;


