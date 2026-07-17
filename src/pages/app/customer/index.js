import React, { useState, useEffect } from "react";
import ExportButton from "components/global/exportbutton/ExportButton";
import CustomerFilter from "components/customer/CustomerFilter";
import CustomerTable from "components/customer/CustomerTable";
import Titlebtn from "components/global/Titlebtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useQueryParams from "utils/hooks/useQueryParams";
import { useQuery } from "react-query";
import Axios from "config/api";
import { setStats } from "redux/slices/customerSlice";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import moment from "moment";

const Customer = () => {
  const dispatch = useDispatch();
  const { docs } = useSelector((state) => state.customer);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");

  const statusMap = {
    "Not Assigned": "not_assigned",
    "One Go Payment": "one_go_payment",
    "Full Paid": "full_paid",
    Default: "default",
    Blocked: "blocked",
    Deleted: "deleted",
    Overdue: "overdue",
    "In Installment": "in_installment",
  };

  const queryKey = ["fetch-all-customer", currentPage, keyword, limit, status];

  const { isLoading, isError, error } = useQuery(
    queryKey,
    () => {
      let url = `/customer?pageSize=${limit}&page=${currentPage}`;

      if (keyword) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
      }

      if (status) {
        url += `&status=${encodeURIComponent(statusMap[status])}`;
      }

      return Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = data;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    },
  );

  function formatLabel(text = "") {
    return text
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className=" flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
        <div className="flex  flex-col gap-1.5">
          <h2 className="page-heading ">Customers</h2>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            title="Customer"
            tableData={docs.map((item) => ({
              No: item?.autoIncrementId || "",
              "ID Code": item?.longAutoIncrementId || "",
              "Customer Name": item?.name || "",
              "Phone Number": item?.phoneNumber || "",
              "Created Date": item?.createdAt
                ? moment(item?.createdAt).format("DD-MM-YYYY")
                : "-",
              Location: item?.countryName || "",
            }))}
            columns={[
              "No",
              "ID Code",
              "Customer Name",
              "Phone Number",
              "Created Date",
              "Location",
            ]}
            fileName="Recent Customer"
           bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}

          />

          <Titlebtn label="Add Customer" url="/app/Customer/general" />
        </div>
      </div>
      <CustomerFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setStatus={setStatus}
      />
      <div className="mt-4 ">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error} />
        ) : docs?.length > 0 ? (
          <CustomerTable
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
            limit={limit}
          />
        ) : (
          <ItemNotFound message="No customer found." />
        )}
      </div>
    </div>
  );
};

export default Customer;
