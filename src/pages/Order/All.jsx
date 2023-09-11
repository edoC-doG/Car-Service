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
import {
  getBookings,
  getCountBookingStatus,
  getBookingsByGarage,
  resetState,
} from "../../features/book/bookingSlide";
import authService from "../../features/auth/authService";

const headCells = [
  { id: "bookingCode", label: "Mã ĐH" },
  { id: "bookingTime", label: "bắt đầu" },
  { id: "bookingTime", label: "kết thúc" },
  { id: "userBookingDto", label: "Thông tin KH" },

  { id: "garageName", label: "Địa chỉ" },
  { id: "total", label: "Giá trị ĐH", align: "right" },
  { id: "bookingStatus", label: "Trạng thái",  align: "center" },
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];
const All = () => {
  useEffect(() => {
    document.title = "Danh sách Tất cả Đơn hàng";
  }, []);
  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
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
  //  dispatch(resetState())
    if (role === "Admin") {
      dispatch(getBookings(data));
      dispatch(getCountBookingStatus());
    } else if (role === "Manager") {
      dispatch(getBookingsByGarage({ ...data, garageId: user?.garageId }));
      dispatch(getCountBookingStatus(user?.garageId));
    }
  }, [page, rowsPerPage, role]);

  const recordsBooking = useSelector((state) => state.booking.bookings);
  // console.log(recordsBooking);
  const count = useSelector((state) => state.booking.number);
  const statusDetail = useSelector((state) => state.booking.booking);

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
        title="Tất cả đơn hàng"
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
          {/* The number of Order statuses */}
          <div className="row g-2 mb-5">
            <BoxOrder
              link={"pending-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
              }
              content={"Sắp tới"}
              quantity={statusDetail.pending}
            />
             <BoxOrder
              link={"checkin-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png"
              }
              content={"Đang làm"}
              quantity={statusDetail.checkIn}
            />

            <BoxOrder
              link={"confirm-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png"
              }
              content={"Hoàn thành"}
              quantity={statusDetail.completed}
            />
            <BoxOrder
              link={"cancel-order"}
              src={
                "https://6valley.6amtech.com/public/assets/back-end/img/canceled.png"
              }
              content={"Hủy bỏ"}
              quantity={statusDetail.canceled}
            />
          </div>
          {/* Search and export */}
          {/* <div className="px-3 py-4 light-bg">
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
            </div>
          </div> */}

          {/* Table */}
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.bookingId}>
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
                      <div>{item.bookingTime}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <strong className="text-body text-capitalize">
                        {item.userBookingDto?.fullName}
                      </strong>

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
                            : item.bookingStatus === "CheckOut"
                            ? "badge badge-soft-success fz-12"
                            : "badge badge-danger fz-12"
                        }
                      >
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

export default All;
