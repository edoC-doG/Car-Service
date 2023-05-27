import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import Header from "../../components/Header";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useTable from "../../components/table/useTable";
import { Icon, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const headCells = [
  { id: "accountID", label: "ID" },
  { id: "name", label: "Customer Name", disableSorting: true },
  { id: "accountEmail", label: "Contact Info" },
  { id: "totalOrder", label: "Total Order" },

  { id: "status", label: "Block/Unblcok" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Customers = () => {
  const rows = [
    {
      accountID: 1,
      name: "Nguyen Thi Thu Hien",
      image:
        "https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg",
      accountEmail: "thanhminh1452000@gmail.com",
      contact: "0812394832",
      totalOrder: 200,
      status: true,
    },
    {
      accountID: 2,
      name: "Thanh Min",
      image:
        "https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg",
      accountEmail: "thanhminh1452000@gmail.com",
      contact: "0812394832",
      totalOrder: 200,
      status: false,
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
        size={20}
        alt="customer"
        title="Customer List"
        number="8"
      />
      <div className="card">
        <div className="px-3 py-4">
          <div className="row gy-2 align-items-center">
            <div className="col-sm-8 col-md-6 col-lg-4">
              <Search
                label="Search by Name or Email or Phone"
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
            <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
              <div className="d-flex justify-content-sm-end">
                <Button
                  variant="outlined"
                  className="export-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<FileDownloadIcon fontSize="small" />}
                  text="Export"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <TblContainer>
            <TblHead />
            <TableBody>
              {rows.map((item) => (
                <TableRow hover key={item.accountID}>
                  <TableCell sx={{ border: "none" }}>
                    <div>{item.accountID}</div>
                  </TableCell>
                  {/* NAME AND IMAGE */}
                  <TableCell sx={{ border: "none" }}>
                    <Link
                      to={`/admin/customer/view/${"1"}`}
                      className="title-color hover-c1 d-flex align-items-center gap-3 "
                    >
                      <img
                        src={item.image}
                        alt="avatar"
                        width="40"
                        className="rounded-circle"
                      />
                      {item.name}
                    </Link>
                  </TableCell>
                  {/* EMAIL AND PHONE */}
                  <TableCell sx={{ border: "none" }}>
                    <div className="mb-1">
                      <strong>
                        <Link
                          to={`mailto:${item.accountEmail}`}
                          className="title-color hover-c1 lowercase"
                        >
                          {item.accountEmail}
                        </Link>
                      </strong>
                    </div>
                    <Link
                      to={`tel:${item.contact}`}
                      className="title-color hover-c1 lowercase"
                    >
                      {item.contact}
                    </Link>
                  </TableCell>
                  {/* Quantity Ordered */}
                  <TableCell sx={{ border: "none" }}>
                    <label className="btn text-info bg-soft-info font-weight-bold px-3 py-1 mb-0 fz-12">
                      {item.totalOrder}
                    </label>
                  </TableCell>
                  {/* Block and unblock */}
                  <TableCell sx={{ border: "none" }}>
                    <Switches checked={item.status} />
                  </TableCell>
                  {/* Action */}
                  <TableCell sx={{ border: "none" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <Tooltip title="view" arrow>
                        <Link
                          to={`/admin/customer/view/${item.accountID}`}
                          className="btn btn-outline-info btn-sm square-btn"
                        >
                          <VisibilityIcon fontSize="small" />
                        </Link>
                      </Tooltip>
                      <Tooltip title="delelte" arrow>
                        <Link className="btn btn-outline-danger btn-sm delete square-btn">
                          <DeleteIcon fontSize="small" />
                        </Link>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        </div>
      </div>
    </div>
  );
};

export default Customers;
