import Search from 'components/global/Search';
import SelectInput from 'components/global/form/SelectInput';

const CampaignsFilter = ({ keyword, setKeyword, setDateFilter, setLocationFilter, showInactive, setShowInactive }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
        <Search
          keyword={keyword}
          setKeyword={setKeyword}
          style={{ height: 40 }}
          placeholder="Search Name"
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

      {/* <div className="flex items-center gap-2 ml-auto">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="sr-only peer" 
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-400"></div>
          <span className="ml-2 text-sm font-medium text-gray-400">Inactive</span>
        </label>
      </div> */}
    </div>
  );
};

export default CampaignsFilter;