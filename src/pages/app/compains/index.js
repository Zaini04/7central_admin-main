import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton';
import Titlebtn from 'components/global/Titlebtn';
import CampaignsCards from 'components/compaigns/CompaingsCards';
import CampaignsFilter from 'components/compaigns/ComaignsFilter';
import CampaignsTable from 'components/compaigns/CompaignsTable';

const DUMMY_CAMPAIGNS = [
  { _id: "1", no: "01", name: "SummitPeak", type: "Public Relations", metrics: { totalProspects: "150", newLeads: "45", notContacted: "30", followUp: "40", visitPlan: "20", deadLeads: "10", futurePlan: "5" }, status: "Active" },
  { _id: "2", no: "02", name: "SilverHawk", type: "Content Marketing", metrics: { totalProspects: "200", newLeads: "60", notContacted: "40", followUp: "50", visitPlan: "30", deadLeads: "15", futurePlan: "5" }, status: "Ended" },
  { _id: "3", no: "03", name: "RiverStone Ventur", type: "Social Marketing", metrics: { totalProspects: "120", newLeads: "35", notContacted: "25", followUp: "30", visitPlan: "15", deadLeads: "10", futurePlan: "5" }, status: "Active" },
  { _id: "4", no: "04", name: "Redwood Inc", type: "Brand", metrics: { totalProspects: "180", newLeads: "50", notContacted: "35", followUp: "45", visitPlan: "25", deadLeads: "15", futurePlan: "10" }, status: "Active" },
  { _id: "5", no: "05", name: "NovaWave LLC", type: "Sales", metrics: { totalProspects: "250", newLeads: "80", notContacted: "50", followUp: "60", visitPlan: "40", deadLeads: "12", futurePlan: "8" }, status: "Active" },
  { _id: "6", no: "06", name: "HarborView", type: "Media", metrics: { totalProspects: "90", newLeads: "25", notContacted: "20", followUp: "20", visitPlan: "15", deadLeads: "7", futurePlan: "3" }, status: "Ended" },
  { _id: "7", no: "07", name: "Golden Gate Ltd", type: "Rebranding", metrics: { totalProspects: "300", newLeads: "95", notContacted: "55", followUp: "80", visitPlan: "50", deadLeads: "12", futurePlan: "8" }, status: "Ended" },
  { _id: "8", no: "08", name: "CoastalStar Co.", type: "Product launch", metrics: { totalProspects: "140", newLeads: "40", notContacted: "30", followUp: "35", visitPlan: "20", deadLeads: "10", futurePlan: "5" }, status: "Active" },
  { _id: "9", no: "09", name: "Bright Bridge Grp", type: "Public Relations", metrics: { totalProspects: "160", newLeads: "45", notContacted: "35", followUp: "40", visitPlan: "25", deadLeads: "10", futurePlan: "5" }, status: "Ended" },
  { _id: "10", no: "10", name: "BlueSky Industries", type: "Social Marketing", metrics: { totalProspects: "220", newLeads: "70", notContacted: "45", followUp: "55", visitPlan: "30", deadLeads: "15", futurePlan: "5" }, status: "Ended" },
];

const Campaigns = () => {
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Total Campaigns");
  const [showInactive, setShowInactive] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Live dynamic count calculation
  const totalCount = DUMMY_CAMPAIGNS.length;
  const activeCount = DUMMY_CAMPAIGNS.filter(c => c.status === "Active").length;
  const endedCount = DUMMY_CAMPAIGNS.filter(c => c.status === "Ended").length;

  const tabs = [
    { name: "Total Campaigns", count: totalCount },
    { name: "Active Campaigns", count: activeCount },
    { name: "Ended Campaigns", count: endedCount }
  ];

  // Logic to filter data based on selected active tab
  const getFilteredData = () => {
    if (activeTab === "Active Campaigns") {
      return DUMMY_CAMPAIGNS.filter(campaign => campaign.status === "Active");
    }
    if (activeTab === "Ended Campaigns") {
      return DUMMY_CAMPAIGNS.filter(campaign => campaign.status === "Ended");
    }
    return DUMMY_CAMPAIGNS; // Total Campaigns tabs show all records
  };

  const filteredCampaigns = getFilteredData();

  return (
    <div className="flex flex-col gap-5 w-full bg-[#F8F9FA] p-1">
      {/* Top Heading Row */}
      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between w-full">
        <h2 className="page-heading">Campaigns</h2>
        <div className="flex items-center gap-2">
          <ExportButton
            title="Export Data"
            tableData={DUMMY_CAMPAIGNS}
            columns={["No", "Name", "Type", "Status"]}
            fileName="Campaigns_Report"
            bgcolor="bg-white"
            colortext="#2D3748"
            textColor="text-primary"
          />
          <Titlebtn
            label="Add New Campaign"
            url="/app/campaigns/add"
          />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <CampaignsCards />

      {/* Global Filter Bar */}
      <CampaignsFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setDateFilter={setDateFilter}
        setLocationFilter={setLocationFilter}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
      />

      {/* Table Container Wrapper */}
      <div className="w-full table-container rounded-xl bg-white flex flex-col gap-2 pb-4 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-1.5">
          <p className="page-heading px-4">All Campaigns</p>
        </div>

        {/* Inner Sub-navigation Tabs and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray3 mx-4 mt-2 gap-2">
          <div className="flex gap-6 text-xs font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  setCurrentPage(1); // Reset page to 1 when tab changes
                }}
                className={`pb-2 relative whitespace-nowrap transition-all text-xs ${
                  activeTab === tab.name ? "text-red-500 font-semibold" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.name}
                {tab.count !== null && <span className="ml-1 text-[10px] text-red-500 font-semibold">{tab.count}</span>}
                {activeTab === tab.name && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded" />
                )}
              </button>
            ))}
          </div>

          {/* <div className="flex items-center gap-1.5 text-xs text-gray-400 self-end sm:self-auto">
            <span>Sort By:</span>
            <select className="border-none bg-transparent font-medium text-gray-700 cursor-pointer focus:ring-0 text-xs">
              <option>Last 7 Days</option>
              <option>Newest</option>
            </select>
          </div> */}
        </div>

        {/* Content Table view */}
        <CampaignsTable
          docs={filteredCampaigns}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          docsCount={filteredCampaigns.length}
          pages={Math.ceil(filteredCampaigns.length / limit) || 1}
        />
      </div>
    </div>
  );
};

export default Campaigns;