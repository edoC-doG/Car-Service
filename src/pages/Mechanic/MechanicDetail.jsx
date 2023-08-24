import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import AccountInfo from "../../components/card-info/AccountInfo";
import HistoryIcon from "@mui/icons-material/History";
import Button from "../../components/filter/Button";
import { useDispatch, useSelector } from "react-redux";
import { getMechanicDetail } from "../../features/mechanic/mechanicSlice";
const headCells = [
  { id: "id", label: "ID" },
  { id: "order", label: "Order No" },

  { id: "total", label: "Earning" },
  { id: "status", label: "Status" },
  { id: "history", label: "History" },
];
const MechanicDetail = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[4];
  console.log(id);
  const rows = [
    {
      id: 1,
      order: 1020392,
      total: "500.000 VND",
      status: "Confirmed",
      history: "ok",
    },
    {
      id: 2,
      order: 1020393,
      total: "1.000.000 VND",
      status: "Confirmed",
      history: "ok",
    },
  ];

  useEffect(() => {
    dispatch(getMechanicDetail(id));
  }, [id]);

  const detail = useSelector((state) => state.mechanic.mechanic);
  console.log(detail);
  const infoMechanic = [
    {
      name: "Name",
      content: `${detail.userDetailMechanicDto.fullName}`,
    },
    {
      name: "Address",
      content: `${detail.userDetailMechanicDto?.userPhone}`,
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
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
                      Earning statement
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
                        Earning Statement
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          13
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
                            {rows.map((item) => (
                              <TableRow hover key={item.id}>
                                <TableCell
                                  sx={{ border: "none", fontSize: "14px" }}
                                >
                                  <div>{item.id}</div>
                                </TableCell>

                                <TableCell
                                  sx={{ border: "none", fontSize: "14px" }}
                                >
                                  <div>{item.order}</div>
                                </TableCell>
                                <TableCell
                                  sx={{ border: "none", fontSize: "14px" }}
                                >
                                  <div>{item.total}</div>
                                </TableCell>
                                <TableCell
                                  sx={{ border: "none", fontSize: "14px" }}
                                >
                                  <span className=" badge badge-soft-success fz-12">
                                    {item.status}
                                  </span>
                                </TableCell>
                                <TableCell
                                  sx={{ border: "none", fontSize: "14px" }}
                                >
                                  <div className="media align-items-center gap-2 flex-wrap">
                                    <Link className="btn btn-info">
                                      <HistoryIcon fontSize="small" />
                                    </Link>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </TblContainer>
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
