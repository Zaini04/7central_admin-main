import { lazy } from "react";
import Loadable from "components/global/Loadable";
import { Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import NextOfKin from "pages/app/customer/nextKin";
import CusomerNotification from "pages/app/customer/customerNotification";
import CustomerDocuments from "pages/app/customer/customerDocuments";

// LAYOUTS
import  MainLayout   from 'layouts/main'
import BlankLayout   from 'layouts/blank'

// APP

import Home   from 'pages/app/home'
import Customer   from 'pages/app/customer'
import AddCustomer   from 'pages/app/customer/addcustomer';
import GeneralCustomer from "pages/app/customer/general.js";
import AssignCusomerInventory    from 'pages/app/customer/customerAssignInventory' 
import CustomerInventoryDocument   from 'pages/app/customer/customerInventoryDocument'
import CustomerInstallment   from 'pages/app/customer/customerInstallment'
import JointApplicant from "pages/app/customer/jointApplicant.js";
import CustomerDetail   from 'pages/app/customerdetail/index';
import AddCustomerInventoryDocument   from 'pages/app/customerdetail/customerInventoryDocument/index';

import DigitalReceipt   from 'pages/app/digital-receipt/index';

import   GeneralUpdate   from 'pages/app/customer/updatecustomer/generalUpdate'
import  NextKinUpdate   from 'pages/app/customer/updatecustomer/nextKinUpdate'
import NotificationUpdate  from 'pages/app/customer/updatecustomer/notificationUpdate'
import DocumentUpdate   from 'pages/app/customer/updatecustomer/documentUpdate'



// Inventory
import Inventory from "pages/app/inventory/index";
import AddInventory   from 'pages/app/inventory/addinventory/index'
import UploadInventory   from 'pages/app/inventory/uploadinventory/index'
import AssignInventory  from 'pages/app/inventory/assignInventory/index'
import InventoryDocument   from 'pages/app/inventory-document/index'
import InventoryPurchaseplan   from 'pages/app/inventory-purchaseplan/index'
import PayInventory   from 'pages/app/inventory/payInventory/index'
import Transferinventory   from 'pages/app/inventory/transferinventory/index'
import InventoryDetails   from 'pages/app/InventoryDetails/index'
import PaymentReceipt   from 'pages/app/paymentReceipt/index'
import PaymentReceiptdetails   from  'pages/app/paymentReceiptdetails/index'
import PaymentReceiptVerify   from 'pages/app/paymentReceiptVerify/index'
import PaymentReceiptReserved   from 'pages/app/paymentReserved/index';



import ProvisionalReceipt  from 'pages/app/provisionalReceip/index'
import AddProvisionalReceipt   from  'pages/app/provisionalReceip/addProvisionalReceipt/index'



import Reports   from 'pages/app/reports/index';
import Installments   from 'pages/app/installments/index';
import PayInstallment   from 'pages/app/installments/payinstallment/index'
import PanelUser  from  'pages/app/panel-user/index'
import  AddPanelUser   from 'pages/app/panel-user/addpanel-user/index'


import Setting  from 'pages/app/setting/index'
import Gismap   from 'pages/app/gismap/index'

import NotificationTemplates from "pages/app/notifications/NotificationTemplates";
import AddNotificationTemplates from "pages/app/notifications/AddNotificationTemplates";
import BroadcastCampaigns from "pages/app/notifications/BroadcastCampaigns";
import NotificationLogs from "pages/app/notifications/NotificationLogs";

// AUTH 
import Login  from 'pages/auth/login';

// 404
import  NotFound from   'pages/404'
import InventoryNewDocument from "pages/app/inventory-document/newDocument";
import AddMergePaymentReceipt from "pages/app/provisionalReceip/addMergePaymentReceipt";
import MergePendingPaymentReceipt from "pages/app/provisionalReceip/mergePendingPaymentReceipt";
import InventoryUpdatePurchaseplan from "pages/app/inventory-update-purchaseplan";
import Leads from "pages/app/Leads";
import AddNewLead from "pages/app/Leads/AddLead";
import Campaigns from "pages/app/compains";
import AddNewCampaign from "pages/app/compains/AddNewCampaign";
import Payments from "pages/app/payments";
import LeadTimelinePage from "pages/app/Leads/LeadActivity";



const AdminUsers = Loadable(lazy(() => import('pages/app/admin-users')));
const AddAdminUser = Loadable(lazy(() => import('pages/app/admin-users/AddAdminUser')));
const EditAdminUser = Loadable(lazy(() => import('pages/app/admin-users/EditAdminUser')));








const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', exact: true, element: <Navigate to='/auth/login' /> },
      { path: '*', element: <Navigate to='/page-not-found' /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', exact: true, element: <PublicRoute element={<Login />} /> },
      { path: '*', element: <Navigate to='/page-not-found' /> },
    ],
  },
  {
    path: '/app',
    element: <MainLayout />,
    children: [
      { path: '/app', exact: true, element: <ProtectedRoute    element={<Home />} /> },

{ path: '/app/Customer', exact: true, element: <ProtectedRoute element={<Customer />} /> },
{ path: '/app/Customer/:id', exact: true, element: <ProtectedRoute element={<CustomerDetail />} /> },
{ path: '/app/Customer-detail/:id', exact: true, element: <ProtectedRoute element={<GeneralUpdate />} /> },
{ path: '/app/Customer-detail/:id/next-of-kin', exact: true, element: <ProtectedRoute element={<NextKinUpdate />} /> },
{ path: '/app/Customer-detail/:id/notifications', exact: true, element: <ProtectedRoute element={<NotificationUpdate />} /> },
{ path: '/app/Customer-detail/:id/document', exact: true, element: <ProtectedRoute element={<DocumentUpdate/>} /> },
{ path: '/app/Customer-detail/:id/Inventorydocument', exact: true, element: <ProtectedRoute element={<AddCustomerInventoryDocument/>} /> },








{ path: '/app/Customer/add', exact: true, element: <ProtectedRoute element={<AddCustomer />} /> },
{ path: '/app/Customer/general', exact: true, element: <ProtectedRoute element={<GeneralCustomer />} /> },
{ path: '/app/Customer/:id/joint', exact: true, element: <ProtectedRoute element={<JointApplicant />} /> },
{ path: '/app/Customer/:id/next-of-kin', exact: true, element: <ProtectedRoute element={<NextOfKin />} /> },
{ path: '/app/Customer/:id/notifications', exact: true, element: <ProtectedRoute element={<CusomerNotification />} /> },
{ path: '/app/Customer/:id/documents', exact: true, element: <ProtectedRoute element={<CustomerDocuments />} /> },
{ path: '/app/Customer/:id/assign-inventory', exact: true, element: <ProtectedRoute element={<AssignCusomerInventory />} /> },
{ path: '/app/Customer/:id/inventory-documents', exact: true, element: <ProtectedRoute element={<CustomerInventoryDocument />} /> },
{ path: '/app/Customer/:id/installment-plan', exact: true, element: <ProtectedRoute element={<CustomerInstallment />} /> },


{ path: '/app/inventory', exact: true, element: <ProtectedRoute element={<Inventory />} /> },
{ path: '/app/inventory/add', exact: true, element: <ProtectedRoute element={<AddInventory />} /> },
{ path: '/app/inventory/upload', exact: true, element: <ProtectedRoute element={<UploadInventory />} /> },
{ path: '/app/inventory/assign', exact: true, element: <ProtectedRoute element={<AssignInventory />} /> },
{ path: '/app/inventory/ownership-transfer', exact: true, element: <ProtectedRoute element={<Transferinventory />} /> },
{ path: '/app/inventory/:id', exact: true, element: <ProtectedRoute element={<InventoryDetails />} /> },
{ path: '/app/inventory/:id/document', exact: true, element: <ProtectedRoute element={<InventoryDocument />} /> },
{ path: '/app/inventory/:id/newDocument', exact: true, element: <ProtectedRoute element={<InventoryNewDocument />} /> },

{
  path: '/app/inventory/:id/pay-inventory',
  exact: true,
  element: <ProtectedRoute element={<PayInventory />} />
},




{
  path: '/app/inventory/:id/purchase-plan',
  exact: true,
  element: <ProtectedRoute element={<InventoryPurchaseplan />} />
},
{
  path: '/app/inventory/:id/update-purchase-plan',
  exact: true,
  element: <ProtectedRoute element={<InventoryUpdatePurchaseplan />} />
},



{ path: '/app/payment', exact: true, element: <ProtectedRoute element={<PaymentReceipt />} /> },
{ path: '/app/payment/:id', exact: true, element: <ProtectedRoute element={<PaymentReceiptdetails />} /> },
{ path: '/app/payment/:id/verify', exact: true, element: <ProtectedRoute element={<PaymentReceiptVerify/> } /> },
{ path: '/app/payment/:id/reserved', exact: true, element: <ProtectedRoute element={<PaymentReceiptReserved/> } /> },
{ path: '/app/payment/merge', exact: true, element: <ProtectedRoute element={<AddMergePaymentReceipt />} /> },
{ path: '/app/payment/merge-pending', exact: true, element: <ProtectedRoute element={<MergePendingPaymentReceipt />} /> },

{ path: '/app/provisional-receipt', exact: true, element: <ProtectedRoute element={<ProvisionalReceipt />} /> },
{
  path:"/app/leads",
  exact:true,
  element:<ProtectedRoute element={<Leads/>}/>
},
{
  path:"/app/leads/add",
  exact:true,
  element:<ProtectedRoute element={<AddNewLead/>}/>
},
{
  path:"/app/leads/timeline/:id",
  exact:true,
  element:<ProtectedRoute element={<LeadTimelinePage/>}/>
},
{
  path:"/app/campaigns/add",
  exact:true,
  element:<ProtectedRoute element={<AddNewCampaign/>}/>
},
{
  path:"/app/campaigns",
  exact:true,
  element:<ProtectedRoute element={<Campaigns/>}/>
},
{
  path:"/app/campaignpayments",
  exact:true,
  element:<ProtectedRoute element={<Payments/>}/>
},

  {
    path: "/app/notification-templates",
    exact: true,
    element: <ProtectedRoute element={<NotificationTemplates />} />,
  },
  {
    path: "/app/notification-templates/add",
    exact: true,
    element: <ProtectedRoute element={<AddNotificationTemplates />} />,
  },
  {
    path: "/app/broadcast-campaigns",
    exact: true,
    element: <ProtectedRoute element={<BroadcastCampaigns />} />,
  },
  {
    path: "/app/notification-logs",
    exact: true,
    element: <ProtectedRoute element={<NotificationLogs />} />,
  },


{ path: '/app/provisional-receipt/add', exact: true, element: <ProtectedRoute element={<AddProvisionalReceipt />} /> },




{ path: '/app/reports', exact: true, element: <ProtectedRoute element={<Reports />} /> },
{ path: '/app/installments', exact: true, element: <ProtectedRoute element={<Installments />} /> },
{ path: '/app/installments/:id', exact: true, element: <ProtectedRoute element={<PayInstallment />} /> },

{ path: '/app/gis-map', exact: true, element: <ProtectedRoute element={<Gismap />} /> },
{ path: '/app/panel-user', exact: true, element: <ProtectedRoute element={<PanelUser />} /> },
{ path: '/app/panel-user/add', exact: true, element: <ProtectedRoute element={<AddPanelUser />} /> },



    //   { path: '/app/admin-users', exact: true, element: <AdminUsers /> },
    //   { path: '/app/admin-users/add', exact: true, element: <ProtectedRoute element={<AddAdminUser />} /> },
    //   { path: '/app/admin-users/edit/:id', exact: true, element: <ProtectedRoute element={<EditAdminUser />} /> },

      { path: '/app/settings', exact: true, element: <Setting /> },
    ],
  },
  {
    path: '/page-not-found',
    element: <BlankLayout />,
    children: [
      { path: '/page-not-found', element: <NotFound /> },
    ],
  },

  {
  path: '/digital-receipt/:id',
  element: <BlankLayout />,
  children: [
    {
      path: '/digital-receipt/:id',
      exact: true,
      element: <DigitalReceipt /> 
    },
  ],
},
];
export default Router;