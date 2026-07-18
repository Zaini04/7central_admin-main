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

/**
 * Sidebar structure:
 * - Items WITHOUT `children` are rendered as plain links (e.g. Dashboard).
 * - Items WITH `children` are rendered as collapsible group headers.
 *   Clicking the header toggles visibility of its `children` links.
 */
const menuItems = [
    {
        id: 0,
        name: 'Dashboard',
        icon: DashboardSvg,
        // exact: true,
        children: [
            {
                id: 2,
                name: 'Over All Dashboard',
                path: '/app',
                icon: DashboardSvg,
                exact: true,
            },
            {
                id: 3,
                name: 'Inventory Stats',
                path: '/app/dashboard_inventory',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 3,
                name: 'CRM Leads',
                path: '/app/crm-leads',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 3,
                name: 'HR',
                path: '/app/hr',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 3,
                name: ' Project Stats',
                path: '/app/project-stats',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 3,
                name: 'Stocks',
                path: '/app/stocks',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 3,
                name: 'Assets',
                path: '/app/assets',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 3,
                name: 'Accounts',
                path: '/app/accounts',
                icon: InventorySvg,
                exact: false,
            },
        
        ]
    },
    {
        id: 1,
        name: 'Inventory',
        icon: InventorySvg,
        children: [
            {
                id: 2,
                name: 'Customers',
                path: '/app/Customer',
                icon: PeoplesSvg,
                exact: false,
            },
            {
                id: 3,
                name: 'Inventory',
                path: '/app/inventory',
                icon: InventorySvg,
                exact: false,
            },
            {
                id: 4,
                name: 'Installments',
                path: '/app/installments',
                icon: InstallmentSvg,
                exact: false,
            },
            {
                id: 5,
                name: 'Payment/Receipt',
                path: '/app/payment',
                icon: PaymentReceipt,
                exact: false,
            },
            {
                id: 6,
                name: 'Provisional Receipt',
                path: '/app/provisional-receipt',
                icon: PaymentReceipt,
                exact: false,
            },
            {
                id: 7,
                name: 'Reports',
                path: '/app/reports',
                icon: ReportsSvg,
                exact: false,
                superAdminOnly: true,
            },
        ],
    },
    {
        id: 8,
        name: 'CRM',
        icon: CompainsSvg,
        children: [
            {
                id: 9,
                name: 'Leads',
                path: '/app/leads',
                icon: LeadsSvg,
                exact: false,
            },
            {
                id: 9,
                name: 'Lead Report',
                path: '/app/lead-report',
                icon: ReportsSvg,
                exact: false,
            },
            {
                id: 10,
                name: 'Compaigns',
                path: '/app/campaigns',
                icon: CompainsSvg,
                exact: false,
            },
            {
                id: 11,
                name: 'Payments',
                path: '/app/campaignpayments',
                icon: PaymentSvg,
                exact: false,
            },
            {
                id: 12,
                name: 'Dealer',
                path: '/app/dealer',
                icon: PaymentSvg,
                exact: false,
            },
        ],
    },
    {
        id: 13,
        name: 'Notifications',
        icon: NotificationTemplateSvg,
        children: [
            {
                id: 14,
                name: 'Notifications Templates',
                path: '/app/notification-templates',
                icon: NotificationTemplateSvg,
                exact: false,
            },
            {
                id: 15,
                name: 'Broadcast Campaigns',
                path: '/app/broadcast-campaigns',
                icon: BroadCastSvg,
                exact: false,
            },
            {
                id: 16,
                name: 'Notification Logs',
                path: '/app/notification-logs',
                icon: NotificationLogs,
                exact: false,
            },
        ],
    },
    {
        id: 17,
        name: 'Settings',
        icon: SettingSvg,
        children: [
            {
                id: 18,
                name: 'Panel Users',
                path: '/app/panel-user',
                icon: PannelUsersSvg,
                exact: false,
            },
            {
                id: 19,
                name: 'GIS Map.',
                path: '/app/gis-map',
                icon: MapsSvg,
                exact: false,
            },
            {
                id: 20,
                name: 'Settings',
                path: '/app/settings',
                icon: SettingSvg,
                exact: false,
            },
        ],
    },
];

export default menuItems;