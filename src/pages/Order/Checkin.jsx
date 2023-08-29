import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "../../components/filter/Search";
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
  { id: "bookingCode", label: "Mã ĐH" },
  { id: "bookingTime", label: "Thời gian bắt đầu" },
  { id: "userBookingDto", label: "Thông tin KH" },

  { id: "garageName", label: "Garage" },
  { id: "total", label: "Giá trị ĐH", align: "right" },
  { id: "bookingStatus", label: "Trạng thái ĐH", align: "center" },
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Checkin = () => {
  useEffect(() => {
    document.title = "Danh sách đơn hàng đang check";
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
      bookingStatus: 2,
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
        title="Đơn hàng đang làm"
        number={count}
      />

      <div className="card">
        {/* Filter */}
        {/* <div className="card">
          <div className="card-body">
            <form>
              <div className="row gy-3 gx-2">
                <div className="col-12 pb-0">
                  <h4 className="font-semibold">Chọn ngày</h4>
                </div>
                <div className="col-sm-6 col-md-3">
                  <Select title={"All"} value={age} onChange={handleChange} />
                </div>
                <div className="col-sm-6 col-md-3">
                  <DateTime label={"Ngày bắt đầu"} />
                </div>
                <div className="col-sm-6 col-md-3 mt-2 mt-sm-0">
                  <DateTime label={"Ngày kết thúc"} />
                </div>
                <div className="col-sm-6 col-md-3 mt-2 mt-sm-0">
                  <Button
                    sx={{ height: "54.56px" }}
                    className="add-button"
                    size="large"
                    onClick={() => {}}
                    fullWidth
                    text="Lọc dữ liệu"
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
                  label="Tìm kiếm bằng ID đơn hàng"
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
              {/* <div className="col-sm-4 col-md-6 col-lg-8 d-flex justify-content-sm-end">
                <Button
                  variant="outlined"
                  className="export-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<FileDownloadIcon fontSize="small" />}
                  text="Export"
                />
              </div> */}
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
                         {" "}
                              {item.paymentStatus === "Unpaid"
                                ? "Chưa thanh toán"
                                : "Đã thanh toán"}{" "}
                      </span>
                    </TableCell>

                    <TableCell sx={{ border: "none", textAlign: "center" }}>
                      <span className="badge badge-soft-warning fz-12">
                      {" "}
                              {item.bookingStatus === "Pending"
                                ? "Sắp tới"
                                : item.bookingStatus === "CheckIn"
                                ? "Đang làm"
                                : item.bookingStatus === "Completed"
                                ? "Hoàn thành"
                                : item.bookingStatus === "CheckOut"
                                ? "Đã xong"
                                :item.bookingStatus === "Processing"
                                ? "Đang tiến hành"
                                : "Hủy Bỏ"
                              }{" "}
                      </span>
                    </TableCell>

                    <TableCell sx={{ border: "none" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Tooltip title="Chi tiết" arrow>
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

export default Checkin;
