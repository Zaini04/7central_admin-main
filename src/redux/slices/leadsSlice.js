import { createSlice } from "@reduxjs/toolkit";

// Response type (CallStatusModal dropdown) → us lead ki tab
export const STATUS_TAB_MAP = {
  "Not Contacted": "Not Contacted",
  "Interested": "Follow Up",
  "Follow Up": "Follow Up",
  "Contact Later": "Future Plan",
  "Future Plan": "Future Plan",
  "Schedule Visit": "Visit Plan",
  "Successful": "Successful Leads",
  "Not Interested": "Dead Leads",
  "Irrelevant": "Dead Leads",
};

const DUMMY_LEADS = [
  { _id: "1", no: "01", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", source: "Campaign", campaign: "15% Down Payment", dealerType:"------",dealerName:"------", assigned: "Martin Lewis", date: "6-24-2026 2:00:03PM" },
  { _id: "2", no: "02", name: "Laeonardo", avatar: "", phone: "0301-2345678", source: "Dealer", campaign:"------",dealerType:"7Cenetral Registered",dealerName:"Ali", assigned: "Smith Cooper", date: "6-24-2026 2:00:03PM" },
  { _id: "3", no: "03", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", source: "Google Ads", campaign: "------",dealerType:"------",dealerName:"------",assigned: "Newell Egen", date: "6-24-2026 2:00:03PM" },
  { _id: "4", no: "04", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", source: "Walking Customer", campaign: "------",dealerType:"------",dealerName:"------", assigned: "Theresa Nelson", date: "6-24-2026 2:00:03PM" },
  { _id: "5", no: "05", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", source: "Campaign", campaign: "15% Down Payment",dealerType:"------",dealerName:"------", assigned: "Jami Carlile", date: "6-24-2026 2:00:03PM" },
  { _id: "6", no: "06", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", source: "Dealer", campaign: "------",dealerType:"DHA Registered",dealerName:"Zain", assigned: "Daniel Byrne", date: "6-24-2026 2:00:03PM" },
  { _id: "7", no: "07", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", source: "Google Ads", campaign: "------",dealerType:"------",dealerName:"------", assigned: "Jami Carlile", date: "6-24-2026 2:00:03PM" },
  { _id: "8", no: "08", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", source: "Dealer", campaign: "------",dealerType:" Frelance Registered",dealerName:"Salman", assigned: "Craig Brown", date: "6-24-2026 2:00:03PM" },
  { _id: "9", no: "09", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", source: "Walking Customer", campaign: "------",dealerType:"------",dealerName:"------", assigned: "Janet Carlson", date: "6-24-2026 2:00:03PM" },
  { _id: "10", no: "10", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", source: "Dealer", campaign: "------",dealerType:"7Central",dealerName:"Awais", assigned: "Theresa Nelson", date: "6-24-2026 2:00:03PM" },
];

const initialState = {
  list: DUMMY_LEADS.map((l) => ({
    ...l,
    status: null,
    nextActionDate: "",
    history: [], // 👈 har "Mark Response" ka record yahan jama hoga
  })),
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    markResponse: (state, action) => {
      const { leadId, responseType, notes, nextActionDate, profession, markedBy } = action.payload;
      const lead = state.list.find((l) => l._id === leadId);
      if (!lead) return;

      // current status update
      lead.status = responseType;
      lead.nextActionDate = nextActionDate;
      lead.profession = profession;

      // history me naya entry (purane records delete nahi hote, sab reh jate hain)
      lead.history.unshift({
        id: `h_${Date.now()}`,
        responseType,
        notes,
        nextActionDate,
        markedBy: markedBy || "Unknown",
        date: new Date().toLocaleString("en-GB", {
          day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
        }),
      });
    },

    addLead: (state, action) => {
      state.list.push({ ...action.payload, status: null, nextActionDate: "", history: [] });
    },
  },
});

export const { markResponse, addLead } = leadsSlice.actions;
export default leadsSlice.reducer;