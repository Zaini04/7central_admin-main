import TealPagination from 'components/global/TealPagination';
import PageLimit from 'components/global/PageLimit';
import EyetSVG from 'assets/svgs/EyetSVG';
import TrashSvg from 'assets/svgs/TrashSvg';
import Status from 'components/global/Status';
import formatLabel from 'utils/formatLabel';

const CampaignsTable = ({ docs, currentPage, setCurrentPage, limit, setLimit, docsCount, pages }) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(start + docs.length - 1, docsCount);

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
              <th className="p-3 text-center whitespace-nowrap">Campaign Progress</th>
              <th className="p-3 text-center whitespace-nowrap">Status</th>
              <th className="p-3 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {docs.length <= 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center">
                  <span className="text-gray-500 text-xs font-medium block">
                    No Records Found
                  </span>
                </td>
              </tr>
            ) : (
              docs.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-center">
                    <input type="checkbox" className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer" />
                  </td>
                  <td className="text-xs">{row.no}</td>
                  <td className="text-xs">{row.name}</td>
                  <td className="text-xs">{row.type}</td>
                  
                  {/* Visual Segmented Metrics Cell */}
                  <td className="p-3 text-xs">
                    <div className="flex items-center justify-center gap-4 text-center">
                      <div>
                        <span className="block font-semibold text-gray-800">{row.metrics.totalProspects}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Total Prospects</span>
                      </div>
                      
                      <div className="border-l border-gray-200 h-6 mx-1"></div>

                      <div>
                        <span className="block font-semibold text-blue-600">{row.metrics.newLeads}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">New Leads</span>
                      </div>

                      <div>
                        <span className="block font-semibold text-amber-600">{row.metrics.notContacted}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Not Contacted</span>
                      </div>

                      <div>
                        <span className="block font-semibold text-purple-600">{row.metrics.followUp}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Follow Up</span>
                      </div>

                      <div>
                        <span className="block font-semibold text-emerald-600">{row.metrics.visitPlan}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Visit Plan</span>
                      </div>

                      <div>
                        <span className="block font-semibold text-red-600">{row.metrics.deadLeads}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Dead Leads</span>
                      </div>

                      <div>
                        <span className="block font-semibold text-indigo-600">{row.metrics.futurePlan}</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Future Plan</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-center">
                    <Status status={formatLabel(row.status)}/>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination Bar */}
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