import "../../styles/button.scss";
import React from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import EditIcon from "@mui/icons-material/Edit";

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },

  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Employees = () => {
  const rows = [
    {
      id: 1,
      name: "admin",
      email: "admin@gmail.com",
      phone: "02921323131",
      role: "Admin",
      status: true,
    },
    {
      id: 2,
      name: "Hello world",
      email: "test@gmail.com",
      phone: "02921323131",
      role: "customer service",
      status: true,
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/employee.png"
        size={20}
        alt="employee"
        title="Employee List"
      />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header flex-wrap gap-10">
              <h5 className="mb-0 d-flex gap-2 align-items-center font-semibold">
                Employee table
                <span className="badge badge-soft-dark radius-50 fz-12">3</span>
              </h5>
              <div>
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

              <div className="d-flex justify-content-end">
                <Button
                  className="add-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<AddIcon fontSize="small" />}
                  text="Add New"
                />
              </div>
            </div>
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
                        <div>{item.name}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.email}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.phone}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.role}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <Switches checked={item.status} />
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div className="d-flex justify-content-center ">
                          <Tooltip title="edit" arrow>
                            <Link
                              to={`/admin/employee/update/${item.id}`}
                              className="btn btn-outline--primary btn-sm edit"
                            >
                              <EditIcon fontSize="small" />
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
      </div>
    </div>
  );
};

export default Employees;
