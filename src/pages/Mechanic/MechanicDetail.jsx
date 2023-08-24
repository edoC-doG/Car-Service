import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TableBody, TableCell, TableRow } from "@mui/material";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import AccountInfo from "../../components/card-info/AccountInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  getMechanicDetail,
  getBookingByMechanic,
} from "../../features/mechanic/mechanicSlice";
import useTableV2 from "../../components/table/useTableV2";
const headCells = [
  { id: "bookingTime", label: "Order Date" },
  { id: "userBookingDto", label: "Customer Info" },

  { id: "garageName", label: "Garage" },
  { id: "total", label: "Total Amount", align: "right" },
  { id: "bookingStatus", label: "Order Status", align: "center" },
];
const MechanicDetail = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[4];
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [age, setAge] = React.useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(getMechanicDetail(id));

    const data = { pageIndex: page + 1, pageSize: rowsPerPage, userId: id };
    dispatch(getBookingByMechanic(data));
  }, [id, page, rowsPerPage]);

  const detail = useSelector((state) => state.mechanic.mechanic);
  const recordsBooking = useSelector((state) => state.mechanic.mechanics);
  const count = useSelector((state) => state.mechanic.number);

  const infoMechanic = [
    {
      name: "Name",
      content: `${detail.userDetailMechanicDto?.fullName}`,
    },
    {
      name: "Address",
      content: `${detail.userDetailMechanicDto?.userPhone}`,
    },
  ];
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
        icon="https://6valley.6amtech.com/public/assets/back-end/img/support-ticket.png"
        alt="chat"
        title="Mechanic detail"
      />
      {/* Button back  */}
      <div className="flex-between d-sm-flex row align-items-center justify-content-between mb-2 mx-1">
        <div>
          <Link
            className="btn btn--primary mt-3 mb-3 text-base"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back to mechanic list
          </Link>
        </div>
      </div>

      <div className="my-2">
        <div className="row">
          {/* Table */}
          <div className="col-lg-9 mb-3 mb-lg-0">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row justify-content-between align-items-center g-2 mb-3">
                  <div className="col-sm-6">
                    <h4 className="d-flex align-items-center text-capitalize text-lg font-semibold">
                      Detail
                    </h4>
                  </div>
                </div>

                <div className="row g-2">
                  {/* Total order receive */}
                  <div className="col-sm-12 col-lg-12">
                    <div className="business-analytics">
                      <h5 className="business-analytics__subtitle font-semibold">
                        Total Order Confirmed
                      </h5>
                      <h2 className="business-analytics__title font-semibold">
                        {detail.totalBookingApplied}
                      </h2>
                      <img
                        className="business-analytics__img"
                        src="	https://6valley.6amtech.com/public/assets/back-end/img/pw.png"
                        width={"40"}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <div className="px-3 py-4">
                  <div className="row align-items-center">
                    <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                      <h5 className="text-capitalize d-flex gap-1 font-semibold">
                        Order received
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          {count}
                        </span>
                      </h5>
                    </div>
                    <div className="col-sm-8 col-md-6 col-lg-4">
                      <Search
                        label="Search orders"
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

                {/* Table detail */}
                <div className="row g-2">
                  <div className="col-sm-12 mb-3">
                    <div className="card">
                      <div className="table-responsive">
                        <TblContainer>
                          <TblHead />
                          <TableBody>
                            {recordsAfterPagingAndSorting().map((item) => (
                              <TableRow hover key={item.bookingId}>
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

                                <TableCell
                                  sx={{ border: "none", textAlign: "right" }}
                                >
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
                              </TableRow>
                            ))}
                          </TableBody>
                        </TblContainer>
                        <TblPagination className="pagination" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="col-lg-3 d-flex flex-column">
            <AccountInfo
              name={"mechanic"}
              title={"Mechanic Info"}
              items={infoMechanic}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicDetail;
