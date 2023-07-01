import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Select from "../../components/filter/Select";
import DateTime from "../../components/filter/DateTime";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import BoxOrder from "../../components/filter/BoxOrder";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "../../components/filter/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../features/book/bookingSlide";

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
const All = () => {
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const rows = [
    {
      id: 1,
      order: 1020392,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Min Min",
        phone: "081233423432",
      },
      garare: "Auto Garage",
      total: {
        price: "5.000.000",
        status: "Unpaid",
      },
      status: "Pending",
    },
    {
      id: 2,
      order: 1020393,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Long ",
        phone: "0324234",
      },
      garare: "Auto Garage",
      total: {
        price: "1.000.000",
        status: "unpaid",
      },
      status: "Pending",
    },
    {
      id: 3,
      order: 1020394,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Hello",
        phone: "032131231",
      },
      garare: "Auto Garage",
      total: {
        price: "5.000.000",
        status: "Paid",
      },
      status: "Confirmed",
    },
    {
      id: 4,
      order: 1020395,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Hello word",
        phone: "03213123132423",
      },
      garare: "Auto Garage",
      total: {
        price: "10.000.000",
        status: "Paid",
      },
      status: "Confirmed",
    },
    {
      id: 5,
      order: 1020396,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Dung",
        phone: "",
      },
      garare: "Auto Garage",
      total: {
        price: "25.000.000",
        status: "unPaid",
      },
      status: "Canceled",
    },
    {
      id: 6,
      order: 1020399,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Quyen",
        phone: "",
      },
      garare: "Auto Garage",
      total: {
        price: "9000.000",
        status: "Paid",
      },
      status: "Confirmed",
    },
  ];
  const [age, setAge] = React.useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getBookings(data));
  }, [page, rowsPerPage]);


  const recordsBooking = useSelector((state) => state.booking.bookings);
  console.log(recordsBooking);
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
        title="All Orders"
        number={count}
      />
      <div className="card">
        {/* Filter */}
        <div className="card">
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
        </div>

        <div className="card-body">
          {/* The number of Order statuses */}
          <div className="row g-2 mb-5">
            <BoxOrder
              link={"pending-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
              }
              content={"Pending"}
              quantity={"58"}
            />

            <BoxOrder
              link={"confirm-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png"
              }
              content={"Confirmed"}
              quantity={"21"}
            />
            <BoxOrder
              link={"cancel-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/canceled.png"
              }
              content={"Canceled"}
              quantity={"10"}
            />
          </div>
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
              <div className="col-sm-4 col-md-6 col-lg-8 d-flex justify-content-sm-end">
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

          {/* Table */}
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.bookingCode}>
                    <TableCell sx={{ border: "none" }}>
                      <Link
                        to={`/admin/orders/details/${item.bookingCode}`}
                        className="title-color hover-c1"
                      >
                        {item.bookingCode}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.bookingTime}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Link to={``} className="text-body text-capitalize">
                        <strong>{item.userBookingDto.fullName}</strong>
                      </Link>
                      <Link
                        to={`tel:${item.userBookingDto.userPhone}`}
                        className="d-block title-color"
                      >
                        {item.userBookingDto.userPhone}
                      </Link>
                    </TableCell>

                    <TableCell sx={{ border: "none" }}>
                      <div>{item.garageBookingDto.garageName}</div>
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

                    <TableCell
                      sx={{
                        border: "none",
                        textDecoration: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      <span
                        className={
                          item.bookingStatus === "Pending"
                            ? "badge badge-soft-danger fz-12"
                            : item.bookingStatus === "CheckIn"
                            ? "badge badge-soft-warning fz-12"
                            : item.bookingStatus === "Processing"
                            ? "badge badge-soft-info fz-12"
                            : item.bookingStatus === "Completed"
                            ? "badge badge-soft-success fz-12"
                            : "badge badge-danger fz-12"
                        }
                      >
                        {item.bookingStatus}
                      </span>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Tooltip title="view" arrow>
                          <Link
                            to={`/admin/orders/details/${item.bookingCode}`}
                            className="btn btn-outline--primary btn-sm edit square-btn"
                          >
                            <VisibilityIcon fontSize="small" />
                          </Link>
                        </Tooltip>
                        <Tooltip title="Invoice" arrow>
                          <Link className="btn btn-outline-info btn-sm square-btn">
                            <DownloadForOfflineSharpIcon fontSize="small" />
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
    </div>
  );
};

export default All;
