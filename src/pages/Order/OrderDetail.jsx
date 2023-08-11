import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import MapIcon from "@mui/icons-material/Map";
import PrintIcon from "@mui/icons-material/Print";
import useTableV2 from "../../components/table/useTableV2";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CustomerInfo from "../../components/card-info/CustomerInfo";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getDetailBooking } from "../../features/book/bookingSlide";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import CurrencyFormat from "react-currency-format";

const headCells = [
  { id: "bookingDetailId", label: "Id" },

  {
    id: "serviceBookingDetailDto",
    label: "Service Details",
    disableSorting: true,
  },
  { id: "serviceCost", label: "Service cost" },
  { id: "productCost", label: "Product cost" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const OrderDetail = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [open, setOpen] = React.useState(false);
  const [bid, setBid] = useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(getDetailBooking(id));
  }, [id]);

  const booking = useSelector((state) => state.booking.booking);

  const garage = useSelector((state) => state.booking.garage);
  const detail = useSelector((state) => state.booking.detail);
  const customer = useSelector((state) => state.booking.customer);

  const rows = [
    {
      id: 1,
      items: {
        image:
          "https://vnn-imgs-f.vgcloud.vn/2021/09/18/16/thay-nhot-dinh-ky-5-000-km-la-thoi-quen-nem-tien-cho-nganh-dich-vu.jpg",
        name: "Thay Nhot ",
        price: "300000",
        qty: 1,
      },

      tax: 20000,
      discount: 10000,
      total: 270000,
    },
  ];


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(detail, headCells, filterFn);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
        size={20}
        alt="order-detail"
        title="Order Details"
      />
      {/* Info Invoice */}
      <div className="row gy-3">
        <div className="col-lg-8 col-xl-9">
          <div className="card h-100">
            <div className="card-body">
              {/* Info of Order */}
              <div className="d-flex flex-wrap gap-3 justify-content-between mb-4">
                <div className="d-flex flex-column gap-3">
                  <h4 className="capitalize font-semibold">
                    Order ID #{booking.bookingId}
                  </h4>
                  <div>
                    <EventNoteIcon fontSize="inherit" />{" "}
                    {moment(booking.bookingTime).format("DD/MM/YY hh:mm:ss")}
                  </div>
                  <div className="d-flex flex-wrap gap-3">
                    <div className="badge-soft-info font-weight-bold d-flex align-items-center rounded py-1 px-2">
                      Linked orderes (1):
                    </div>
                    <Link to={""} className="btn btn-info rounded py-1 px-2">
                      1000179
                    </Link>
                  </div>
                </div>
                <div className="text-sm-right">
                  <div className="d-flex flex-wrap gap-3">
                    <div>
                      <Button
                        className="add-button"
                        size="large"
                        onClick={() => {}}
                        startIcon={<MapIcon fontSize="small" />}
                        text="Show locations on map"
                      />
                    </div>
                    <Button
                      className="add-button"
                      size="large"
                      onClick={() => {}}
                      startIcon={<PrintIcon fontSize="small" />}
                      text="Print Invoice"
                    />
                  </div>
                  {/* Status */}
                  <div className="d-flex flex-column gap-2 mt-3">
                    <div className="order-status d-flex justify-content-sm-end gap-3 text-capitalize">
                      <span className="title-color">Status: </span>
                      <span className="badge badge-soft-info font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm">
                        {booking.bookingStatus}
                      </span>
                    </div>

                    {/* Payment method */}
                    <div className="payment-method d-flex justify-content-sm-end gap-3 capitalize">
                      <span className="title-color">Payment Method: </span>
                      <strong>{booking.paymentMethod}</strong>
                    </div>

                    {/* Payment status */}
                    <div className="payment-status d-flex justify-content-sm-end gap-3">
                      <span className="title-color">Payment Status: </span>
                      <span
                        className={
                          booking.paymentStatus === "Paid"
                            ? "text-success font-weight-bold"
                            : "text-danger font-weight-bold"
                        }
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5"></div>
              {/* Table */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <>
                        <TableRow hover key={item.bookingDetailId}>
                          <TableCell sx={{ border: "none" }}>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => {
                                setBid(item.bookingDetailId);
                                setOpen(!open);
                              }}
                            >
                              {item.bookingDetailId === bid && open ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <div className="media align-items-center gap-3">
                              <img
                                className="avatar avatar-60 rounded"
                                src={item.serviceBookingDetailDto.serviceImage}
                                alt="Description"
                              />
                              <div>
                                <h6 className="title-color font-semibold">
                                  {item.serviceBookingDetailDto.serviceName}
                                </h6>
                                <div>
                                  <strong>Price:</strong>{" "}
                                  {item.serviceBookingDetailDto.servicePrice}
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell sx={{ border: "none" }}>
                            {item.serviceCost}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            {item.productCost}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <div className="d-flex justify-content-center gap-2">
                              <Tooltip title="More mechanics" arrow>
                                <Link
                                  to={`${item.bookingDetailId}`}
                                  className="btn btn-outline--primary btn-sm edit square-btn"
                                >
                                  <VisibilityIcon fontSize="small" />
                                </Link>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                        {/*  PRODUCT */}
                        {item.bookingDetailId === bid ? (
                          <TableRow key={item.productCost}>
                            <TableCell
                              style={{
                                paddingBottom: 0,
                                paddingTop: 0,
                                border: "none",
                              }}
                              colSpan={6}
                            >
                              <Collapse
                                in={open}
                                timeout="auto"
                                unmountOnExit
                                key={item.bookingDetailId}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                  >
                                    Product
                                  </Typography>
                                </Box>
                                <Table aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        sx={{
                                          fontSize: "12px",
                                          fontWeight: 600,
                                        }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          fontSize: "12px",
                                          fontWeight: 600,
                                        }}
                                      >
                                        Name
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow hover>
                                      <TableCell sx={{ border: "none" }}>
                                        {item.productBookingDetailDto.productId}
                                      </TableCell>
                                      <TableCell sx={{ border: "none" }}>
                                        {
                                          item.productBookingDetailDto
                                            .productName
                                        }
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </TableBody>
                </TblContainer>
              </div>
              <hr className="my-3" />

              {/* Total Price */}
              <div className="row justify-content-md-end mb-3">
                <div className="col-md-9 col-lg-8">
                  <dl className="row gy-1 text-sm-right">
                    <dt className="col-5">Repair costs</dt>
                    <dd className="col-6 title-color">
                      <strong>
                        {" "}
                        {/* <CurrencyFormat
                          value={booking.totalPrice}
                          displayType={"text"}
                          format={"###,###,### VND"}
                        /> */}
                        {booking.totalPrice}
                      </strong>
                    </dd>
                    <dt className="col-5">Coupon discount</dt>
                    <dd className="col-6 title-color">- 0.0</dd>
                    <dt className="col-5 ">
                      <strong>Total</strong>
                    </dt>
                    <dd className="col-6 title-color">
                      <strong>
                        {" "}
                        {/* <CurrencyFormat
                          value={booking.totalPrice}
                          displayType={"text"}
                          format={"###,###,### VND"}
                        /> */}
                        {booking.totalPrice}
                      </strong>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Info customer mechanic and garage */}
        <div className="col-lg-4 col-xl-3 d-flex flex-column gap-3">
          <CustomerInfo
            title={"Customer"}
            srcIcon={
              "https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
            }
            src={customer.userImage}
            name={customer.fullName}
            phone={customer.userPhone}
            email={customer.userEmail}
          />
          {/* Mechanic
          <StaffInfo
            title="Mechanic Info"
            name="Min Min"
            contact="0921345012"
            skill="wash, decoration"
            location="Chi nhánh số 9"
            activeDiv={activeDiv}
          />
          <StaffInfo
            title="Customer Care Staff Info"
            name="Min Min"
            contact="092134553431"
            location="Chi nhánh số 9"
          /> */}
          <CustomerInfo
            title={"Garage Information"}
            srcIcon={
              "https://6valley.6amtech.com/public/assets/back-end/img/shop-information.png"
            }
            src={garage.garageImage}
            name={garage.garageName}
            phone={garage.garageStatus}
            icon={<LocationOnIcon fontSize="inherit" />}
            location={garage.fullAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
