import React, { useState } from "react";
import MachineList from "../UI/MachineList";
import DateTimePicker from "../UI/DateTimePicker";
import dayjs from "dayjs";
import { eventOptions } from "../../constants/options";
import SelectBox from "../UI/SelectBox";
import Button from "../UI/Button";

const EventFilter = ({ handleFilterSubmit }) => {
  const [startDate, setStartDate] = useState(dayjs().startOf('day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [eventType, setEventType] = useState("all");

  const onDateChange = (value, type) => {
    if (type === "from") setStartDate(value);
    else setEndDate(value);
  };

  const onEventTypeChange = (event) => {
    setEventType(event?.target?.value);
  };

  const handleSumit = async () => {
    const payload = {
      selectedVehicles,
      endDate: endDate.format("DD-MM-YYYY HH:mm:ss"),
      startDate: startDate.format("DD-MM-YYYY HH:mm:ss"),
      eventType,
    };
    await handleFilterSubmit(payload);
  };

  return (
    <div className="w-full py-2 px-8 flex-row-between gap-3 bg-slate-100 shadow rounded-full">
      <MachineList
        selectedVehicles={selectedVehicles}
        setSelectedVehicles={setSelectedVehicles}
      />
      <DateTimePicker value={startDate} type="from" onChange={onDateChange} />
      <DateTimePicker value={endDate} type="to" onChange={onDateChange} />

      <SelectBox
        options={eventOptions}
        value={eventType}
        onChange={onEventTypeChange}
        label="Select event type"
      />
      <Button className="py-1.5" onClick={() => handleSumit()}>
        Apply
      </Button>
    </div>
  );
};

export default EventFilter;
