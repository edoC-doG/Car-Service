import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import MapIcon from "@mui/icons-material/Map";
import PrintIcon from "@mui/icons-material/Print";
import useTableV2 from "../../components/table/useTableV2";
import { Link, useLocation } from "react-router-dom";
import CustomerInfo from "../../components/card-info/CustomerInfo";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getDetailBooking } from "../../features/book/bookingSlide";
import { useDispatch, useSelector } from "react-redux";
import TableOrderDetail from "../../components/order-detail/TableOrderDetail";
import MechanicsOrder from "../../components/order-detail/MechanicsOrder";

const headCells = [
  { id: "bookingDetailId", label: "Id" },

  {
    id: "serviceBookingDetailDto",
    label: "Service Details",
    disableSorting: true,
  },
  { id: "serviceCost", label: "Service cost" },
  { id: "productCost", label: "Product cost" },
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

  useEffect(() => {
    dispatch(getDetailBooking(id));
  }, [id]);
  
  const booking = useSelector((state) => state.booking.booking);
  const garage = useSelector((state) => state.booking.garage);
  const detail = useSelector((state) => state.booking.detail);
  const customer = useSelector((state) => state.booking.customer);

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
                />
              )}

              {type === "allotment of repairman" && (
                <MechanicsOrder  bookingId={id} status={booking.bookingStatus}/>
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
      </div>
    </div>
  );
};

export default OrderDetail;
