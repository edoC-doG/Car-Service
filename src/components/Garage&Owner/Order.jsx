import React, { useEffect, useState } from "react";
import PendingIcon from "@mui/icons-material/Pending";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountBookingStatus,
  getBookingsByGarage,
} from "../../features/book/bookingSlide";
import useTableV2 from "../table/useTableV2";

const headCells = [
  { id: "bookingCode", label: "Code" },
  { id: "bookingTime", label: "Order Date" },
  { id: "userBookingDto", label: "Customer Info" },

  { id: "garageName", label: "Garage" },
  { id: "total", label: "Total Amount" },
  { id: "bookingStatus", label: "Order Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Order = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[4];
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage, garageId: id };
    dispatch(getBookingsByGarage(data));
    dispatch(getCountBookingStatus(id));
  }, [id, page, rowsPerPage]);

  const records = useSelector((state) => state.booking.bookings);
  const count = useSelector((state) => state.booking.number);

  const statusDetail = useSelector((state) => state.booking.booking);


  const rows = [
    {
      id: 1,
      order: 1034342,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      customer: "Min mIn",
      payStatus: "Paid",
      total: "1.000.000 VND",
      orderStatus: "Confirmed",
    },
    {
      id: 2,
      order: 100181,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      customer: "Dung ",
      payStatus: "Unpaid",
      total: "1.000.000 VND",
      orderStatus: "Pending",
    },

    {
      id: 3,
      order: 100181,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      customer: "Long",
      payStatus: "Unpaid",
      total: "1.000.000 VND",
      orderStatus: "Canceled",
    },

    {
      id: 4,
      order: 100182,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      customer: "Quynen",
      payStatus: "Unpaid",
      total: "1.000.000 VND",
      orderStatus: "Canceled",
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      records,
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
    <div className="tab-content">
      <div className="tab-pane fade show active">
        <div className="row pt-2">
          <div className="col-md-12">
            <div className="card w-100">
              {/* Title */}
              <div className="card-header">
                <h5 className="mb-0 font-semibold"> Order Info</h5>
              </div>
              {/* the number of the status */}
              <div className="card-body">
                <div className="row">
                  {/* All */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <WidthFullIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">All</h6>
                      </div>
                      <div className="order-stats__title">{count}</div>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <CheckCircleSharpIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Confirmed</h6>
                      </div>
                      <div className="order-stats__title">
                        {statusDetail.completed}
                      </div>
                    </div>
                  </div>
                  {/* Pending */}
                  <div className="col-md-3  mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <PendingIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Pending</h6>
                      </div>
                      <div className="order-stats__title">
                        {statusDetail.pending}
                      </div>
                    </div>
                  </div>
                  {/* Canceled */}
                  <div className="col-md-3  mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <HighlightOffIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Cancel</h6>
                      </div>
                      <div className="order-stats__title">
                        {statusDetail.canceled}
                      </div>
                    </div>
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

                        <TableCell sx={{ border: "none" }}>
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
                                to={`/admin/orders/details/${item.bookingId}`}
                                className="btn btn-outline--primary btn-sm edit square-btn"
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
              <div className="table-responsive mt-4">
                <div className="px-4 d-flex justify-content-lg-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
