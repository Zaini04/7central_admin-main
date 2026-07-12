import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportButton from 'components/global/exportbutton/ExportButton';
import Search from 'components/global/Search';
import SelectInput from 'components/global/form/SelectInput';
import PaymentsTable from 'components/payments/PaymentTable';

const DUMMY_PAYMENTS = [
  { _id: "1", no: "01", invoiceId: "CA-4.04M-29", company: "SummitPeak", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Cheque", txId: "TXNID1234567890", logoColor: "text-blue-600" },
  { _id: "2", no: "02", invoiceId: "CA-4.04M-29", company: "SilverHawk", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Pay Order", txId: "TXNID1234567890", logoColor: "text-emerald-600" },
  { _id: "3", no: "03", invoiceId: "CA-4.04M-29", company: "RiverStone Ventur", amount: 600000.00, dueDate: "24-10-2025", paidBy: "PDC", txId: "TXNID1234567890", logoColor: "text-black" },
  { _id: "4", no: "04", invoiceId: "CA-4.04M-29", company: "Redwood Inc", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Cash", txId: "TXNID1234567890", logoColor: "text-cyan-500" },
  { _id: "5", no: "05", invoiceId: "CA-4.04M-29", company: "NovaWave LLC", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Online Transfer", txId: "TXNID1234567890", logoColor: "text-amber-700" },
  { _id: "6", no: "06", invoiceId: "CA-4.04M-29", company: "HarborView", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Online Transfer", txId: "TXNID1234567890", logoColor: "text-rose-600" },
  { _id: "7", no: "07", invoiceId: "CA-4.04M-29", company: "Golden Gate Ltd", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Online Transfer", txId: "TXNID1234567890", logoColor: "text-gray-700" },
  { _id: "8", no: "08", invoiceId: "CA-4.04M-29", company: "CoastalStar Co.", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Foreign Remittance", txId: "TXNID1234567890", logoColor: "text-sky-400" },
  { _id: "9", no: "09", invoiceId: "CA-4.04M-29", company: "Bright Bridge Grp", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Cash", txId: "TXNID1234567890", logoColor: "text-blue-700" },
  { _id: "10", no: "10", invoiceId: "CA-4.04M-29", company: "BlueSky Industries", amount: 600000.00, dueDate: "24-10-2025", paidBy: "Adjustments", txId: "TXNID1234567890", logoColor: "text-orange-600" },
];

const Payments = () => {
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [inactive, setInactive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="flex flex-col gap-5 w-full bg-[#F8F9FA] p-1">
      {/* Top Header Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between px-1 w-full">
        <h2 className="page-heading">Payments</h2>
        <div className="flex items-center gap-2">
          <ExportButton
            title="Export Data"
            tableData={DUMMY_PAYMENTS}
            columns={["No", "Invoice ID", "Company Name", "Amount", "Due Date", "Paid By", "Transaction ID"]}
            fileName="Payments_Report"
            bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}

          />
        </div>
      </div>

      {/* Grid Filters Control Row */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          <Search
            keyword={keyword}
            setKeyword={setKeyword}
            style={{ height: 40 }}
            placeholder="Search Phone/Name"
          />
          <SelectInput
            name="date"
            placeholder="Date"
            options={["Last 7 Days", "This Month", "Custom Range"]}
            onSelect={setDateFilter}
          />
          <SelectInput
            name="location"
            placeholder="Location"
            options={["Islamabad", "Lahore", "Karachi"]}
            onSelect={setLocationFilter}
          />
        </div>

        {/* Inactive Toggle Switch Component */}
        {/* <div className="flex items-center gap-2 ml-auto">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={inactive}
              onChange={(e) => setInactive(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-400"></div>
            <span className="ml-2 text-sm font-medium text-gray-400">Inactive</span>
          </label>
        </div> */}
      </div>

      {/* Content Sheet Area Canvas */}
      <div className="w-full table-container rounded-xl bg-white flex flex-col gap-2 pb-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between w-full px-4 pt-4 border-b border-gray-50 pb-3">
          <p className="font-semibold text-[#1F2020] text-sm md:text-base">All Payments</p>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Sort By:</span>
            <select className="border-none bg-transparent font-medium text-gray-700 cursor-pointer focus:ring-0 text-xs">
              <option>Last 7 Days</option>
              <option>Newest</option>
              <option>Highest Amount</option>
            </select>
          </div>
        </div>

        {/* Inner Grid Data Content Table */}
        <PaymentsTable
          docs={DUMMY_PAYMENTS}
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

export default Payments;