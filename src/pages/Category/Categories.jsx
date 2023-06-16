import React, { useState } from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "status", label: "Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Categories = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const rows = [
    {
      id: 1,
      name: "Điện- điều hòa",
      status: true,
    },

    {
      id: 2,
      name: "Đồ Trang trí",
      status: true,
    },
    {
      id: 3,
      name: "Phụ Tùng động cơ ",
      status: true,
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
          alt="category"
          title="Category Setup"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                    <h5 className="text-capitalize d-flex gap-1 font-semibold">
                      Category List
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
                          <Switches checked={item.status} />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="edit" arrow>
                              <Link
                                to={`/admin/mechanic/edit/${item.id}`}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <EditIcon fontSize="small" />
                              </Link>
                            </Tooltip>

                            <Tooltip title="delelte" arrow>
                              <Link
                                className="btn btn-outline-danger btn-sm delete square-btn"
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      "Are you sure to delete this record?",
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {},
                                  });
                                }}
                              >
                                <DeleteIcon fontSize="small" />
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Categories;
