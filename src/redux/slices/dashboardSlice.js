import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    statsDashboard: {},
    inventoryDashboard:[],
  
  },

  
  reducers: {
  setStatsDashboard (state , action) {
                 state.statsDashboard = action.payload
        } ,

         setInventoryDashboard (state , action) {
                 state.inventoryDashboard = action.payload
        } ,

  },
});

export const {  
    setStatsDashboard,
    setInventoryDashboard
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
