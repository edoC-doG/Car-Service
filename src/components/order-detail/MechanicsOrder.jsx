import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "../filter/Button";
import { useDispatch, useSelector } from "react-redux";
import useTableV2 from "../table/useTableV2";
import Notification from "../Notification";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../ConfirmDialog";
import {
  getMechanicsByBookingId,
  updateMechanicByBookingId,
  resetState,
} from "../../features/mechanic/mechanicSlice";
import ActionButton from "../ActionButton";
import Popup from "../Popup";

const MechanicsOrder = ({ bookingId, status }) => {
  const headCells = [
    { id: "fullName", label: "Name" },
    { id: "contact", label: "Contact Info" },
    { id: "userStatus", label: "Status" },
    status !== "Completed" ?
    {
      id: "action",
      label: "Action",
      disableSorting: true,
  
      align: "center",
    } : {disableSorting: true,},
  ];
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateSuccessAction = useSelector(
    (state) => state.mechanic.isSuccessAction
  );
  useEffect(() => {
    dispatch(getMechanicsByBookingId(bookingId));
    if (updateSuccessAction) {
      dispatch(resetState());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Delete Successfully",
        type: "success",
      });
    }
  }, [bookingId, updateSuccessAction]);
  const recordsMechanic = useSelector((state) => state.mechanic.mechanics);

  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTableV2(
    recordsMechanic,
    headCells,
    filterFn
  );

  const handleDeleteMechanic = (mechanicId) => {
    dispatch(updateMechanicByBookingId({ bookingId: bookingId, mechanicId }));
  };
  return (
    <>
      <div className="row justify-content-end align-items-end mb-4">
        <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
          <div className="d-flex justify-content-sm-end">
            <Button
              className="add-button"
              size="small"
              onClick={() => {
                setOpenPopup(true);
              }}
              startIcon={<AddIcon fontSize="small" />}
              text="Add new"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow hover key={item.userId}>
                <TableCell sx={{ border: "none" }}>
                  <div className="media align-items-center gap-2">
                    <div>
                      <Link
                        to={`/admin/mechanic/detail/${item.userId}`}
                        className="title-color"
                      >
                        {item.userMechanicDto.fullName}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  <Link
                    to={`tel:${item.userMechanicDto.userPhone}`}
                    className="title-color hover-c1 lowercase "
                  >
                    {item.userMechanicDto.userPhone}
                  </Link>
                </TableCell>
                {/* status */}

                <TableCell sx={{ border: "none" }}>
                  <span
                    className={
                      item.userMechanicDto.userStatus === 1
                        ? "badge badge-soft-success fz-12"
                        : "badge badge-soft-danger fz-12"
                    }
                  >
                    {item.userMechanicDto.userStatus === 1
                      ? "Activate"
                      : "Disable"}
                  </span>
                </TableCell>

                {/* Action */}
                {status === "Completed" ? (
                  ""
                ) : (
                  <TableCell sx={{ border: "none" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <Tooltip title="delelte" arrow>
                        <div
                          className="btn btn-outline-danger btn-sm delete square-btn"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                handleDeleteMechanic(item.userId);
                              },
                            });
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </div>
                      </Tooltip>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </div>
      <Popup title="Add new" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        Continue ....
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default MechanicsOrder;
