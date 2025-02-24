import React from "react";
import { useSelector } from "react-redux";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { getReportName } from "../../constants/options";

const ReportHeader = () => {
  const reportFilters = useSelector((state) => state.reports.reportFilters);
  const reportName = getReportName(reportFilters?.reportID);
  console.log(reportName)

  return (
    <div className="">
      <h2 className="text-xl font-semibold">{reportName}</h2>

      <div className="text-gray-600 mt-2">
        <span className="font-medium">Date :</span>{" "}
        <span className="font-bold">
          {reportFilters?.fromDate} - {reportFilters?.toDate}
        </span>
      </div>

      {/* <div className="flex space-x-6 mt-2 text-gray-700">
        <span>
          Vehicles Selected: <span className="font-bold">{reportFilters?.vehiclesSelected || 0}</span>
        </span>
        <span>
          Vehicles Driven: <span className="font-bold">{reportFilters?.vehiclesDriven || 0}</span>
        </span>
      </div> */}

      <div className="flex space-x-4 mt-4">
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
          <FaFileExcel />
          <span>Save as Excel</span>
        </button>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
          <FaFilePdf />
          <span>Save as PDF</span>
        </button>
      </div>
    </div>
  );
};

export default ReportHeader;
