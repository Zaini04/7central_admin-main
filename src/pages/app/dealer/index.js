import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton'; // Kept global export components
import Titlebtn from 'components/global/Titlebtn';
import LeadsFilter from 'components/leads/LeadsFilter';
import LeadsTable from 'components/leads/LeadsTable';
import CallStatusModal from 'components/leads/CallModal';
import ScheduleModal from 'components/leads/ScheduleModal';
import ScheduleVisitModal from 'components/leads/ScheduleModal';
import DealerTable from 'components/dealer/dealerTable';
import DealerFilter from 'components/dealer/DealerFilter';

// Exact dummy data mapped directly from your image
const DUMMY_LEADS = [
  { _id: "1", no: "01",codeId: "WAJ25102401", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-1", centralRegistrationNumber:"7Central-1", date: "6-24-2026 2:00:03PM"   , location:"Multan", status:"Active"},
  { _id: "2", no: "02",codeId: "WAJ25102402", name: "Laeonardo ds", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-2", centralRegistrationNumber:"7Central-2",  date: "6-24-2026 2:00:03PM"  , location:"Lahore", status:"Active" },
  { _id: "3", no: "03",codeId: "WAJ25102403", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-3", centralRegistrationNumber:"7Central-3",  date: "6-24-2026 2:00:03PM"  , location:"Islamabad", status:"Inactive" },
  { _id: "4", no: "04",codeId: "WAJ25102404", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-4", centralRegistrationNumber:"7Central-4", date: "6-24-2026 2:00:03PM"   , location:"Multan", status:"Active"},
  { _id: "5", no: "05",codeId: "WAJ25102405", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-5", centralRegistrationNumber:"7Central-5",  date: "6-24-2026 2:00:03PM"  , location:"Lahore", status:"Inactive" },
  { _id: "6", no: "06",codeId: "WAJ25102406", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-6", centralRegistrationNumber:"7Central-6",  date: "6-24-2026 2:00:03PM"  , location:"Karachi", status:"Inactive" },
  { _id: "7", no: "07",codeId: "WAJ25102407", name: "Kaiser Brown", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-7", centralRegistrationNumber:"7Central-7",  date: "6-24-2026 2:00:03PM"  , location:"Multan", status:"Active" },
  { _id: "8", no: "08",codeId: "WAJ25102408", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-8", centralRegistrationNumber:"7Central-8", date: "6-24-2026 2:00:03PM"   , location:"Pehsawar", status:"Active"},
  { _id: "9", no: "09",codeId: "WAJ25102409", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-9", centralRegistrationNumber:"7Central-9", date: "6-24-2026 2:00:03PM"   , location:"Multan", status:"Inactive"},
  { _id:"10", no: "10",codeId: "WAJ25102400", name: "Isagi Yoichi", avatar: "", phone: "0301-2345678", dhaRegistrationNumber:"dha-10", centralRegistrationNumber:"7Central-10",  date: "6-24-2026 2:00:03PM"  , location:"Sargodha", status:"Active" },
];

const Dealer = () => {
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
          <h2 className="page-heading">Dealer</h2>
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
            label="Add New Dealer"
            url="/app/dealer/add"
          />
        </div>
      </div>

      {/* Filter Options Row */}
      <DealerFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setDateFilter={setDateFilter}
        setLocationFilter={setLocationFilter}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
      />

      {/* Main Content Card container */}
      

        {/* Table View */}
        <DealerTable
       
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

export default Dealer;