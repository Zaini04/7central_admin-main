import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";
import profileSlice  from './slices/profileSlice';
import customerSlice   from './slices/customerSlice';
import projectSlice    from './slices/projectSlice';
import sectorSlice   from './slices/sectorSlice';
import purchasePlanSlice   from './slices/purchasePlanSlice';
import inventorySlice from "./slices/inventorySlice";
import installmentSlice   from  './slices/installmentSlice';
import dashboardSlice   from './slices/dashboardSlice';
import provisionalReceiptSlice  from './slices/provisionalReceiptSlice'
import paymentReceiptSlice   from './slices/paymentReceiptSlice';




import subCategorySlice from "./slices/subCategorySlice";
import castSlice from "./slices/castSlice";
import userSlice from "./slices/userSlice";
import adSlice from "./slices/adSlice";
import musicSlice from "./slices/musicSlice";
import songSlice from "./slices/songSlice";
import notificationSlice from "./slices/notificationSlice";
import reviewSlice from "./slices/reviewsSlice";
import adminSlice from "./slices/adminSlice";
import transferSlice   from './slices/transferSlice'
import reportSlice   from './slices/reportSlice'
import leadsReducer from "./slices/leadsSlice";

const store = configureStore({
    reducer: {
        app : appSlice ,
        auth : authSlice ,
        profile :profileSlice,
        customer:customerSlice,
     inventory:inventorySlice,
     purchasePlan:purchasePlanSlice,
        project:projectSlice,
        sector:sectorSlice,
        installment:installmentSlice,
        dashboard:dashboardSlice,
        provisionalReceipt:provisionalReceiptSlice,
        paymentReceipt:paymentReceiptSlice,
        transfer:transferSlice,
          admin: adminSlice,
        report: reportSlice,

            leads: leadsReducer,


   user : userSlice ,
        subCategory : subCategorySlice ,
        cast : castSlice ,
        ad : adSlice ,
        music : musicSlice ,
        song : songSlice ,
        notification : notificationSlice ,
        review: reviewSlice,
      
    }
});

export default store;