import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import Button from "../../components/filter/Button";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useTableV2 from "../table/useTableV2";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByGarage } from "../../features/service/serviceSlide";
import AddIcon from "@mui/icons-material/Add";
import ModalAdd from "./ModalAdd";
import Notification from "../Notification";
const headCells = [
  { id: "serviceId", label: "ID Dịch vụ" },
  { id: "serviceImage", label: "Hình ảnh" },
  { id: "serviceName", label: "Tên dịch vụ" },
  { id: "serviceGroup", label: "Loại dịch vụ" },

  { id: "serviceUnit", label: "Số lần", align: "center", },
  { id: "serviceWarrantyPeriod", label: "Số tháng BH", align: "center", },

  { id: "createdAt", label: "Ngày thêm vào" },
  { id: "serviceStatus", label: "Trạng thái" },
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];
const Service = () => {
  useEffect(() => {
    document.title = "Danh sách dịch vụ";
  }, []);

  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[4];
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
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const getData = () => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage, garageId: id };
    dispatch(getServicesByGarage(data));
  };
  const updateSuccessAction = useSelector(
    (state) => state.garage.isSuccessAction
  );
  const serState = useSelector((state) => state.garage);
  const { isSuccessAdd, message } = serState;
  useEffect(() => {
    getData();
    if (isSuccessAdd) {
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
      handleClose();
    } else {
      if (message.status === 400) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      } else if (message.status === 404) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      }
    }
    if (updateSuccessAction) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
    }
  }, [updateSuccessAction, isSuccessAdd, message, id, page, rowsPerPage]);
  const records = useSelector((state) => state.service.services);
  const count = useSelector((state) => state.service.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      records,
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
    <>
      <div className="tab-content">
        <div className="tab-pane fade show active">
          <div className="row pt-2">
            <div className="col-md-12">
              <div className="card h-100">
                {/* Title */}
                <div className="px-3 py-4 row  align-items-center">
                  <h5 className="col-lg-4 mb-0 d-flex align-items-center gap-2 font-semibold">
                    Danh sách dịch vụ
                    <span className="badge badge-soft-dark radius-50 fz-12">
                      {count}
                    </span>
                  </h5>
                  <div className="col-lg-8 mt-3 mt-lg-0 d-flex flex-wrap gap-3 justify-content-lg-end">
                    <div>
                      <Button
                        className="add-button"
                        size="large"
                        onClick={() => setShowModal(true)}
                        startIcon={<AddIcon fontSize="small" />}
                        text="Thêm mới dịch vụ"
                      />
                    </div>
                  </div>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((item) => (
                        <TableRow hover key={item.serviceId}>
                          <TableCell sx={{ border: "none" }}>
                            {item.serviceId}
                          </TableCell>

                          <TableCell
                            sx={{ border: "none", textAlign: "center" }}
                          >
                            <img
                              className="rounded"
                              src={item.serviceImage}
                              width={70}
                              alt={"hello"}
                            />
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            {item.serviceName}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <div>{item.serviceGroup}</div>
                          </TableCell>
                          <TableCell sx={{ border: "none", textAlign: "center", paddingRight: "35px" }}>
                            <div>{item.serviceUnit}</div>
                          </TableCell>
                          <TableCell sx={{ border: "none", textAlign: "center", paddingRight: "40px" }}>
                            <div>{item.serviceWarrantyPeriod}</div>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            {item.createdAt}
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <span
                              className={
                                item.serviceStatus === "Activate"
                                  ? "badge badge-soft-success fz-12"
                                  : "badge badge-soft-danger fz-12"
                              }
                            >
                              {" "}
                              {item.serviceStatus === "Activate"
                                ? "Hoạt động"
                                : "Không hoạt động"
                              }{" "}
                            </span>
                          </TableCell>
                          {/* Action */}
                          <TableCell sx={{ border: "none" }}>
                            <div className="d-flex justify-content-center gap-2">
                              <Tooltip title="Cập nhật" arrow>
                                <Link

                                  className="btn btn-outline--primary btn-sm edit"
                                >
                                  <EditIcon fontSize="small" />
                                </Link>
                              </Tooltip>
                              <Tooltip title="Xóa" arrow>
                                <Link
                                  className="btn btn-outline-danger btn-sm delete square-btn"
                                  onClick={() => {
                                    setConfirmDialog({
                                      isOpen: true,
                                      title:
                                        "Bạn có chắc chắn muốn thay đổi trạng thái ?",
                                      subTitle:
                                        "Bạn không thể hoàn tác thao tác này",
                                      onConfirm: () => { },
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
      <ModalAdd show={showModal} handleClose={handleClose} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Service;
