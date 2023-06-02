import React, { useState } from "react";
import Header from "../../components/Header";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import MapIcon from "@mui/icons-material/Map";
import PrintIcon from "@mui/icons-material/Print";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import CustomerInfo from "../../components/card-info/CustomerInfo";
import StaffInfo from "../../components/card-info/StaffInfo";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const headCells = [
  { id: "id", label: "ID" },
  { id: "items", label: "ItemsDetails", disableSorting: true },
  { id: "tax", label: "Tax" },
  { id: "discount", label: "Discount" },
  { id: "total", label: "Total Price" },
];

const OrderDetail = () => {
  const [paid, setPaid] = useState("Paid");
  const [activeDiv, setActiveDiv] = useState(true);
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
    useTable(rows, headCells);
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
                  <h4 className="capitalize font-semibold">Order ID #100280</h4>
                  <div>
                    <EventNoteIcon fontSize="inherit" />{" "}
                    {new Date().toLocaleString() + ""}
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
                        Complete
                      </span>
                    </div>

                    {/* Payment method */}
                    <div className="payment-method d-flex justify-content-sm-end gap-3 capitalize">
                      <span className="title-color">Payment Method: </span>
                      <strong>Cash</strong>
                    </div>

                    {/* Payment status */}
                    <div className="payment-status d-flex justify-content-sm-end gap-3">
                      <span className="title-color">Payment Status: </span>
                      <span
                        className={
                          paid
                            ? "text-success font-weight-bold"
                            : "text-danger font-weight-bold"
                        }
                      >
                        {paid}
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
                    {rows.map((item) => (
                      <TableRow hover key={item.id}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.id}</div>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <div className="media align-items-center gap-3">
                            <img
                              className="avatar avatar-60 rounded"
                              src={item.items.image}
                              alt="Image Description"
                            />
                            <div>
                              <h6 className="title-color font-semibold">
                                {item.items.name}
                              </h6>
                              <div>
                                <strong>Price:</strong> {item.items.price}
                              </div>
                              <div>
                                <strong>Qty:</strong> {item.items.qty}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          {item.tax}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {item.discount}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {item.total}
                        </TableCell>
                      </TableRow>
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
                      <strong>50.000</strong>
                    </dd>
                    <dt className="col-5">Coupon discount</dt>
                    <dd className="col-6 title-color">- 0.0</dd>
                    <dt className="col-5 ">
                      <strong>Total</strong>
                    </dt>
                    <dd className="col-6 title-color">
                      <strong>420.000</strong>
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
            src={
              "https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png"
            }
            name={"Thanh Min"}
            numberOfOrder={"11 "}
            content={"Orders"}
            phone={"0921243341"}
            email={"thanhminh1452000@gmail.com"}
          />
          {/* Mechanic */}
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
          />
          <CustomerInfo
            title={"Garage Information"}
            srcIcon={
              "https://6valley.6amtech.com/public/assets/back-end/img/shop-information.png"
            }
            src={
              "https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f38e9ce54.png"
            }
            name={"Garage"}
            numberOfOrder={"20 "}
            content={"Orders Served"}
            phone={"0921243"}
            icon={<LocationOnIcon fontSize="inherit" />}
            location={"234 Ung Van Khiem Binh Thanh"}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
