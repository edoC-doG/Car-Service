import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

const today = dayjs();
const DateTime = ({
  name,
  label,
  value,
  onChange,
  size,
  orther,
  onError,
  errorMessage,
  defaultValue
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dapterLocale={"en-gb"}>
      <Box sx={{ width: 1 }}>
        <DatePicker
          className="w-full"
          minDate={today}
          defaultValue={defaultValue}
          format="DD/MM/YYYY"
          value={value}
          label={label}
          onChange={onChange}
          name={name}
          onError={onError}
          slotProps={{
            textField: {
              helperText: errorMessage,
            },
          }}
          {...orther}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateTime;
