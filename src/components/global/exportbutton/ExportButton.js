import React, { useState, useRef } from "react";
import ExportSVG from "assets/svgs/ExportSVG";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useToggle from "hooks/useToggle";
import useClickOutside from "utils/clickOutside";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./exportbutton.css";

const ExportButton = ({
  bgcolor,
  colortext,
  textColor,
  title,
  tableData,
  columns,
  fileName = "Export",
   docDetails,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState("PDF");
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle(false);

  const options = ["PDF", "Excel", "CSV"];
  useClickOutside(menuRef, () => toggleShowMenu(false));

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const formatRow = (row) =>
    columns.map((col) => {
      const value = row[col];
      // Return 0 as is, handle null/undefined as empty string
      if (value === 0 || value === "0") return 0;
      if (value === null || value === undefined) return "";
      return value;
    });

  const handleSelect = (option) => {
    setSelected(option);
    toggleShowMenu(false);
  };

  const handleConfirm = () => {
    switch (selected) {
      case "CSV":
        handleCSV();
        break;
      case "Excel":
        handleExcel();
        break;
      case "PDF":
        handlePDF();
        break;
      default:
        break;
    }
    setShowPopup(false);
  };

  const handleCSV = () => {
    const header = columns;
    const rows = tableData.map(formatRow);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows]
        .map((row) =>
          row
            .map((cell) => {
              // Handle 0 values
              if (cell === 0 || cell === "0") return "0";
              
              // Handle empty strings
              if (cell === "") return '""';
              
              // Handle dates and strings
              if (typeof cell === "string") {
                // Check if it's a date string
                if (/^\d{2}-\d{2}-\d{4}$/.test(cell) || 
                    /^\d{4}-\d{2}-\d{2}$/.test(cell)) {
                  return `"\t${cell}"`;
                }
                // Escape quotes in strings
                return `"${cell.replace(/"/g, '""')}"`;
              }
              
              // For numbers, booleans, etc.
              return cell;
            })
            .join(",")
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${fileName || title}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExcel = () => {
    const rows = tableData.map((row) => {
      const formatted = {};
      columns.forEach((col) => {
        const value = row[col];
        formatted[col] = 
          value === 0 || value === "0" 
            ? 0 
            : value === null || value === undefined 
            ? "" 
            : value;
      });
      return formatted;
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName || title}.xlsx`);
  };

const handlePDF = () => {
  const doc = new jsPDF("p", "mm", "a4");
  doc.setFontSize(14);

  let startY = 40;
  doc.text(`${title}`, 15, startY); // start closer to left

  // Check for buyers
  if (docDetails?.currentSale?.buyers?.length > 0) {
    const buyers = docDetails.currentSale.buyers;

    buyers.forEach((buyer) => {
      const cardX = 10; // reduced from 14
      const cardY = startY;
      const cardWidth = 190; // slightly wider
      const cardHeight = 36;

      // Draw buyer card border only
      doc.rect(cardX, cardY, cardWidth, cardHeight, "S");

      // Text inside card
      doc.setFontSize(9);
      const textX = cardX + 2; // reduce left padding
      let textY = cardY + 5;

      doc.text(`Name: ${buyer.name}`, textX, textY);
      textY += 5;
      doc.text(`Father Name: ${buyer.fatherName}`, textX, textY);
      textY += 5;
      doc.text(`Email: ${buyer.email}`, textX, textY);
      textY += 5;
      doc.text(`Phone: ${buyer.phoneNumber}`, textX, textY);
      textY += 5;
      if (buyer.cnic) doc.text(`CNIC: ${buyer.cnic}`, textX, textY);
      textY += 5;
      if (docDetails.sector) doc.text(`Block: ${docDetails.sector.title}`, textX, textY);
      textY += 5;
      if (docDetails.fullNumber) doc.text(`Inventory: ${docDetails.fullNumber}`, textX, textY);


      // Move down after each card
      startY = cardY + cardHeight + 10;
    });

    // After printing all buyers → print table
    autoTable(doc, {
      head: [columns],
      body: tableData.map(formatRow),
      startY: startY + 4,
      styles: { fontSize: 7, cellPadding: 2 },
      headStyles: { fillColor: [45, 55, 72] },
      margin: { left: 5, right: 5 }, // reduce side padding
      tableWidth: 'auto', // span full width
    });
  } else {
    // No buyers → only table
    autoTable(doc, {
      head: [columns],
      body: tableData.map(formatRow),
      startY: startY+5 ,
      styles: { fontSize: 7, cellPadding: 2 },
      headStyles: { fillColor: [45, 55, 72] },
      margin: { top: 60,    left: 15, right: 15,bottom: 15},
      tableWidth: 'auto',
    });
  }

  doc.save(`${fileName || title}.pdf`);
};





  return (
    <>
      <div
        onClick={handleOpen}
        className={` h-[32px] bg-white rounded-full pl-1.5 pr-4 flex items-center justify-start gap-3 text-primary cursor-pointer select-none`}
      >
       <div className="w-[22px] h-[22px]  rounded-full bg-black  flex justify-center items-center">
        <ExportSVG colortext="white" />

        </div>
       <span className='font-semibold text-xs text-[#1F2020]'>
        Export Data
        </span> 
      </div>

      {showPopup && (
        <div className="custom-confirm-overlay" onClick={handleClose}>
          <div
            className="custom-confirm-body"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-lg font-semibold mb-2">
              Export Data
            </h1>
            <h3 className="text-center mb-4 text-gray-600">
              Are you sure you want to export data?
            </h3>

            <h6 className="text-left text-dark1 text-sm mt-4 mb-1">
              Choose type of document
            </h6>

            <div className="relative mb-4" ref={menuRef}>
              <div
                onClick={toggleShowMenu}
                className="w-full bg-light2 rounded-[10px] border border-gray-300 px-3 py-2 flex items-center justify-between text-gunmetal cursor-pointer select-none"
              >
                <span className="font-semibold">{selected}</span>
                <div
                  className={`transition-transform duration-300 ${
                    showMenu ? "rotate-180" : ""
                  }`}
                >
                  <ArrowSVG />
                </div>
              </div>

              {showMenu && (
                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 shadow-md z-10">
                  {options.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                        selected === option
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="custom-confirm-button-group">
              <button onClick={handleClose}>Cancel</button>
              <button onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportButton;