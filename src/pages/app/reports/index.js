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

  // -----------------------------
  // Export Builders (updated keys)
  // -----------------------------
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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold">Summary</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Due Installments</p>
            <p className="text-xl font-semibold">{reportResult?.summary?.count || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Due Amount</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.totalAmount || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Range</p>
            <p className="text-sm">
              {reportResult?.range?.from ? moment(reportResult?.range?.from).format("DD-MM-YYYY") : "—"} تا{" "}
              {reportResult?.range?.to ? moment(reportResult?.range?.to).format("DD-MM-YYYY") : "—"}
            </p>
          </div>
        </div>
      );
    }

    if (reportType === "sold_inventories") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold">Summary</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Sold Inventories</p>
            <p className="text-xl font-semibold">{reportResult?.summary?.count || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Selling Price</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.totalSellingPrice || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Filters</p>
            <p className="text-sm truncate">
              {project ? "Project ✓ " : ""}{sector ? "Sector ✓ " : ""}{inventory ? "Inventory ✓" : "—"}
            </p>
          </div>
        </div>
      );
    }

    if (reportType === "payments_received") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold">Summary</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Net Cash flow Received</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.netCashReceived || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Settlement Amount</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.otherAmount || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Methods</p>
            <p className="text-xl font-semibold">{reportResult?.summary?.byMethod?.length || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Range</p>
            <p className="text-sm">
              {reportResult?.range?.from ? moment(reportResult?.range?.from).format("DD-MM-YYYY") : "—"} تا{" "}
              {reportResult?.range?.to ? moment(reportResult?.range?.to).format("DD-MM-YYYY") : "—"}
            </p>
          </div>
        </div>
      );
    }

    if (reportType === "future_cash_flow") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold">Summary</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Pending Till Todate</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.totalPendingAmountTillToday || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Pending Installments</p>
            <p className="text-xl font-semibold">{reportResult?.summary?.totalPendingInstallments || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total UpComing Amount</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.totalFutureAmount || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total UpComing Installments</p>
            <p className="text-xl font-semibold">{reportResult?.summary?.totalFutureInstallments || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Coming Amount</p>
            <p className="text-xl font-semibold">{formatAmount(reportResult?.summary?.totalComingAmount || 0)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Total Coming Installments</p>
            <p className="text-xl font-semibold">{reportResult?.summary?.totalInstallments || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <p className="text-sm text-gray-500">Range</p>
            <p className="text-sm">
              {reportResult?.range?.from ? moment(reportResult?.range?.from).format("DD-MM-YYYY") : "—"} تا{" "}
              {reportResult?.range?.to ? moment(reportResult?.range?.to).format("DD-MM-YYYY") : "—"}
            </p>
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
            <thead className="bg-gray-50">
              <tr>
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
            <thead className="bg-gray-50">
              <tr>
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
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Total Amount</th>
                <th className="px-4 py-3 text-left">Payments Count</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((x, idx) => (
                <tr key={`${x?.method}-${idx}`} className="border-t">
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
                <thead className="bg-gray-50">
                  <tr>
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
                <thead className="bg-gray-50">
                  <tr>
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
            bgcolor="bg-primary"
            textColor="text-white"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Report Type</label>
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
            <label className="text-sm text-gray-600">Start Date (optional)</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 outline-none"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">End Date (optional)</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 outline-none"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Payment Method</label>
            <PaymentMethodDropdown
            selected={method}
            setSelected={setMethod}
            disabled={reportType !== "payments_received"}
            options={paymentMethodOptions}
            placeholder="All Methods"
            />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
           <BlockSelect
          label="Select Block"
          name="sector"
          value={sector}
          onChange={(e) => setSector(e)}
        />

  
   

         <SelectInventory
    onSelect={ setInventory}
 />
      
       
        </div>

        <div className="flex flex-row gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-primary text-white"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Generating..." : "Generate Report"}
          </button>

          <button
            className="px-4 py-2 rounded-lg border"
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
            Clear Filters
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
