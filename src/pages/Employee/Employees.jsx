import "../../styles/button.scss";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../features/employee/employeeSlice";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Name" },

  { id: "userEmail", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "roleName", label: "Role" },
  { id: "userStatus", label: "Status" },
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

  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getEmployees(data));
  }, [page, rowsPerPage]);

  const recordsEmployee = useSelector((state) => state.employee.employees);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsEmployee,
      headCells,
      filterFn,
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      20
    );
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
                  {recordsAfterPagingAndSorting().map((item) => (
                    <TableRow hover key={item.userId}>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.userId}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.fullName}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.userEmail}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.phone}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.roleDto.roleName}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <Switches
                          checked={
                            item.userStatus === "Activate" ? true : false
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div className="d-flex justify-content-center ">
                          <Tooltip title="edit" arrow>
                            <Link
                              to={`/admin/employee/update/${item.userId}`}
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
              <TblPagination className="pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
