import React, { useState } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import AddIcon from "@mui/icons-material/Add";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const headCells = [
  { id: "id", label: "ID" },
  { id: "image", label: "Image" },
  { id: "name", label: "Service name" },
  { id: "category", label: "Category" },

  { id: "type", label: "Car type" },

  { id: "price", label: "Price" },
  { id: "unit", label: "Unit" },
  { id: "status", label: "Status" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Services = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const rows = [
    {
      id: 1,
      image:
        "https://daiphatvienthong.vn/upload/images/phuc-hoi-lam-moi-den-o-to-xe-hoi-gia-re-tphcm.jpg",
      name: "Đánh Bóng Đèn Pha Xe Ô Tô",
      category: "CHĂM SÓC XE, LÀM ĐẸP XE",
      type: "4 chỗ",
      price: "500,000",
      unit: "Lần",

      status: true,
    },
    {
      id: 2,
      image:
        "https://thanhphongauto.com/wp-content/uploads/2019/11/rua-xe-voi-dung-cu-chuyen-nghiep.jpg",
      name: "Vệ Sinh – Bảo Dưỡng Ngoại Thất Ô Tô",
      category: "CHĂM SÓC XE, LÀM ĐẸP XE",
      type: "4-5 chỗ",
      price: "200,000",
      unit: "Lần",

      status: true,
    },
    {
      id: 3,
      image:
        "https://thanhphongauto.com/wp-content/uploads/2019/11/rua-xe-voi-dung-cu-chuyen-nghiep.jpg",
      name: "Vệ Sinh – Bảo Dưỡng Ngoại Thất Ô Tô",
      category: "CHĂM SÓC XE, LÀM ĐẸP XE",
      type: "5-7 chỗ",
      price: "699,000",
      unit: "Gói",

      status: true,
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <>
      <div className="md:pt-24 md:px-8">
        <Header
          icon="https://i.imgur.com/1EPVEZN.png"
          size={25}
          alt="services"
          title="Service List"
          number="20"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row  align-items-center">
                  <div className="col-lg-4">
                    <Search
                      label="Search by Name "
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
                  <div className="col-lg-8 mt-3 mt-lg-0 d-flex flex-wrap gap-3 justify-content-lg-end">
                    <div>
                      <Button
                        variant="outlined"
                        className="export-button"
                        size="large"
                        onClick={() => {}}
                        startIcon={<FileDownloadIcon fontSize="small" />}
                        text="Export"
                      />
                    </div>
                    <div>
                      <Button
                        className="add-button"
                        size="large"
                        onClick={() => {}}
                        startIcon={<AddIcon fontSize="small" />}
                        text="Add new Service"
                      />
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
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.id}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "center" }}>
                          <img
                            className="rounded"
                            src={item.image}
                            width={70}
                            alt={"hello"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Link
                            to={`/admin/service/view/1/`}
                            className="title-color hover-c1"
                          >
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.category}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.type}</div>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <div>{item.price}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.unit}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Switches checked={item.status} />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="view" arrow>
                              <Link
                                to={`/admin/service/view/1/`}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <VisibilityIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                            <Tooltip title="edit" arrow>
                              <Link
                                to={`/admin/mechanic/edit/${item.id}`}
                                className="btn btn-outline--primary btn-sm square-btn"
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
                <TblPagination />
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

export default Services;
