// src/pages/reports/Reports.jsx
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Axios from "config/api";
import moment from "moment";

import PeriodDropdown from "components/global/PeriodDropdown";
import ExportButton from "components/global/exportbutton/ExportButton";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";

import { setReportResult } from "redux/slices/reportSlice";
import ReportTypeDropdown from "components/global/ReportTypeDropdown";
import PaymentMethodDropdown from "components/global/PaymentMethodDropdown";
import { paymentMethodOptions, reportTypeOptions } from "constants/app.constants";
import BlockSelect from "components/assignInventory/assignInventoryInput/BlockSelect";
import SelectInventory from "components/installments/inputInstallment/SelectInventory";
import { Form, Formik } from "formik";
import formatAmount from "utils/formatAmount";
import NextButton from "components/global/form/NextButton";
import ClearButton from "components/global/form/ClearButton";

const Reports = () => {
  const dispatch = useDispatch();
  const { reportResult } = useSelector((state) => state.report);

  // -----------------------------
  // UI States
  // -----------------------------
  const [reportType, setReportType] = useState("due_installments");

  // optional dates (backend defaults end=current)
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // optional filters
  const [project, setProject] = useState("");
  const [sector, setSector] = useState("");
  const [inventory,setInventory]=useState('');

  // only for payments_received
  const [method, setMethod] = useState("");

  // keep your same period dropdown UI (not sent to backend right now)
  const [selected, setSelected] = useState("Month");

  // -----------------------------
  // Query Params (match your updated backend response)
  // -----------------------------
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append("type", reportType);

    if (start) params.append("start", start);
    if (end) params.append("end", end);

    if (project) params.append("project", project);
    if (sector) params.append("sector", sector);
    if (inventory) params.append("inventory", inventory);

    if (reportType === "payments_received" && method) {
      params.append("method", method);
    }

    return params.toString();
  }, [reportType, start, end, project, sector, inventory, method]);

  const reportQueryKey = [
    "fetch-reporting",
    reportType,
    start,
    end,
    project,
    sector,
    inventory,
    method,
  ];

  const {
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery(
    reportQueryKey,
    async () => {
      const url = `/report?${queryParams}`;
      return Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (res) => {
        const doc = res?.data?.data;
        dispatch(setReportResult(doc));
      },
    }
  );


  const exportConfig = useMemo(() => {
    const titleFromBackend = reportResult?.summary?.title || "Report";

    if (reportType === "due_installments") {
      const rows = (reportResult?.docs || []).map((x, idx) => ({
        No: idx + 1,
        "Inventory No": x?.inventoryFullNumber || "-",
        "Buyer(s)": x?.buyersDisplayName || "-",
        Seq: x?.seq ?? "-",
        Type: x?.type || "-",
        "Due Date": x?.dueDate ? moment(x?.dueDate).format("DD-MM-YYYY") : "-",
        Amount: x?.amount ?? 0,
        Status: x?.status || "-",
      }));

      return {
        title: titleFromBackend,
        fileName: titleFromBackend,
        columns: ["No", "Inventory No", "Buyer(s)", "Seq", "Type", "Due Date", "Amount", "Status"],
        tableData: rows,
      };
    }

    if (reportType === "sold_inventories") {
      const rows = (reportResult?.docs || []).map((x, idx) => ({
        No: idx + 1,
        "Inventory No": x?.fullNumber || "-",
        Sector: x?.sectorTitle || "-",
        Status: x?.status || "-",
        "Buyer(s)": x?.buyersDisplayName || "-",
        "Selling Price": x?.sellingPrice ?? 0,
        "Payment Type": x?.paymentType || "-",
        "Created Date": x?.createdAt ? moment(x?.createdAt).format("DD-MM-YYYY") : "-",
      }));

      return {
        title: titleFromBackend,
        fileName: titleFromBackend,
        columns: [
          "No",
          "Inventory No",
          "Sector",
          "Status",
          "Buyer(s)",
          "Selling Price",
          "Payment Type",
          "Created Date",
        ],
        tableData: rows,
      };
    }

    if (reportType === "payments_received") {
      const rows = (reportResult?.summary?.byMethod || []).map((x, idx) => ({
        No: idx + 1,
        Method: x?.method || "-",
        "Total Amount": x?.amountTotal ?? 0, // ✅ changed from methodTotal -> amountTotal
        "Payments Count": x?.paymentCount ?? 0,
      }));

      return {
        title: titleFromBackend,
        fileName: titleFromBackend,
        columns: ["No", "Method", "Total Amount", "Payments Count"],
        tableData: rows,
      };
    }

    if (reportType === "future_cash_flow") {
      const rows = (reportResult?.byInventory || []).map((x, idx) => ({
        No: idx + 1,
        "Inventory No": x?.inventoryFullNumber || "-",
        Status: x?.inventoryStatus || "-",
        "Total Coming Amount": x?.totalComingAmount ?? 0,
        "Total Installments": x?.totalInstallments ?? 0,
        "Next Due Date": x?.nextDueDate ? moment(x?.nextDueDate).format("DD-MM-YYYY") : "-",
      }));

      return {
        title: titleFromBackend + " (By Inventory)",
        fileName: titleFromBackend + " - By Inventory",
        columns: ["No", "Inventory No", "Status", "Total Coming Amount", "Total Installments", "Next Due Date"],
        tableData: rows,
      };
    }

    return { title: "Report", fileName: "Report", columns: [], tableData: [] };
  }, [reportType, reportResult]);

  // -----------------------------
  // UI: Summary Cards (uses backend summary.title)
  // -----------------------------
const renderSummary = () => {
    if (!reportResult) return null;

    const title = reportResult?.summary?.title || "Report";

    if (reportType === "due_installments") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">

  {/* Title/Summary */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">{title}</p>
    <div>
      <h2 className="text-lg font-semibold">Summary</h2>
    </div>
  </div>

  {/* Total Due Installments */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Due Installments</p>
    <div>
      <h2 className="text-lg font-semibold">{reportResult?.summary?.count || 0}</h2>
    </div>
  </div>

  {/* Total Due Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Due Amount</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.totalAmount || 0)}</h2>
    </div>
  </div>

  {/* Range */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Range</p>
    <div>
      <p className="text-lg font-semibold">
        {reportResult?.range?.from ? moment(reportResult?.range?.from).format("DD-MM-YYYY") : "—"} {"-- "}
        {reportResult?.range?.to ? moment(reportResult?.range?.to).format("DD-MM-YYYY") : "—"}
      </p>
    </div>
  </div>

</div>
      );
    }

    if (reportType === "sold_inventories") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">

  {/* Title/Summary */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">{title}</p>
    <div>
      <h2 className="text-lg font-semibold">Summary</h2>
    </div>
  </div>

  {/* Total Sold Inventories */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Sold Inventories</p>
    <div>
      <h2 className="text-lg font-semibold">{reportResult?.summary?.count || 0}</h2>
    </div>
  </div>

  {/* Total Selling Price */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Selling Price</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.totalSellingPrice || 0)}</h2>
    </div>
  </div>

  {/* Filters */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Filters</p>
    <div>
      <p className="text-lg font-semibold truncate">
        {project ? "Project ✓ " : ""}{sector ? "Sector ✓ " : ""}{inventory ? "Inventory ✓" : "—"}
      </p>
    </div>
  </div>

</div>
      );
    }

    if (reportType === "payments_received") {
      return (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">

  {/* Title/Summary */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">{title}</p>
    <div>
      <h2 className="text-lg font-semibold">Summary</h2>
    </div>
  </div>

  {/* Net Cash flow Received */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Net Cash flow Received</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.netCashReceived || 0)}</h2>
    </div>
  </div>

  {/* Settlement Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Settlement Amount</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.otherAmount || 0)}</h2>
    </div>
  </div>

  {/* Methods */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Methods</p>
    <div>
      <h2 className="text-lg font-semibold">{reportResult?.summary?.byMethod?.length || 0}</h2>
    </div>
  </div>

  {/* Range */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Range</p>
    <div>
      <p className="text-lg font-semibold">
        {reportResult?.range?.from ? moment(reportResult?.range?.from).format("DD-MM-YYYY") : "—"} {"-- "}
        {reportResult?.range?.to ? moment(reportResult?.range?.to).format("DD-MM-YYYY") : "—"}
      </p>
    </div>
  </div>

</div>
      );
    }

    if (reportType === "future_cash_flow") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

  {/* Title/Summary */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">{title}</p>
    <div>
      <h2 className="text-lg font-semibold">Summary</h2>
    </div>
  </div>

  {/* Pending Till Todate */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Pending Till Todate</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.totalPendingAmountTillToday || 0)}</h2>
    </div>
  </div>

  {/* Total Pending Installments */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Pending Installments</p>
    <div>
      <h2 className="text-lg font-semibold">{reportResult?.summary?.totalPendingInstallments || 0}</h2>
    </div>
  </div>

  {/* Total UpComing Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total UpComing Amount</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.totalFutureAmount || 0)}</h2>
    </div>
  </div>

  {/* Total UpComing Installments */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total UpComing Installments</p>
    <div>
      <h2 className="text-lg font-semibold">{reportResult?.summary?.totalFutureInstallments || 0}</h2>
    </div>
  </div>

  {/* Total Coming Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Coming Amount</p>
    <div>
      <h2 className="text-lg font-semibold">{formatAmount(reportResult?.summary?.totalComingAmount || 0)}</h2>
    </div>
  </div>

  {/* Total Coming Installments */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Total Coming Installments</p>
    <div>
      <h2 className="text-lg font-semibold">{reportResult?.summary?.totalInstallments || 0}</h2>
    </div>
  </div>

  {/* Range */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <p className="text-[#1F2020] text-sm font-medium">Range</p>
    <div>
      <p className="text-lg font-semibold">
        {reportResult?.range?.from ? moment(reportResult?.range?.from).format("DD-MM-YYYY") : "—"} {"-- "}
        {reportResult?.range?.to ? moment(reportResult?.range?.to).format("DD-MM-YYYY") : "—"}
      </p>
    </div>
  </div>

</div>
      );
    }

    return null;
  };

  // -----------------------------
  // UI: Tables (same as previous but updated summary keys)
  // -----------------------------
  const renderTable = () => {
    if (!reportResult) return null;

    // 1) Due installments
    if (reportType === "due_installments") {
      const docs = reportResult?.docs || [];
      if (!docs.length) return <ItemNotFound title="No due installments found." />;

      return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="">
              <tr>
                <th className="px-3  py-4 whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Inventory</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Seq</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((x, idx) => (
                <tr key={x?._id} className="border-t">
                   <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                  <td className="px-4 py-3">{idx + 1}</td>
                  
                  <td className="px-4 py-3">{x?.inventoryFullNumber || "-"}</td>
                  <td className="px-4 py-3">{x?.buyersDisplayName || "-"}</td>
                  <td className="px-4 py-3">{x?.seq ?? "-"}</td>
                  <td className="px-4 py-3">{x?.type || "-"}</td>
                  <td className="px-4 py-3">{x?.dueDate ? moment(x?.dueDate).format("DD-MM-YYYY") : "-"}</td>
                  <td className="px-4 py-3">{x?.amount ?? 0}</td>
                  <td className="px-4 py-3">{x?.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 2) Sold inventories
    if (reportType === "sold_inventories") {
      const docs = reportResult?.docs || [];
      if (!docs.length) return <ItemNotFound title="No sold inventories found." />;

      return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="">
              <tr>
                <th className="px-3  py-4 whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Inventory</th>
                <th className="px-4 py-3 text-left">Sector</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Selling Price</th>
                <th className="px-4 py-3 text-left">Payment Type</th>
                <th className="px-4 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((x, idx) => (
                <tr key={x?._id} className="border-t">
                   <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{x?.fullNumber || "-"}</td>
                  <td className="px-4 py-3">{x?.sectorTitle || "-"}</td>
                  <td className="px-4 py-3">{x?.status || "-"}</td>
                  <td className="px-4 py-3">{x?.buyersDisplayName || "-"}</td>
                  <td className="px-4 py-3">{x?.sellingPrice ?? 0}</td>
                  <td className="px-4 py-3">{x?.paymentType || "-"}</td>
                  <td className="px-4 py-3">{x?.createdAt ? moment(x?.createdAt).format("DD-MM-YYYY") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 3) Payments received
    if (reportType === "payments_received") {
      const rows = reportResult?.summary?.byMethod || [];
      if (!rows.length) return <ItemNotFound title="No payments received found." />;

      return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="">
              <tr>
                <th className="px-3  py-4 whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Total Amount</th>
                <th className="px-4 py-3 text-left">Payments Count</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((x, idx) => (
                <tr key={`${x?.method}-${idx}`} className="border-t">
                   <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{x?.method || "-"}</td>
                  <td className="px-4 py-3">{formatAmount(x?.amountTotal ?? 0)}</td>
                  <td className="px-4 py-3">{x?.paymentCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 4) Future cashflow
    if (reportType === "future_cash_flow") {
      const byInv = reportResult?.byInventory || [];
      const bySec = reportResult?.bySector || [];

      return (
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <div className="px-4 py-3 border-b font-semibold">By Inventory</div>
            {!byInv.length ? (
              <div className="p-4">
                <ItemNotFound title="No future cash flow found (By Inventory)." />
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="">
                  <tr>
                    <th className="px-3  py-4 whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Inventory</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Pending Till Date</th>
                    <th className="px-4 py-3 text-left">Total UpComing</th>
                    <th className="px-4 py-3 text-left">Total Amount</th>
                    <th className="px-4 py-3 text-left">Total Installments</th>
                    <th className="px-4 py-3 text-left">Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {byInv.map((x, idx) => (
                    <tr key={x?._id} className="border-t">
                       <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3">{x?.inventoryFullNumber || "-"}</td>
                      <td className="px-4 py-3">{x?.inventoryStatus || "-"}</td>
                      <td className="px-4 py-3">{formatAmount(x?.totalPendingAmountTillToday ?? 0)}</td>
                      <td className="px-4 py-3">{formatAmount(x?.totalFutureAmount ?? 0)}</td>
                      <td className="px-4 py-3">{formatAmount(x?.totalComingAmount ?? 0)}</td>
                      <td className="px-4 py-3">{x?.totalInstallments ?? 0}</td>
                      <td className="px-4 py-3">{x?.nextDueDate ? moment(x?.nextDueDate).format("DD-MM-YYYY") : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <div className="px-4 py-3 border-b font-semibold">By Sector</div>
            {!bySec.length ? (
              <div className="p-4">
                <ItemNotFound title="No future cash flow found (By Sector)." />
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="">
                  <tr>
                    <th className="px-3  py-4 whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Sector</th>
                    <th className="px-4 py-3 text-left">Pending Till Date</th>
                    <th className="px-4 py-3 text-left">Total UpComing</th>
                    <th className="px-4 py-3 text-left">Total Amount</th>
                    <th className="px-4 py-3 text-left">Installments</th>
                    <th className="px-4 py-3 text-left">Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {bySec.map((x, idx) => (
                    <tr key={`${x?.sector}-${idx}`} className="border-t">
                       <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3">{x?.sectorTitle || "-"}</td>
                      <td className="px-4 py-3">{formatAmount(x?.totalPendingAmountTillToday ?? 0)}</td>
                      <td className="px-4 py-3">{formatAmount(x?.totalFutureAmount ?? 0)}</td>
                      <td className="px-4 py-3">{formatAmount(x?.totalComingAmount ?? 0)}</td>
                      <td className="px-4 py-3">{x?.totalInstallments ?? 0}</td>
                      <td className="px-4 py-3">{x?.nextDueDate ? moment(x?.nextDueDate).format("DD-MM-YYYY") : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Reports</h2>
          <p className="page-subtitle">
            Generate reports           
            </p>
        </div>

        <div className="flex flex-row gap-3">
          {/* <PeriodDropdown selected={selected} setSelected={setSelected} /> */}
          <ExportButton
            title={exportConfig.title}
            tableData={exportConfig.tableData}
            columns={exportConfig.columns}
            fileName={exportConfig.fileName}
bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}
          />
        </div>
      </div>

      {/* Filters */}
      <div className=" rounded-xl  py-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-gray-600">Report Type</label> */}
            <ReportTypeDropdown
            selected={reportType}
            setSelected={(val) => {
                setReportType(val);
                // reset method if user switches away from payments report
                if (val !== "payments_received") setMethod("");
            }}
            options={reportTypeOptions}
            />
        </div>

          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-gray-600">Start Date (optional)</label> */}
            <input
              type="date"
              placeholder="Start Date"
              className=" bg-white rounded-xl px-3 py-2 font-normal text-sm outline-none"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-gray-600">End Date (optional)</label> */}
            <input
              type="date"
              placeholder="End Date"
              className=" bg-white rounded-xl px-3 py-2 font-normal text-sm outline-none"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-gray-600">Payment Method</label> */}
            <PaymentMethodDropdown
            selected={method}
            setSelected={setMethod}
            disabled={reportType !== "payments_received"}
            options={paymentMethodOptions}
            placeholder="All Methods"
            />
        </div>
        <BlockSelect
          name="sector"
          // label="Select Block"
          // className="border-none"
          placeholder="Select Block"
          value={sector}
          onChange={(e) => setSector(e)}
        />

  
   

         <SelectInventory
    onSelect={ setInventory}
 />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
           
      
       
        </div>

        <div className="flex flex-row gap-3">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <NextButton label={isFetching ? "Generating..." : "Generate Report"}  isIcon={false}
/>
            {/* {isFetching ? "Generating..." : "Generate Report"} */}
          </button>

          <button
            onClick={() => {
              setStart("");
              setEnd("");
              setProject("");
              setSector("");
              setInventory("");
              setMethod("");
            }}
            disabled={isFetching}
          >
            <ClearButton/>
          </button>
        </div>
      </div>

      {/* Summary */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError message={error?.message || "Something went wrong"} />
      ) : (
        renderSummary()
      )}

      {/* Table */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError message={error?.message || "Something went wrong"} />
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default Reports;
