import "../../styles/button.scss";
import React, { useState } from "react";
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
import StarIcon from "@mui/icons-material/Star";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoneyIcon from "@mui/icons-material/Money";
const headCells = [
  { id: "id", label: "ID" },
  { id: "info", label: "Name" },

  { id: "contact", label: "Contact Info" },
  { id: "totalOrders", label: "Total Orders" },
  { id: "rating", label: "Rating" },
  { id: "status", label: "Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Mechanics = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const rows = [
    {
      id: 1,
      info: {
        name: "Will Smith",
        image:
          "https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg",
      },

      contact: {
        email: "tester123@gmail.com",
        phone: "02921323131",
      },
      rating: 5,
      status: true,

      totalOrders: 15,
    },
    {
      id: 2,
      info: {
        name: "Min Min",
        image:
          "https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg",
      },
      contact: {
        email: "tester123@gmail.com",
        phone: "02921323131",
      },
      rating: 4.5,
      status: true,

      totalOrders: 15,
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://cdn-icons-png.flaticon.com/512/1995/1995470.png"
          size={20}
          alt="mechanics"
          title="Mechanic List"
          number="20"
        />

        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row justify-content-between align-items-center gy-2">
                  <div className="col-sm-8 col-md-6 col-lg-4">
                    <Search
                      label="Search by Name"
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
                        className="add-button"
                        size="large"
                        onClick={() => {}}
                        startIcon={<AddIcon fontSize="small" />}
                        text="Add Mechanic"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table  */}
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
                          <div className="media align-items-center gap-2">
                            <img
                              className="rounded-circle avatar avatar-lg"
                              src={item.info.image}
                              alt=""
                            />
                            <div>
                              <Link
                                to={`/admin/mechanic/earning-statement-overview${item.id}`}
                                className="title-color"
                              >
                                {item.info.name}
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="mb-1">
                            <strong>
                              <Link
                                to={`mailto:${item.contact.email}`}
                                className="title-color hover-c1 lowercase"
                              >
                                {item.contact.email}
                              </Link>
                            </strong>
                          </div>
                          <Link
                            to={`tel:${item.contact.phone}`}
                            className="title-color hover-c1 lowercase "
                          >
                            {item.contact.phone}
                          </Link>
                        </TableCell>
                        {/* Total Ordered */}
                        <TableCell
                          sx={{
                            border: "none",
                          }}
                        >
                          <Link
                            to={`/admin/orders/list/all?mechanic_id=${item.id}`}
                            className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                          >
                            {item.totalOrders}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <label className="badge badge-soft-info mb-0">
                            <span className="fz-12 d-flex align-items-center gap-1">
                              {item.rating} <StarIcon fontSize="inherit" />
                            </span>
                          </label>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Switches checked={item.status} />
                        </TableCell>

                        {/* Action */}
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="edit" arrow>
                              <Link
                                to={`/admin/mechanic/edit/${item.id}`}
                                className="btn btn-outline--primary btn-sm edit"
                              >
                                <EditIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                            <Tooltip title="Earning statement" arrow>
                              <Link
                                to={`/admin/mechanic/earning-statement-overview/${item.id}`}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <MoneyIcon fontSize="small" />
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

export default Mechanics;
