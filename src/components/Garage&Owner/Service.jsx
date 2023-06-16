import React, { useState } from "react";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../table/Switches";

import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Service Name" },
  { id: "date", label: "Created" },

  { id: "price", label: "Price" },
  { id: "status", label: "Active Status" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Service = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const rows = [
    {
      id: 1,
      name: "Rua Xe",
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      price: 100.0,
      status: true,
    },
    {
      id: 2,
      name: "Son bong",
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      price: "10.000.000",
      status: true,
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <>
      <div className="tab-content">
        <div className="tab-pane fade show active">
          <div className="row pt-2">
            <div className="col-md-12">
              <div className="card h-100">
                {/* Title */}
                <div className="px-3 py-4">
                  <h5 className="mb-0 d-flex align-items-center gap-2 font-semibold">
                    Services
                    <span className="badge badge-soft-dark radius-50 fz-12">
                      11
                    </span>
                  </h5>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {rows.map((item) => (
                        <TableRow hover key={item.id}>
                          <TableCell sx={{ border: "none" }}>
                            {item.id}
                          </TableCell>

                          <TableCell sx={{ border: "none" }}>
                            {item.name}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            {item.date}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            {item.price}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Switches checked={item.status} />
                          </TableCell>
                          {/* Action */}
                          <TableCell sx={{ border: "none" }}>
                            <div className="d-flex justify-content-center gap-2">
                              <Tooltip title="view" arrow>
                                <Tooltip title="edit" arrow>
                                  <Link
                                    to={`/admin/service/edit/${item.id}`}
                                    className="btn btn-outline--primary btn-sm edit"
                                  >
                                    <EditIcon fontSize="small" />
                                  </Link>
                                </Tooltip>
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
                <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                />
                <div className="table-responsive mt-4">
                  <div className="px-4 d-flex justify-content-lg-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
