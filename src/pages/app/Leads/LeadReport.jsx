import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton'; // Kept global export components
import Titlebtn from 'components/global/Titlebtn';
import LeadsFilter from 'components/leads/LeadsFilter';
import LeadsTable from 'components/leads/LeadsTable';
import CallStatusModal from 'components/leads/CallModal';
import ScheduleModal from 'components/leads/ScheduleModal';
import ScheduleVisitModal from 'components/leads/ScheduleModal';
import LeadReportTable from 'components/leads/LeadReportTable';

// Exact dummy data mapped directly from your image
const DUMMY_LEADS = [
  { 
    _id: "1", 
    no: "01", 
    name: "Isagi Yoichi", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Facebook Campaign", 
    date: "6-24-2026", 
    currentStage: "Follow Up", 
    lastActivity: "Call Completed", 
    nextAction: "Call Again (12 Jul)", 
    result: "Pending" 
  },
  { 
    _id: "2", 
    no: "02", 
    name: "Laeonardo", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Local Referral", 
    date: "6-24-2026", 
    currentStage: "Visit Plan", 
    lastActivity: "Site Visit Scheduled", 
    nextAction: "Visit on 14 Jul", 
    result: "Pending" 
  },
  { 
    _id: "3", 
    no: "03", 
    name: "Kaiser Brown", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Google Ads", 
    date: "6-24-2026", 
    currentStage: "Deal Closed", 
    lastActivity: "Booking Confirmed", 
    nextAction: "------", 
    result: "Deal Done" 
  },
  { 
    _id: "4", 
    no: "04", 
    name: "Kaiser Brown", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Walking Customer", 
    date: "6-24-2026", 
    currentStage: "Dead Lead", 
    lastActivity: "Budget Issue", 
    nextAction: "Cancelled", 
    result: "Booking Confirmed" 
  },
  { 
    _id: "5", 
    no: "05", 
    name: "Kaiser Brown", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Facebook Campaign", 
    date: "6-24-2026", 
    currentStage: "Not Contacted", 
    lastActivity: "No Response", 
    nextAction: "Call Today", 
    result: "Pending" 
  },
  { 
    _id: "6", 
    no: "06", 
    name: "Kaiser Brown", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Local Referral", 
    date: "6-24-2026", 
    currentStage: "Dead Lead", 
    lastActivity: "Site Visit Scheduled", 
    nextAction: "Site Visit Scheduled", 
    result: "Site Visit Scheduled" 
  },
  { 
    _id: "7", 
    no: "07", 
    name: "Kaiser Brown", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Google Ads", 
    date: "6-24-2026", 
    currentStage: "Follow Up", 
    lastActivity: "Customer Interested", 
    nextAction: "Send Price Details", 
    result: "In Progress" 
  },
  { 
    _id: "8", 
    no: "08", 
    name: "Isagi Yoichi", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Local Referral", 
    date: "6-24-2026", 
    currentStage: "Not Contacted", 
    lastActivity: "Budget Issue", 
    nextAction: "Budget Issue", 
    result: "Budget Issue" 
  },
  { 
    _id: "9", 
    no: "09", 
    name: "Isagi Yoichi", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Walking Customer", 
    date: "6-24-2026", 
    currentStage: "Dead Lead", 
    lastActivity: "Budget Issue", 
    nextAction: "Budget Issue", 
    result: "Budget Issue" 
  },
  { 
    _id: "10", 
    no: "10", 
    name: "Isagi Yoichi", 
    avatar: "", 
    phone: "0301-2345678", 
    source: "Local Referral", 
    date: "6-24-2026", 
    currentStage: "Follow Up", 
    lastActivity: "Follow Up", 
    nextAction: "Follow Up", 
    result: "Follow Up" 
  }
];
const LeadReport = () => {
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeTab, setActiveTab] = useState("New Leads");
  const [showInactive, setShowInactive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

 

  return (
    <>
    <div className="flex flex-col gap-5 w-full ">
      {/* Upper Top Bar */}
      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between w-full">
        <div>
          <h2 className="page-heading">Lead Reports</h2>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton
            title="Export Data"
            tableData={DUMMY_LEADS}
            columns={["No", "Lead Name", "Phone Number", "Lead Source", "Campaign", "Assigned", "Create Date"]}
            fileName="Leads_Report"
            bgcolor="bg-white"
            colortext="#2D3748"
            textColor="text-primary"
          />
          {/* <Titlebtn
            label="Add New Lead"
            url="/app/leads/add"
          /> */}
        </div>
      </div>

      {/* Filter Options Row */}
      <LeadsFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setDateFilter={setDateFilter}
        setLocationFilter={setLocationFilter}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
      />

      {/* Main Content Card container */}
       

        {/* Table View */}
        <LeadReportTable
          data={DUMMY_LEADS}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          totalCount={50} // Mock total records entry count
        />
    </div>
    </>
  );
};

export default LeadReport;