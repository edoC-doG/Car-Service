import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import PrintIcon from "@mui/icons-material/Print";
import useTableV2 from "../../components/table/useTableV2";
import { Link, useLocation } from "react-router-dom";
import CustomerInfo from "../../components/card-info/CustomerInfo";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getDetailBooking } from "../../features/book/bookingSlide";
import { useDispatch, useSelector } from "react-redux";
import TableOrderDetail from "../../components/order-detail/TableOrderDetail";
import MechanicsOrder from "../../components/order-detail/MechanicsOrder";
import PaidIcon from "@mui/icons-material/Paid";
import ModalMoney from "./ModalMoney";
import Notification from "../../components/Notification";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ModalStatus from "./ModalStatus";
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

const tabs = ["detail", "allotment of repairman"];
const OrderDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [type, setType] = useState("detail");
  const [open, setOpen] = React.useState(false);
  const [bid, setBid] = useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    dispatch(getDetailBooking(id));
  }, [id]);

  const booking = useSelector((state) => state.booking.booking);
  const orderId = booking.bookingId;
  const garage = useSelector((state) => state.booking.garage);
  const detail = useSelector((state) => state.booking.detail);
  const customer = useSelector((state) => state.booking.customer);
  const status = useSelector((state) => state.booking);
  const { message, isSuccessAdd } = status;
  const getData = () => {
    dispatch(getDetailBooking(id));
  };
  useEffect(() => {
    getData();
    if (isSuccessAdd === true ) {
      setNotify({
        isOpen: true,
        message:"Thành Công",
        type: "success",
      });
      handleClose();
    } else if ( message.status === 404
    ) {
      setNotify({
        isOpen: true,
        message: message.title,
        type: "error",
      });
    }
  }, [isSuccessAdd, message]);
  //Add
  const [showModal, setShowModal] = useState(false);
  const [money, setMoney] = useState("");
  const handleClose = () => {
    setShowModal(false);
    setShowStt(false);
    setShowDetail(false)
  };
  const handleMoney = (orderId) => {
    setShowModal(true);
    setMoney(orderId);
  };
  //STT
  const [showStt, setShowStt] = useState(false);
  const [orderSta, setOrderSta] = useState("");
  const handleStt = (orderId) => {
    setShowStt(true);
    setOrderSta(orderId);
  };
  //Detail
  const [showDetail, setShowDetail]= useState(false);
  const [detailService, setDetail] = useState("");
  const handleDetail = (item) => {
    setShowDetail(true)
    setDetail(item)
  }
  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTableV2(
    detail,
    headCells,
    filterFn
  );
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
                    <EventNoteIcon fontSize="inherit" /> {booking.bookingTime}
                  </div>
                </div>
                <div className="text-sm-right">
                  <div className="d-flex flex-wrap gap-3">
                    <div>
                      <Button
                        className="add-button"
                        size="large"
                        onClick={() => handleMoney(orderId)}
                        startIcon={<PaidIcon fontSize="small" />}
                        text="Thanh toán"
                      />
                    </div>
                    <Button
                      className="add-button"
                      size="large"
                      onClick={() => handleStt(orderId)}
                      startIcon={<NoteAltIcon fontSize="small" />}
                      text="Thay đổi trạng thái đơn hàng"
                    />
                  </div>
                  {/* Status */}
                  <div className="d-flex flex-column gap-2 mt-3">
                    <div className="order-status d-flex justify-content-sm-end gap-3 text-capitalize">
                      <span className="title-color">Status: </span>

                      <span
                        className={

                          booking.bookingStatus=== "Pending"
                            ? "badge badge-soft-danger fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm "
                            : booking.bookingStatus=== "CheckIn"
                            ? "badge badge-soft-warning fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                            : booking.bookingStatus=== "Processing"
                            ? "badge badge-soft-info fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                            : booking.bookingStatus=== "Completed"
                            ? "badge badge-soft-success fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                            : booking.bookingStatus=== "CheckOut"
                            ? "badge badge-soft-success fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                            : "badge badge-danger fz-12"
                        }
                      >
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
              <div className="mb-7">
                <div
                  className="js-nav-scroller hs-nav-scroller-horizontal"
                  style={{ backgroundColor: "#f9f9fb", margin: "0 -1.315rem" }}
                >
                  <ul className="nav nav-tabs flex-wrap page-header-tabs">
                    {tabs.map((tap) => (
                      <li
                        style={{ backgroundColor: "#f9f9fb" }}
                        className="nav-item"
                        key={tap}
                      >
                        <Link
                          className={
                            tap === type
                              ? "nav-link active"
                              : "nav-link capitalize"
                          }
                          onClick={() => setType(tap)}
                        >
                          {tap}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {type === "detail" && (
                <TableOrderDetail
                  detail={recordsAfterPagingAndSorting()}
                  booking={booking}
                  TblContainer={TblContainer}
                  TblHead={TblHead}
                  setBid={setBid}
                  bid={bid}
                  setOpen={setOpen}
                  open={open}
                  key={booking}
                  showDetail={showDetail}
                  handleDetail={handleDetail}
                  handleClose={handleClose}
                  setDetail={setDetail}
                  detailService={detailService}
                />
              )}
              {type === "allotment of repairman" && (
                <MechanicsOrder bookingId={id} status={booking.bookingStatus} />
              )}
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
        <ModalMoney show={showModal} handleClose={handleClose} money={money} />
        <ModalStatus
          show={showStt}
          handleClose={handleClose}
          orderSta={orderSta}
        />
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default OrderDetail;
