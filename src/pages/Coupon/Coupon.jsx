import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  getCoupons,
  resetState,
  updateCouponStatus,
} from "../../features/coupon/couponSlice";
import Notification from "../../components/Notification";
import Button from "./../../components/filter/Button";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";

const headCells = [
  { id: "couponId", label: "ID" },
  { id: "couponCode", label: "Mã Khuyễn Mãi" },
  { id: "couponStartDate", label: "Ngày bắt đầu" },
  { id: "couponEndDate", label: "Ngày kết thúc" },
  { id: "numberOfTimesToUse", label: "Số lượng" },
  { id: "garageNamee", label: "Garage" },
  { id: "couponStatus", label: "Trạng thái" },

  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Coupon = () => {
  useEffect(() => {
    document.title = "Danh sách phiếu giảm giá";
  }, []);
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  //Edit
  const [showEdit, setShowEdit] = useState(false);
  const [coupEdit, setCoupEdit] = useState({});
  const handleEdit = (coup) => {
    setCoupEdit(coup);
    setShowEdit(true);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const updateSuccessAction = useSelector(
    (state) => state.coupon.isSuccessAction
  );
const couponState = useSelector(  (state) => state.coupon);
  const { isSuccessAdd, message } = couponState;
  const getData = () => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getCoupons(data));
  };
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
      if (message.status === 400  ) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      } else if (message.status === 404){
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      }
    }
    if (updateSuccessAction) {
      dispatch(resetState())
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
  }, [updateSuccessAction, isSuccessAdd, message]);

  const handleSwitchToggle = (couponId, couponStatus) => {
    // Dispatch the updateCustomerStatus action
    // console.log(userId, userStatus);
    dispatch(updateCouponStatus({ couponId, couponStatus }));
  };
  const recordsCoupon = useSelector((state) => state.coupon.coupons);

  const count = useSelector((state) => state.coupon.number);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsCoupon,
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
      <div className="md:pt-24 md:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/coupon_setup.png"
          alt="coupon"
          title="Danh sách khuyến mãi"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row justify-content-between align-items-center gy-2">
                  <div className="col-sm-8 col-md-6 col-lg-4">
                    <Search
                      label="Tìm kiếm"
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
                        onClick={() => setShowModal(true)}
                        startIcon={<AddIcon fontSize="small" />}
                        text="Thêm mới khuyến mãi"
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
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.couponId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.couponId}</div>
                        </TableCell>
                        {/* Code*/}
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.couponCode}</div>
                        </TableCell>
                        {/* start date */}
                        <TableCell sx={{ border: "none" }}>
                          <div className="mb-1">
                            <strong>{item.couponStartDate}</strong>
                          </div>
                        </TableCell>
                        {/* End date*/}
                        <TableCell sx={{ border: "none" }}>
                          <div className="mb-1">
                            <strong>{item.couponEndDate}</strong>
                          </div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="mb-1">
                            <div>{item.numberOfTimesToUse}</div>
                          </div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="mb-1">
                            <div>{item.garageName}</div>
                          </div>
                        </TableCell>
                        {/* Block and unblock */}
                        <TableCell sx={{ border: "none" }}>
                          <Switches
                            checked={
                              item.couponStatus === "Active" ? true : false
                            }
                            onChange={(event) => {
                              setConfirmDialog({
                                isOpen: true,
                                title:
                                  "Bạn có chắc chắn muốn thay đổi trạng thái?",
                                subTitle: "Bạn không thể hoàn tác thao tác này",
                                onConfirm: () => {
                                  handleSwitchToggle(
                                    item.couponId,
                                    event.target.checked ? 1 : 0
                                  );
                                },
                              });
                            }}
                          />
                        </TableCell>
                        {/* Action */}
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            {/* <Tooltip title="edit" arrow>
                              <Link
                                onClick={()=> handleEdit(item)}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <EditIcon fontSize="small" />
                              </Link>
                            </Tooltip> */}

                            <Tooltip title="delelte" arrow>
                              <Link
                                className="btn btn-outline-danger btn-sm delete square-btn"
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      "Bạn có chắc chắn muốn thay đổi trạng thái ?",
                                    subTitle:
                                      "Bạn không thể hoàn tác thao tác này",
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
      <ModalAdd show={showModal} handleClose={handleClose} />
      <ModalEdit
        show={showEdit}
        handleClose={handleClose}
        coupEdit={coupEdit}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Coupon;
