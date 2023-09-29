import {
  Box,
  Dialog,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Button from "../filter/Button";
import "../../styles/button.scss";
const CalendarEventDialog = (props) => {
  const { event, open = false, onClose } = props;
  // Parse the event.end date string into a Date object
  const endDate = event?.end
    ? dayjs(event.end).format("DD/MM/YYYY hh:mm:ss")
    : null;
  const startDate = event?.start
    ? dayjs(event.start).format("DD/MM/YYYY hh:mm:ss")
    : null;
  const title = event?.title || "";
  const status = event?.bookingStatus || "";
  //   console.log(endDate);
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <form>
        <Box sx={{ p: 3 }}>
          <Typography align="center" gutterBottom variant="h5">
            Chi tiet
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <TextField fullWidth label="Info" name="title" value={title} />
          <TextField fullWidth label="Trạng thái đơn hàng" name='bookingStatus' value={status === "Pending" ? "Đang chờ check-in" : status === "CheckIn" ?  "Check In" : status === "Warranty" ? "Bảo hành" : ""} />
          <TextField fullWidth label="Check-in" value={startDate} />
          <TextField fullWidth label="Check-out" value={endDate} />
        </Stack>
        <Divider />
        <div className=" flex m-3 justify-end fix">
          <Button
            variant="outlined"
            className="export-button ml-2"
            size="medium"
            onClick={onClose}
            text="Close"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default CalendarEventDialog;
CalendarEventDialog.propTypes = {
  event: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
