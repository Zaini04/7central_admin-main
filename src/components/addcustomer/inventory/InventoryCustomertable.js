import { useState } from "react";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import img from "assets/images/img2.jpg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";

const InventoryCustomertable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const tableData = [
    {
      id: 1,
      no: "001",
      type: "Residential",
      sector: "TPA",
      plotNo: "45-A",
      number: "CB-203",
      fullNumber: "TP-CB-4.04M-29",
      plotSize: "10 Marla",
    },
    {
      id: 2,
      no: "002",
      type: "Commercial",
      sector: "TPB",
      plotNo: "22-B",
      number: "CB-304",
      fullNumber: "TP-CB-3.05M-22",
      plotSize: "5 Marla",
    },
    {
      id: 3,
      no: "003",
      type: "Residential",
      sector: "TPC",
      plotNo: "18-C",
      number: "CB-405",
      fullNumber: "TP-CB-2.08M-18",
      plotSize: "8 Marla",
    },
  ];

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(tableData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className=" text-gunmetal font-semibold">All Assigned Inventories</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">
                <label className="relative inline-block w-[16px] h-[16px]">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === tableData.length &&
                      tableData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="peer appearance-none w-full h-full border border-gray3 rounded-[5px] checked:border-gray-800 cursor-pointer"
                  />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <CheckAllSVG className="w-4 h-4 text-primary" />
                  </span>
                </label>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">No</th>
              <th className="px-3 py-4 whitespace-nowrap">Type</th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  Sector <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  Plot No. <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  Number <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  Full Number <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  Plot Size <ArrowDownSvg />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="px-3 py-4">
                  <div className="px-3 py-0">
                    <label className="relative inline-block w-[16px] h-[16px]">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                        className="peer appearance-none w-full h-full border border-primary rounded-[5px] checked:border-gray-800 cursor-pointer"
                      />
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                        <CheckAllSVG className="w-4 h-4 text-primary" />
                      </span>
                    </label>
                  </div>
                </td>

                <td className="px-3 py-4 whitespace-nowrap">{row.no}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row.type}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row.sector}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row.plotNo}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row.number}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                    {row.fullNumber}
                 
                </td>
                <td className="px-3 py-4 whitespace-nowrap">{row.plotSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination + Limit */}
         <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center w-full px-3">
                    <TealPagination totalPages={8} currentPage={1} setCurrentPage={1} />
                    <div className="flex items-center justify-between md:justify-start gap-2">
                      <p className="text-sm xl:text-base text-[#A8A8A8]">
                        Showing 1 to 10 of 50 entries
                      </p>
                      <div className="w-[140px] h-[40px]">
                        <PageLimit />
                      </div>
                    </div>
                  </div>
    </div>
  );
};

export default InventoryCustomertable;
