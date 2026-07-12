import InventorySvg from "assets/svg/home/sidebar/InventorySvg";
import InstallmentSvg from "assets/svg/home/sidebar/InstallmentSvg";
import PannelUsersSvg from "assets/svg/home/sidebar/PanelUsers";
import { AddsSvg, CastSvg, ContentSvg, HomeSvg, NotifySvg, SubCatSvg, UsersSvg ,ReciptUserSvg} from "assets/svgs/sidebar";
import SettingSvg from "assets/svg/home/sidebar/SettingSvg";
import PaymentReceipt from "assets/svg/home/sidebar/PaymentReceipt";
import ReportsSvg from "assets/svg/home/sidebar/ReportsSvg";
import LeadsSvg from "assets/svg/home/sidebar/LeadsSvg";
import CompainsSvg from "assets/svg/home/sidebar/CompainsSvg";
import PaymentSvg from "assets/svg/home/sidebar/PaymentsSvg";
import NotificationTemplateSvg from "assets/svg/home/sidebar/NotificationTemplateSvg";
import BroadCastSvg from "assets/svg/home/sidebar/BroadCastSvg";
import NotificationLogs from "assets/svg/home/sidebar/NotificationLogs";
import MapsSvg from "assets/svg/home/sidebar/MapsSvg";
import PeoplesSvg from "assets/svg/home/sidebar/PeoplesSvg";
import DashboardSvg from "assets/svg/home/sidebar/DashboardSvg";

const menuItems = [
     {
        id : 0 , 
        name : 'Dashboard' ,
        path : '/app' , 
        icon : DashboardSvg ,
        exact : true ,
    } ,
        {
        id : 1, 
        name : 'Inventory' ,
        path : '' , 
        onlyText : true ,
    } ,
    
    {
        id : 2 , 
        name : 'Customers' ,
        path : '/app/Customer' , 
        icon : PeoplesSvg ,
        exact : false ,
    } ,
    {
        id : 3 , 
        name : 'Inventory' ,
        path : '/app/inventory' , 
        icon :  InventorySvg,
        exact : false ,
    } ,
     {
        id : 4 , 
        name : 'Installments' ,
        path : '/app/installments' ,  
        icon : InstallmentSvg ,
        exact : false ,
    } ,


    {
        id : 5 , 
        name : 'Payment/Receipt' ,
        path : '/app/payment' , 
        icon : PaymentReceipt ,
        exact : false ,
    } ,


      {
        id : 6 , 
        name : 'Provisional Receipt' ,
        path : '/app/provisional-receipt' ,  
        icon : PaymentReceipt ,
        exact : false ,
    } ,
      {
        id : 7 , 
        name : 'Reports' ,
        path : '/app/reports' ,  
        icon : ReportsSvg ,
        exact : false ,
    } ,


{
        id : 8 , 
        name : 'CRM' ,
        path : '' , 
        onlyText : true ,
    } ,
    {
        id : 9, 
        name : 'Leads' ,
          path: '/app/leads',
        icon : LeadsSvg ,
        exact : false ,
    } ,
    {
        id : 10, 
        name : 'Compains' ,
          path: '/app/campaigns',
        icon : CompainsSvg ,
        exact : false ,
    } ,
    {
        id : 11, 
        name : 'Payments' ,
          path: '/app/campaignpayments',
        icon : PaymentSvg ,
        exact : false ,
    } ,

    {
        id : 12 , 
        name : 'Notifications' ,
        path : '' , 
        onlyText : true ,
    } ,


     {
        id : 13, 
        name : 'Notifications Templates' ,
          path: '/app/notification-templates',
        icon : NotificationTemplateSvg,
        exact : false ,
    } ,
        {
        id : 14, 
        name : 'Broadcast Campaigns' ,
          path: '/app/broadcast-campaigns',
        icon : BroadCastSvg ,
        exact : false ,
     } ,
        {
        id : 15,
        name : 'Notification Logs' ,
          path: '/app/notification-logs',
        icon : NotificationLogs ,
        exact : false ,
     } ,

    {
        id : 16 , 
        name : 'Settings' ,
        path : '' , 
        onlyText : true ,
    } ,
    {
        id : 17 , 
        name : 'Panel Users' ,
        path : '/app/panel-user' , 
        icon : PannelUsersSvg ,
        exact : false ,
    } ,
     {
        id : 18 , 
        name : 'GIS Map.' ,
        path : '/app/gis-map' , 
        icon :  MapsSvg,
        exact : false ,
    } ,
    {
        id : 19, 
        name : 'Settings' ,
        path : '/app/settings' , 
        icon : SettingSvg,
        exact : false ,
    } ,
   
    // {
    //     id : 8 , 
    //     name : 'Panel Users' ,
    //     path : '/app/admin-users' , 
    //     icon : UsersSvg ,
    //     exact : false ,
    // } ,

]


export default menuItems;