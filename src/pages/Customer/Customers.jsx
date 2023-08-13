import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  getNumberCustomer,
  updateCustomerStatus,
  resetState,
} from "../../features/customer/customerSilde";
import Notification from "../../components/Notification";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Customer Name" },
  { id: "userEmail", label: "Contact Info" },
  { id: "totalBooking", label: "Total Booking" },
  { id: "userStatus", label: "Block/Unblock" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Customers = () => {

  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size

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

  const updateSuccessAction = useSelector((state) => state.customer.isSuccessAction);
  useEffect(()=>{
    document.title = "List of customers"
  })

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getCustomers(data));
    dispatch(getNumberCustomer());

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

  const recordsCustomer = useSelector((state) => state.customer.customers);

  const count = useSelector((state) => state.customer.number);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // console.log("records", recordsCustomer);

  const handleSwitchToggle = (userId, userStatus) => {
    // Dispatch the updateCustomerStatus action
    // console.log(userId, userStatus);
    dispatch(updateCustomerStatus({ userId, userStatus }));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsCustomer,
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
          icon="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
          size={20}
          alt="customer"
          title="Customer List"
          number={count}
        />
        <div className="card">
          <div className="px-3 py-4">
            <div className="row gy-2 align-items-center">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <Search
                  label="Search by Name or Email or Phone"
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
                    variant="outlined"
                    className="export-button"
                    size="large"
                    onClick={() => {}}
                    startIcon={<FileDownloadIcon fontSize="small" />}
                    text="Export"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.userId}>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.userId}</div>
                    </TableCell>
                    {/* NAME AND IMAGE */}
                    <TableCell sx={{ border: "none" }}>
                      <Link
                        to={`/admin/customer/view/${item.userId}`}
                        className="title-color hover-c1 d-flex align-items-center gap-3 "
                      >
                        <img
                          src={item.userImage}
                          alt="avatar"
                          width="40"
                          className="rounded-circle"
                        />
                        {item.fullName}
                      </Link>
                    </TableCell>
                    {/* EMAIL AND PHONE */}
                    <TableCell sx={{ border: "none" }}>
                      <div className="mb-1">
                        <strong>
                          <Link
                            to={`mailto:${item.userEmail}`}
                            className="title-color hover-c1 lowercase"
                          >
                            {item.userEmail}
                          </Link>
                        </strong>
                      </div>
                      <Link
                        to={`tel:${item.userPhone}`}
                        className="title-color hover-c1 lowercase"
                      >
                        {item.userPhone}
                      </Link>
                    </TableCell>
                    {/* Quantity Ordered */}
                    <TableCell sx={{ border: "none" }}>
                      <label className="btn text-info bg-soft-info font-weight-bold px-3 py-1 mb-0 fz-12">
                        {item.totalBooking}
                      </label>
                    </TableCell>
                    {/* Block and unblock */}
                    <TableCell sx={{ border: "none" }}>
                      <Switches
                        checked={item.userStatus === "Activate" ? true : false}
                        onChange={(event) => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to change status this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              handleSwitchToggle(
                                item.userId,
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
                        <Tooltip title="view" arrow>
                          <Link
                            to={`/admin/customer/view/${item.userId}`}
                            className="btn btn-outline-info btn-sm square-btn"
                          >
                            <VisibilityIcon fontSize="small" />
                          </Link>
                        </Tooltip>
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Customers;
