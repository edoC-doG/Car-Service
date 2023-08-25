import React from "react";
import "../styles/dialog.scss";
import Button from "../components/filter/Button";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  return (
    <Dialog open={confirmDialog.isOpen} className="dialog">
      <DialogTitle style={{ textAlign: "center" }} sx={{ margin: "40px" }}>
        <IconButton disableRipple className="icon">
          <NotListedLocationIcon style={{ fontSize: "8rem", color: "red" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ textAlign: "center" }}>
        <Typography variant="h5">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          text="Không"
          className="no"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />

        <Button text="Có" className="yes" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
