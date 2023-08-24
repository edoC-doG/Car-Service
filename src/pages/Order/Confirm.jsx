import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "../../components/filter/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Select from "../../components/filter/Select";
import DateTime from "../../components/filter/DateTime";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { getBookingsStatus } from "../../features/book/bookingSlide";
import useTableV2 from "../../components/table/useTableV2";
import authService from "../../features/auth/authService";

const headCells = [
  { id: "bookingCode", label: "Code" },
  { id: "bookingTime", label: "Order Date" },
  { id: "userBookingDto", label: "Customer Info" },

  { id: "garageName", label: "Garage" },
  { id: "total", label: "Total Amount", align: "right" },
  { id: "bookingStatus", label: "Order Status", align: "center" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Confirm = () => {
  useEffect(() => {
    document.title = "Danh sách đơn hàng hoàn thành";
  }, []);
  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    const data = {
      pageIndex: page + 1,
      pageSize: rowsPerPage,
      bookingStatus: 4,
    };
    if (role === "Admin") dispatch(getBookingsStatus(data));
    else if (role === "Manager")
      dispatch(getBookingsStatus({ ...data, garageId: user?.garageId }));
  }, [page, rowsPerPage]);

  const recordsBooking = useSelector((state) => state.booking.bookings);
  const count = useSelector((state) => state.booking.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsBooking,
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
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
        size={20}
        alt="all"
        title="Complete Orders"
        number={count}
      />

      <div className="card">
        {/* Filter */}
        {/* <div className="card">
          <div className="card-body">
            <form>
              <div className="row gy-3 gx-2">
                <div className="col-12 pb-0">
                  <h4 className="font-semibold">Select Date Range</h4>
                </div>
                <div className="col-sm-6 col-md-3">
                  <Select title={"All"} value={age} onChange={handleChange} />
                </div>
                <div className="col-sm-6 col-md-3">
                  <DateTime label={"Start Date"} />
                </div>
                <div className="col-sm-6 col-md-3 mt-2 mt-sm-0">
                  <DateTime label={"End Date"} />
                </div>
                <div className="col-sm-6 col-md-3 mt-2 mt-sm-0">
                  <Button
                    sx={{ height: "54.56px" }}
                    className="add-button"
                    size="large"
                    onClick={() => {}}
                    fullWidth
                    text="Show Data"
                  />
                </div>
              </div>
            </form>
          </div>
        </div> */}
        <div className="card-body">
          {/* Search and export */}
          <div className="px-3 py-4 light-bg">
            <div className="row g-2 flex-grow-1">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <Search
                  label="Search by Order ID"
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
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.bookingCode}>
                    <TableCell sx={{ border: "none" }}>
                      {role === "Admin" ? (
                        <Link
                          to={`/admin/orders/details/${item.bookingId}`}
                          className="title-color hover-c1"
                        >
                          {item.bookingCode}
                        </Link>
                      ) : (
                        <Link
                          to={`/manager/orders/details/${item.bookingId}`}
                          className="title-color hover-c1"
                        >
                          {item.bookingCode}
                        </Link>
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.bookingTime}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Link to={``} className="text-body text-capitalize">
                        <strong>{item.userBookingDto?.fullName}</strong>
                      </Link>
                      <Link
                        to={`tel:${item.userBookingDto?.userPhone}`}
                        className="d-block title-color"
                      >
                        {item.userBookingDto?.userPhone}
                      </Link>
                    </TableCell>

                    <TableCell sx={{ border: "none" }}>
                      <div>{item.garageBookingDto?.garageName}</div>
                    </TableCell>

                    <TableCell sx={{ border: "none", textAlign: "right" }}>
                      <div>{item.totalPrice}</div>
                      <span
                        className={
                          item.paymentStatus === "Unpaid"
                            ? "badge text-danger fz-12 px-0"
                            : "badge text-success fz-12 px-0"
                        }
                      >
                        {item.paymentStatus}
                      </span>
                    </TableCell>

                    <TableCell sx={{ border: "none", textAlign: "center" }}>
                      <span className="badge badge-soft-success fz-12">
                        {item.bookingStatus}
                      </span>
                    </TableCell>

                    <TableCell sx={{ border: "none" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Tooltip title="view" arrow>
                          {role === "Admin" ? (
                            <Link
                              to={`/admin/orders/details/${item.bookingId}`}
                              className="btn btn-outline--primary btn-sm edit square-btn"
                            >
                              <VisibilityIcon fontSize="small" />
                            </Link>
                          ) : (
                            <Link
                              to={`/manager/orders/details/${item.bookingId}`}
                              className="btn btn-outline--primary btn-sm edit square-btn"
                            >
                              <VisibilityIcon fontSize="small" />
                            </Link>
                          )}
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
    </div>
  );
};

export default Confirm;
