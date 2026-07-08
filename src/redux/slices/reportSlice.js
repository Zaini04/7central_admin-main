import { createSlice } from '@reduxjs/toolkit';
import { getUser } from 'utils/authLocalStorage';

const initialState = {
  reportResult: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportResult: (state, action) => {
      state.reportResult = action.payload;
    },
    clearReportResult: (state) => {
      state.reportResult = null;
    },
  },
});

export const { setReportResult, clearReportResult } = reportSlice.actions;
export default reportSlice.reducer;


