import { useState } from "react";
import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import EditTSvg from "assets/svgs/EditTSvg";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import TrashSvg from "assets/svgs/TrashSvg";
import TealPagination  from 'components/global/TealPagination';
import PageLimit   from 'components/global/PageLimit';

const InstallmentTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);


  const tableData = [
    {
      id: 1,
      inventory: "Plot No. 29",
      category: "2 Years Plan",
      actualPrice: "6,500,000 PKR",
      sellingPrice: "6,800,000 PKR",
    },
    {
      id: 2,
      inventory: "Plot No. 30",
      category: "3 Years Plan",
      actualPrice: "350,000 PKR",
      sellingPrice: "375,000 PKR",
    },
    {
      id: 3,
      inventory: "Plot No. 31",
      category: "3 Years Plan",
      actualPrice: "520,000 PKR",
      sellingPrice: "540,000 PKR",
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
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="text-gunmetal font-semibold text-lg">Installments Plan</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full bg-white border-collapse">
          <thead className="text-left text-sm md:text-[15px] bg-[#F9FAFB] border-b border-gray-200">
            <tr>
              <th className="px-3 py-4 whitespace-nowrap">
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
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Inventory
                  <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Installment Category
                  <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Actual Price
                  <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Selling Price
                  <ArrowDownSvg />
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b hover:bg-gray-50 transition ${
                  selectedRows.includes(row.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-3 py-4">
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
                </td>
                <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row.inventory}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row.category}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {row.actualPrice}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {row.sellingPrice}
                </td>

                <td className="px-3 py-4">
                  <div className="flex flex-row gap-1.5 items-center">
                    <button className="w-fit px-2.5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 transition">
                      <EyetSVG />
                    </button>
                    <button className="w-fit px-2.5 py-2.5 rounded-lg bg-[#54A6FF] hover:bg-[#3e94ef] transition">
                      <EditTSvg />
                    </button>
                    <button className="w-fit px-2.5 py-2.5 rounded-lg bg-darkred hover:bg-red-700 transition">
                      <TrashSvg />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {tableData.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No Installment Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default InstallmentTable;
