import EyetSVG from 'assets/svgs/EyetSVG';
import TrashSvg from 'assets/svgs/TrashSvg';
import TealPagination from 'components/global/TealPagination';
import PageLimit from 'components/global/PageLimit';
import { useNavigate } from 'react-router-dom';

const PaymentsTable = ({ 
  docs,
  currentPage, 
  setCurrentPage,
  limit,
  setLimit,
  docsCount,
  pages
}) => {
  const navigate = useNavigate();

  const start = (currentPage - 1) * limit + 1;
  const end = start + docs.length - 1;

  const formatCurrency = (val) => {
    return Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="overflow-x-auto maintable px-4 mt-2">
        <table className="w-[100%] rounded-xl overflow-hidden mx-auto bg-white">
          <thead className="text-left text-white bg-[#1F2020] text-xs md:text-[14px]">
            <tr>
              <th className="whitespace-nowrap text-white p-3 text-center w-10">
                <input
                  type="checkbox"
                  className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                />
              </th>
              <th className="whitespace-nowrap text-white p-3">No</th>
              <th className="whitespace-nowrap text-white p-3">Invoice ID</th>
              <th className="whitespace-nowrap text-white p-3">Company Name</th>
              <th className="whitespace-nowrap text-white p-3">Amount</th>
              <th className="whitespace-nowrap text-white p-3">Due Date</th>
              <th className="whitespace-nowrap text-white p-3">Paid By</th>
              <th className="whitespace-nowrap text-white p-3">Transaction ID</th>
              <th className="whitespace-nowrap text-white p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row) => (
              <tr key={row._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap p-3 text-center">
                  <input
                    type="checkbox"
                    className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                  />
                </td>
                
                <td className="whitespace-nowrap font-medium text-[#1A1C1E] text-xs p-3">{row.no}</td>
                <td className="whitespace-nowrap font-medium text-[#1A1C1E] text-xs p-3">{row.invoiceId}</td>
                
                {/* Company Vector + Label Stack Column */}
                <td className="whitespace-nowrap font-semibold text-[#1A1C1E] text-xs p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-50 border border-gray-100">
                      <span className={`text-[10px] font-black ${row.logoColor}`}>✦</span>
                    </div>
                    <span>{row.company}</span>
                  </div>
                </td>

                <td className="whitespace-nowrap font-semibold text-[#1A1C1E] text-xs p-3">
                  {formatCurrency(row.amount)}
                </td>
                
                <td className="whitespace-nowrap ">{row.dueDate}</td>
                <td className="whitespace-nowrap ">{row.paidBy}</td>
                <td className="whitespace-nowrap ">{row.txId}</td>
                
                {/* Action Items Column Controls */}
                 <td className="p-3">
                  <div className="flex flex-row gap-1.5 justify-center items-center">
                    <div className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-primary cursor-pointer hover:bg-slate-800 transition-colors">
                      <EyetSVG />
                    </div>
                    <div className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-darkred cursor-pointer hover:bg-rose-700 transition-colors">
                      <TrashSvg />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Elements Layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-4 mt-4">
        <TealPagination 
          totalPages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className='flex items-center justify-between sm:justify-start gap-3'>
          <p className="text-xs text-[#A8A8A8] font-medium">
            Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
          </p>
          <div className="w-[140px] h-[40px]">
            <PageLimit totalpages={docsCount || 10} limit={limit} setLimit={setLimit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;