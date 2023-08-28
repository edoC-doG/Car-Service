import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box } from "@mui/material";
const eightAM = dayjs().set("hour", 8).startOf("hour");
const fivePM = dayjs().set("hour", 17).startOf("hour");
const Time = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: 1 }}>
        <TimePicker
          className="w-full"
          maxTime={fivePM}
          minTime={eightAM}
          value={value}
          onChange={onChange}
          shouldDisableTime={(value, view) => view === 'minutes' && value.minute() >= 1}
        />
      </Box>
    </LocalizationProvider>
  );
};
export default Time;
