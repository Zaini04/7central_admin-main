import GeneralSvg from "assets/svg/home/home/GeneralSvg";
import {
  AssignSvg,
  GernalSvg,
  DocumnetSvg,
  InstallmentSvg,
  NextKinSvg,
  NotificationSvg,
  JointSvg,
  CastSvg,
  InventoryDocumentSvg,
} from "assets/svgs/sidebar";



const menuItems = [
  {
    id: 1,
    name: "General",
    path: "/app/Customer/general",
    icon: GeneralSvg,
    exact: true,
    stepKey: "general",
  },
  {
    id: 2,
    name: "Original Buyer",
    path: "/app/Customer/:id/original-buyer",
    icon: GeneralSvg,
    exact: true,
    stepKey: "original_buyer",
  },

  {
    id: 3,
    name: "Next of Kin",
    path: "/app/Customer/:id/next-of-kin",
    icon: NextKinSvg,
    exact: false,
    stepKey: "nextOfKin",
  },
  {
    id: 4,
    name: "Referal Program",
    path: "/app/Customer/:id/referal-program",
    icon: NextKinSvg,
    exact: false,
    stepKey: "referal_program",
  },
  {
    id: 4,
    name: "Notifications",
    path: "/app/Customer/:id/notifications",
    icon: NotificationSvg,
    exact: false,
    stepKey: "notifications",
  },
  {
    id: 5,
    name: "Personal Documents",
    path: "/app/Customer/:id/documents",
    icon: DocumnetSvg,
    exact: false,
    stepKey: "documents",
  },
  {
    id: 6,
    name: "Assign Inventory",
    path: "/app/Customer/:id/assign-inventory",
    icon: AssignSvg,
    exact: false,
    stepKey: "assignInventory",
  },
  {
    id: 7,
    name: "Inventory Documents",
    path: "/app/Customer/:id/inventory-documents",
    icon: InventoryDocumentSvg,
    exact: false,
    stepKey: "inventoryDocuments",
  },
  {
    id: 8,
    name: "Installment Plan",
    path: "/app/Customer/:id/installment-plan",
    icon: InstallmentSvg,
    exact: false,
    stepKey: "installmentPlan",
  },
];






const  updateItems = [
  {
    id: 1,
    name: "General",
    path: "/app/Customer-detail/:id",
    icon: GeneralSvg,
    exact: true,
    stepKey: "general",
  },
  {
    id: 3,
    name: "Next of Kin",
    path: "/app/Customer-detail/:id/next-of-kin",
    icon: NextKinSvg,
    exact: false,
    stepKey: "nextOfKin",
  },
  {
    id: 4,
    name: "Notifications",
    path: "/app/Customer-detail/:id/notifications",
    icon: NotificationSvg,
    exact: false,
    stepKey: "notifications",
  },
  {
    id: 5,
    name: "Personal Documents",
    path: "/app/Customer-detail/:id/document",
    icon: DocumnetSvg,
    exact: false,
    stepKey: "documents",
  },
 
];





const CUSTOMER_RELATION_TYPES = [
  "Spouse",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Grandson",
  "Granddaughter",
  "Uncle",
  "Aunt",
  "Nephew",
  "Niece",
  "Cousin"
];

const customerStatus = [
  'Not Assigned',
  'One Go Payment',
  'Full Paid',
  'Default',
  'Blocked',
  'Deleted',
  'Overdue',
  'In Installment'
];
// const customerStatus = ['not_assigned' , 'one_go_payment' , 'full_paid','default','blocked' , 'deleted','overdue','in_installment'];
export  {menuItems,customerStatus,CUSTOMER_RELATION_TYPES,updateItems};
