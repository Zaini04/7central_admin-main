import TealPagination from 'components/global/TealPagination';
import PageLimit from 'components/global/PageLimit';
import EyetSVG from 'assets/svgs/EyetSVG';
import TrashSvg from 'assets/svgs/TrashSvg';

const CampaignsTable = ({ docs, currentPage, setCurrentPage, limit, setLimit, docsCount, pages }) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(start + docs.length - 1, docsCount);

  // Status pills stylings directly matching image 5a606f
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'paused': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'bounced': return 'bg-rose-50 text-rose-600 border border-rose-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="overflow-x-auto maintable mt-2 px-4">
        <table className="w-[100%] rounded-xl overflow-hidden mx-auto bg-white">
          <thead className="text-left text-white bg-[#1F2020] text-xs md:text-sm font-medium">
            <tr>
              <th className="p-3 text-center w-10">
                <input type="checkbox" className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer" />
              </th>
              <th className="p-3 whitespace-nowrap">No</th>
              <th className="p-3 whitespace-nowrap">Name</th>
              <th className="p-3 whitespace-nowrap">Type</th>
              <th className="p-3 text-center whitespace-nowrap">Progress Metrics</th>
              <th className="p-3 text-center whitespace-nowrap">Status</th>
              <th className="p-3 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {docs.map((row) => (
              <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 text-center">
                  <input type="checkbox" className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer" />
                </td>
                <td className="p-3 font-medium text-[#1A1C1E] text-xs">{row.no}</td>
                <td className="p-3 font-semibold text-[#1A1C1E] text-xs">{row.name}</td>
                <td className="p-3 font-medium text-gray-500 text-xs">{row.type}</td>
                
                {/* Visual Segmented Metrics Cell */}
                <td className="p-3 text-xs text-gray-500">
                  <div className="flex items-center justify-center gap-4 text-center">
                    <div><span className="block font-bold text-gray-800">{row.metrics.opened}</span><span className="text-[10px] text-gray-400">Opened</span></div>
                    <div><span className="block font-bold text-gray-800">{row.metrics.closed}</span><span className="text-[10px] text-gray-400">Closed</span></div>
                    <div><span className="block font-bold text-gray-800">{row.metrics.unsubscribe}</span><span className="text-[10px] text-gray-400">Unsub</span></div>
                    <div><span className="block font-bold text-gray-800">{row.metrics.delivered}</span><span className="text-[10px] text-gray-400">Delivered</span></div>
                    <div><span className="block font-bold text-gray-800">{row.metrics.conversation}</span><span className="text-[10px] text-gray-400">Convers.</span></div>
                  </div>
                </td>

                <td className="p-3 text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${getStatusStyle(row.status)}`}>
                    • {row.status}
                  </span>
                </td>

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

      {/* Footer Pagination Bar matching layout rules */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-4 mt-2">
        <TealPagination 
          totalPages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <p className="text-xs text-[#A8A8A8]">
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

export default CampaignsTable;