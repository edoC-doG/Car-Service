import "../../styles/button.scss";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";

import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoneyIcon from "@mui/icons-material/Money";
import Notification from "../../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import ModalAdd from "./AddMechanic";
import ModalEdit from "./ModalEdit";
import {
  getMechanics,
  resetState,
} from "../../features/mechanic/mechanicSlice";
import useTableV2 from "../../components/table/useTableV2";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Name" },

  { id: "contact", label: "Contact Info" },
  { id: "totalOrders", label: "Total Orders" },
  { id: "userStatus", label: "Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Mechanics = () => {
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
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
  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  //Edit
  const [showEdit, setShowEdit] = useState(false);
  const [mechaEdit, setMechaEdit] = useState({});
  const handleEdit = (mecha) => {
    setMechaEdit(mecha);
    setShowEdit(true);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateSuccessAction = useSelector(
    (state) => state.mechanic.isSuccessAction
  );
  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getMechanics(data));

    if (updateSuccessAction) {
      dispatch(resetState());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Update Successfully",
        type: "success",
      });
    }
  }, [page, updateSuccessAction, rowsPerPage]);

  const handleSwitchToggle = (mechanicId, userStatus) => {
    // Dispatch the updateCustomerStatus action
    console.log(mechanicId, userStatus);
    // dispatch(updateCustomerStatus({ userId, userStatus }));
  };
  const recordsMechanic = useSelector((state) => state.mechanic.mechanics);
  const count = useSelector((state) => state.mechanic.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsMechanic,
      headCells,
      filterFn,
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      count
    );
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://cdn-icons-png.flaticon.com/512/1995/1995470.png"
          size={20}
          alt="mechanics"
          title="Mechanic List"
          number={count}
        />

        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row justify-content-between align-items-center gy-2">
                  <div className="col-sm-8 col-md-6 col-lg-4">
                    <Search
                      label="Search by Name"
                      onChange={() => {}}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                    <div className="d-flex justify-content-sm-end">
                      <Button
                        className="add-button"
                        size="large"
                        onClick={() => setShowModal(true)}
                        startIcon={<AddIcon fontSize="small" />}
                        text="Add Mechanic"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table  */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.userId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.userId}</div>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <div className="media align-items-center gap-2">
                            {/* <img
                              className="rounded-circle avatar avatar-lg"
                              src={item.info.image}
                              alt=""
                            /> */}
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
                          <div className="mb-1">
                            <strong>
                              <Link
                                to={`mailto:${item.userMechanicDto.userEmail}`}
                                className="title-color hover-c1 lowercase"
                              >
                                {item.userMechanicDto.userEmail}
                              </Link>
                            </strong>
                          </div>
                          <Link
                            to={`tel:${item.userMechanicDto.userPhone}`}
                            className="title-color hover-c1 lowercase "
                          >
                            {item.userMechanicDto.userPhone}
                          </Link>
                        </TableCell>
                        {/* Total Ordered */}
                        <TableCell
                          sx={{
                            border: "none",
                          }}
                        >
                          <Link
                            to={`/admin/orders/list/all?mechanic_id=${item.mechanicId}`}
                            className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                          >
                            {item.totalOrders}
                          </Link>
                        </TableCell>
                        {/* status */}

                        <TableCell sx={{ border: "none" }}>
                          <Switches
                            checked={
                              item.userMechanicDto.userStatus === 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              setConfirmDialog({
                                isOpen: true,
                                title:
                                  "Are you sure to change status this record?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  handleSwitchToggle(
                                    item.mechanicId,
                                    event.target.checked ? 1 : 0
                                  );
                                },
                              });
                            }}
                          />
                        </TableCell>

                        {/* Action */}
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            {/* <Tooltip title="edit" arrow>
                              <Link
                                onClick={() => handleEdit(item)}
                                className="btn btn-outline--primary btn-sm edit"
                              >
                                <EditIcon fontSize="small" />
                              </Link>
                            </Tooltip> */}
                            <Tooltip title="Earning statement" arrow>
                              <Link
                                to={`/admin/mechanic/detail/${item.userId}`}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <MoneyIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                            {/* <Tooltip title="delelte" arrow>
                              <Link
                                className="btn btn-outline-danger btn-sm delete square-btn"
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      "Are you sure to delete this record?",
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {},
                                  });
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </Link>
                            </Tooltip> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ModalAdd show={showModal} handleClose={handleClose} />
      <ModalEdit
        show={showEdit}
        handleClose={handleClose}
        mechaEdit={mechaEdit}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Mechanics;
