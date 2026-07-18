import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton'; // Kept global export components
import Titlebtn from 'components/global/Titlebtn';
import LeadsFilter from 'components/leads/LeadsFilter';
import LeadsTable from 'components/leads/LeadsTable';
import CallStatusModal from 'components/leads/CallModal';
import ScheduleModal from 'components/leads/ScheduleModal';
import ScheduleVisitModal from 'components/leads/ScheduleModal';

// Exact dummy data mapped directly from your image
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

 const STATUS_TAB_MAP = {
  "Not Contacted": "Not Contacted",
  "Interested": "Follow Up",
  "Follow Up": "Follow Up",
  "Contact Later": "Future Plan",
  "Future Plan": "Future Plan",
  "Schedule Visit": "Visit Plan",
  "Not Interested": "Dead Leads",
  "Irrelevant": "Dead Leads",
};
const Leads = () => {
   const [leads, setLeads] = useState(
    DUMMY_LEADS.map((l) => ({ ...l, status: null, nextActionDate: "" }))
  );
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeTab, setActiveTab] = useState("New Leads");
  const [showInactive, setShowInactive] = useState(false);
    const [callModal,setCallModal] = useState(false)
    const [callData,setCallData]= useState([])
    const [scheduleModal,setScheduleModal] = useState(false)
    const [scheduleData,setScheduleData]= useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);


    const handleSaveCall = (leadId, payload) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === leadId
          ? {
              ...lead,
              status: payload.responseType,
              nextActionDate: payload.nextActionDate,
              profession: payload.profession,
              notes: payload.notes,
            }
          : lead
      )
    );
  };


  const filteredLeads = leads.filter((lead) =>
    activeTab === "New Leads"
      ? !lead.status
      : STATUS_TAB_MAP[lead.status] === activeTab
  );

 const tabs = [
    { name: "New Leads", count: leads.filter((l) => !l.status).length },
    { name: "Not Contacted", count: null },
    { name: "Follow Up", count: null },
    { name: "Visit Plan", count: null },
    { name: "Future Plan", count: null },
    { name: "Dead Leads", count: null },
  ];

 

  return (
    <>
    {callModal && <CallStatusModal  setCallStatusModal={setCallModal} callData={callData} onSave={handleSaveCall} />}
    {scheduleModal && <ScheduleVisitModal  setScheduleVisitModal={setScheduleModal} visitData={scheduleData} />}
    <div className="flex flex-col gap-5 w-full ">
      {/* Upper Top Bar */}
      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between w-full">
        <div>
          <h2 className="page-heading">Leads</h2>
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
          <Titlebtn
            label="Add New Lead"
            url="/app/leads/add"
          />
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        {/* Inner Header Row with Tabs and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray3  mb-4 gap-4">
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`pb-3 relative text-xs transition-all whitespace-nowrap ${
                  activeTab === tab.name ? "text-red-500 font-semibold" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.name}
                {tab.count && <span className="ml-1 text-[10px] text-red-500 font-semibold">{tab.count}</span>}
                {activeTab === tab.name && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded" />
                )}
              </button>
            ))}
          </div>

          {/* <div className="flex items-center gap-2 text-xs text-gray-500 self-end md:self-auto">
            <span>Sort By:</span>
            <select className="border-none bg-transparent font-medium text-gray-700 cursor-pointer focus:ring-0">
              <option>Last 7 Days</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div> */}
        </div>

        {/* Table View */}
        <LeadsTable
        setCallData={setCallData}
        setScheduleData={setScheduleData}
        setScheduleModal={setScheduleModal}
        setCallModal={setCallModal}
          data={filteredLeads}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          totalCount={filteredLeads.length} // Mock total records entry count
        />
      </div>
    </div>
    </>
  );
};

export default Leads;