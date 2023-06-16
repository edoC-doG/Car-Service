import Header from "../../components/Header";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import CustomerInfo from "../../components/card-info/CustomerInfo";
import CarInfo from "../../components/card-info/CarInfo";
const headCells = [
  { id: "id", label: "ID" },
  { id: "orderID", label: "Order ID", minWidth: 200 },
  { id: "total", label: "Total" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const CustomerDetail = () => {
  const rows = [
    {
      id: 1,
      orderID: 1020392,
      total: "123,000",
    },
    {
      id: 2,
      orderID: 1034342,
      total: "1,000,000",
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <div className="pb-2">
        <div className="row align-items-center">
          <div className="col-sm mb-2 mb-sm-0">
            <Header
              icon="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
              size={20}
              alt="customer"
              title="Customer Details"
            />
            <div className="d-sm-flex align-align-items-sm-center">
              <h3 className="page-header-title text-lg font-semibold">
                Customer ID #9
              </h3>
              <span className="ml-2 ml-sm-3 ">
                <EventNoteIcon fontSize="inherit" />
                Join At: {new Date().toLocaleString() + ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Table & Search input */}
        <div className="col-lg-8 mb-3 mb-lg-0">
          <div className="card">
            {/* Search */}
            <div className="p-3">
              <div className="row justify-content-end">
                <div className="col-auto">
                  <Search
                    label="Search here"
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
            {/* Table */}
            <div className="table-responsive">
              <TblContainer>
                <TblHead />
                <TableBody>
                  {rows.map((item) => (
                    <TableRow hover key={item.id}>
                      <TableCell sx={{ border: "none", fontSize: "14px" }}>
                        <div>{item.id}</div>
                      </TableCell>
                      {/* Order ID */}
                      <TableCell sx={{ border: "none", fontSize: "14px" }}>
                        <Link
                          to={`/admin/orders/details/${item.orderID}`}
                          className="title-color hover-c1 d-flex align-items-center gap-3 "
                        >
                          {item.orderID}
                        </Link>
                      </TableCell>
                      {/* Total */}
                      <TableCell sx={{ border: "none", fontSize: "14px" }}>
                        {item.total}
                      </TableCell>

                      {/* Action */}
                      <TableCell sx={{ border: "none" }}>
                        <div className="d-flex justify-content-center gap-2">
                          <Tooltip title="view" arrow>
                            <Link
                              to={`/admin/orders/details/${item.orderID}`}
                              className="btn btn-outline--primary btn-sm edit square-btn"
                            >
                              <VisibilityIcon fontSize="small" />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Invoice" arrow>
                            <Link className="btn btn-outline-info btn-sm square-btn">
                              <DownloadForOfflineSharpIcon fontSize="small" />
                            </Link>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
        {/* Info of Customer */}
        <div className="col-lg-4  d-flex flex-column gap-3">
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
            phone={"092124334322344"}
            email={"thanhminh1452000@gmail.com"}
          />
          <CarInfo
            title={"Car Info"}
            brand={"Mercedes Benz"}
            model={"GLC X254"}
            plate="60A-99999"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;