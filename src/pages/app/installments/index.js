import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import Axios from "config/api";
import { setStats } from "redux/slices/installmentSlice";
import ExportButton from "components/global/exportbutton/ExportButton";
import PeriodDropdown from "components/global/PeriodDropdown";
import InstallmentsFilter from "components/installments/InstallmentsFilter";
import InstallmentsTable from "components/installments/InstallmentsTable";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import formatLabel from "utils/formatLabel";
import moment from "moment";



const Installments = () => {
  const dispatch = useDispatch();
  const { docs } = useSelector((state) => state.installment);

  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inventory,setInventory]=useState('');
  const [status, setStatus] = useState(''); 
  const [selected, setSelected] = useState("");



 const statusMap = {
  "Defaulted": "defaulted",
  "Over Due": "overdue",
"Pertially Paid":"pertially_paid",
  'Paid':'Paid',
  'Un-Paid':'un-paid'
};




const typeMap = {
  "Year": "yearly",
  "Month": "monthly",
  "Week": "weekly"
};


  const queryKey = ["fetch-all-installments", currentPage, keyword, limit,inventory,status,selected];

  const { isLoading, isError, error } = useQuery(
    queryKey,
    () => {
      let url = `/sale/get-all-installments?pageSize=${limit}&page=${currentPage}`;
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
            if (inventory) url += `&inventory=${inventory}`;

       if (selected) {
      const apiType = typeMap[selected];
      if (apiType) {
        url += `&type=${encodeURIComponent(apiType)}`;
      }
    }

                     if (status) {
      // const apiStatus = statusMap[status]; 
      // if (apiStatus) {
        url += `&status=${encodeURIComponent(status)}`;
      // }
    }
      return Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = res;

        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );





  
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between w-full">
        <h2 className="page-heading">Installments</h2>

        <div className="flex items-center gap-2">
                  {/* <PeriodDropdown selected={selected} setSelected={setSelected} /> */}

   <ExportButton
  title="Installments"
  tableData={docs?.map((item, index) => ({
    No: index + 1,
    "Customer Name": item?.inventory?.currentSale?.buyersDisplayName?? "",
    "InventoryNo": item?.inventory?.fullNumber   || '',
    "Payment Type": formatLabel(item?.type) ?? "",
    "Total Payment": item?.amount ?? 0,
    "Paid Payment": item?.paidAmount ?? 0,
    "Remaining Amount": (item?.amount ?? 0) - (item?.paidAmount ?? 0),
    "Due Date": item?.dueDate ? moment(item?.dueDate).format("DD-MM-YYYY") : "-",
  })) || []}
  columns={[
    "No",
    "Customer Name",
    "InventoryNo",
    "Payment Type",
    "Total Payment",
    "Paid Payment",
    "Remaining Amount",
    "Due Date",
  ]}
  fileName="Installments"
bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}
/>



                  

        </div>
      </div>

      {/* Filters */}
      <InstallmentsFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setCurrentPage={setCurrentPage}
        setInventory={setInventory}
        setStatus={setStatus}
      />

      {/* Table Section */}
      <div className="mt-4">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : docs?.length > 0 ? (
          <InstallmentsTable
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            setLimit={setLimit}
          />
        ) : (
          <ItemNotFound message="No Installment found." />
        )}
      </div>
    </div>
  );
};

export default Installments;
