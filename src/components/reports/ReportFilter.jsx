import React, { useState } from "react";
import DateInterval from "../UI/DateInterval";
import DateTimePicker from "../UI/DateTimePicker";
import dayjs from "dayjs";
import SelectBox from "../UI/SelectBox";
import { reportOptions } from "../../constants/options";
import Button from "../UI/Button";

const ReportFilter = ({ onCreateReport, isLoading }) => {
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [selectedReport, setSelectedReport] = useState("");

  const onReportChange = (e) => {
    setSelectedReport(e?.target?.value);
  };

  const onDateChange = (value, type) => {
    if (type === "from") setFromDate(value);
    else setToDate(value);
  };

  const onTabChange = (tab) => {
    switch (tab) {
      case "today":
        setFromDate(dayjs().startOf("day"));
        setToDate(dayjs().endOf("day"));
        break;
      case "yesterday":
        setFromDate(dayjs().subtract(1, "day").startOf("day"));
        setToDate(dayjs().subtract(1, "day").endOf("day"));
        break;
      case "lastWeek":
        setFromDate(dayjs().subtract(7, "day").startOf("day"));
        setToDate(dayjs().subtract(1, "day").endOf("day"));
        break;
      default:
        setFromDate(dayjs().startOf("day"));
        setToDate(dayjs().endOf("day"));
        break;
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <DateInterval onChange={onTabChange} />
      <div className="grid grid-cols-2 gap-1.5">
        <DateTimePicker value={fromDate} type="from" onChange={onDateChange} />
        <DateTimePicker value={toDate} type="to" onChange={onDateChange} />
        <SelectBox
          options={reportOptions}
          value={selectedReport}
          onChange={onReportChange}
          label="Select Report"
        />
        <Button
          onClick={() =>
            onCreateReport({
              fromDate: fromDate.format("DD-MM-YYYY HH:mm"),
              toDate: toDate.format("DD-MM-YYYY HH:mm"),
              reportID: selectedReport,
            })
          }
          isSubmitting={isLoading}
        >
          Create Report
        </Button>
      </div>

      {/* Groups and machines  */}
    </div>
  );
};

export default ReportFilter;
