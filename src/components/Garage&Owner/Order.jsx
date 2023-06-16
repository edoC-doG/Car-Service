import React from "react";
import PendingIcon from "@mui/icons-material/Pending";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
const headCells = [
  { id: "id", label: "ID" },
  { id: "order", label: "Order" },
  { id: "date", label: "Date" },
  { id: "customer", label: "Customer" },

  { id: "payStatus", label: "Payment Status" },
  { id: "total", label: "Total" },

  { id: "orderStatus", label: "Order Status" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Order = () => {
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
    useTable(rows, headCells);
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
                      <div className="order-stats__title"> 23</div>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <CheckCircleSharpIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Confirmed</h6>
                      </div>
                      <div className="order-stats__title"> 20</div>
                    </div>
                  </div>
                  {/* Pending */}
                  <div className="col-md-3  mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <PendingIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Pending</h6>
                      </div>
                      <div className="order-stats__title">2</div>
                    </div>
                  </div>
                  {/* Canceled */}
                  <div className="col-md-3  mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <HighlightOffIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Cancel</h6>
                      </div>
                      <div className="order-stats__title">1</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {rows.map((item) => (
                      <TableRow hover key={item.id}>
                        <TableCell sx={{ border: "none" }}>{item.id}</TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Link
                            to={`/admin/orders/details/${item.order}`}
                            className="title-color hover-c1"
                          >
                            {item.order}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {item.date}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Link
                            to={`/admin/customer/view/1`}
                            className="title-color hover-c1"
                          >
                            {item.customer}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <span
                            className={
                              item.payStatus === "Paid"
                                ? "badge badge-soft-info fz-12"
                                : "badge badge-soft-danger fz-12"
                            }
                          >
                            {item.payStatus}
                          </span>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {item.total}
                        </TableCell>

                        <TableCell
                          sx={{ border: "none", textDecoration: "capitalize" }}
                        >
                          <span
                            className={
                              item.orderStatus === "Confirmed"
                                ? "badge badge-soft-success fz-12"
                                : item.orderStatus === "Canceled"
                                ? "badge badge-soft-danger fz-12"
                                : "badge badge-soft-info fz-12"
                            }
                          >
                            {item.orderStatus}
                          </span>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center">
                            <Tooltip title="view" arrow>
                              <Link
                                to={`/admin/orders/details/${item.order}`}
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
