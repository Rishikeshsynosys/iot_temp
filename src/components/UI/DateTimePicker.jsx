import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers";

const DateTimePicker = ({ onChange, type, value=dayjs() }) => {

  return (
    <div className="flex mui-date-picker bg-white rounded-sm py-0.5 text-gray">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUIDateTimePicker
          orientation="landscape"
          value={value}
          onChange={(newValue) => {
            onChange(newValue, type);
          }}
          format="DD-MM-YYYY HH:mm:ss"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateTimePicker;
