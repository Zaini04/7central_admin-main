import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton';
import Titlebtn from 'components/global/Titlebtn';
import CampaignsCards from 'components/compaigns/CompaingsCards';
import CampaignsFilter from 'components/compaigns/ComaignsFilter';
import CampaignsTable from 'components/compaigns/CompaignsTable';

const DUMMY_CAMPAIGNS = [
  { _id: "1", no: "01", name: "SummitPeak", type: "Public Relations", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Success" },
  { _id: "2", no: "02", name: "SilverHawk", type: "Content Marketing", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Pending" },
  { _id: "3", no: "03", name: "RiverStone Ventur", type: "Social Marketing", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Paused" },
  { _id: "4", no: "04", name: "Redwood Inc", type: "Brand", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Pending" },
  { _id: "5", no: "05", name: "NovaWave LLC", type: "Sales", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Bounced" },
  { _id: "6", no: "06", name: "HarborView", type: "Media", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Paused" },
  { _id: "7", no: "07", name: "Golden Gate Ltd", type: "Rebranding", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Success" },
  { _id: "8", no: "08", name: "CoastalStar Co.", type: "Product launch", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Bounced" },
  { _id: "9", no: "09", name: "Bright Bridge Grp", type: "Public Relations", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Paused" },
  { _id: "10", no: "10", name: "BlueSky Industries", type: "Social Marketing", metrics: { opened: "40.5%", closed: "20.5%", unsubscribe: "30.5%", delivered: "70.5%", conversation: "35.0%" }, status: "Bounced" },
];

const Campaigns = () => {
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Active Campaign");
  const [showInactive, setShowInactive] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const tabs = [
    { name: "Active Campaign", count: 24 },
    { name: "Complete Campaign", count: null },
    { name: "Archived Campaign", count: null }
  ];

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray3 mx-4  mt-2 gap-2">
          <div className="flex gap-6 text-xs font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`pb-2  relative whitespace-nowrap transition-all text-xs ${
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

          <div className="flex items-center gap-1.5 text-xs text-gray-400 self-end sm:self-auto">
            <span>Sort By:</span>
            <select className="border-none bg-transparent font-medium text-gray-700 cursor-pointer focus:ring-0 text-xs">
              <option>Last 7 Days</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Content Table view */}
        <CampaignsTable
          docs={DUMMY_CAMPAIGNS}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          docsCount={50}
          pages={5}
        />
      </div>
    </div>
  );
};

export default Campaigns;