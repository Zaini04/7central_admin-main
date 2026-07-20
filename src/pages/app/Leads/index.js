import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton'; // Kept global export components
import Titlebtn from 'components/global/Titlebtn';
import LeadsFilter from 'components/leads/LeadsFilter';
import LeadsTable from 'components/leads/LeadsTable';
import CallStatusModal from 'components/leads/CallModal';
import ScheduleModal from 'components/leads/ScheduleModal';
import ScheduleVisitModal from 'components/leads/ScheduleModal';
import { useDispatch, useSelector } from 'react-redux';
import { markResponse } from 'redux/slices/leadsSlice';



 const STATUS_TAB_MAP = {
  "Not Contacted": "Not Contacted",
  "Interested": "Follow Up",
  "Follow Up": "Follow Up",
  "Contact Later": "Future Plan",
  "Future Plan": "Future Plan",
  "Schedule Visit": "Visit Plan",
  "Not Interested": "Dead Leads",
  "Irrelevant": "Dead Leads",
    "Successful": "Successful Leads",   
};
const Leads = () => {

  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.list);
  //  const [leads, setLeads] = useState(
  //   DUMMY_LEADS.map((l) => ({ ...l, status: null, nextActionDate: "" }))
  // );
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
      dispatch(markResponse({leadId,...payload}))
    // setLeads((prev) =>
    //   prev.map((lead) =>
    //     lead._id === leadId
    //       ? {
    //           ...lead,
    //           status: payload.responseType,
    //           nextActionDate: payload.nextActionDate,
    //           profession: payload.profession,
    //           notes: payload.notes,
    //         }
    //       : lead
    //   )
    // );
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
      { name: "Successful Leads", count: leads.filter((l) => l.status === "Successful").length },  
    
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
            tableData={filteredLeads}
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
                className={`pb-3  relative text-xs transition-all whitespace-nowrap ${
                  activeTab === tab.name ? "text-red-500 font-semibold" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.name}
                 <span className="ml-1 text-[10px] text-red-500 font-semibold">{tab.count}</span>
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