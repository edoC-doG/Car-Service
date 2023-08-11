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
import {
  getCoupons,
  resetState,
  updateCouponStatus,
} from "../../features/coupon/couponSlice";
import Notification from "../../components/Notification";

const headCells = [
  { id: "couponId", label: "ID" },
  { id: "couponCode", label: "Name" },
  { id: "couponStartDate", label: "Start date" },
  { id: "couponEndDate", label: "End date" },
  { id: "couponStatus", label: "Status" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Coupon = () => {
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size

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

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const updateSuccessAction = useSelector(
    (state) => state.coupon.isSuccessAction
  );

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getCoupons(data));

    if (updateSuccessAction) {
      dispatch(resetState());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Update Successfully",
        type: "success",
      });
    }
  }, [page, updateSuccessAction, rowsPerPage]);

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
          title="Coupon Setup"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                    <h5 className="text-capitalize d-flex gap-1 font-semibold">
                      Coupon List
                      <span className="badge badge-soft-dark radius-50 fz-12">
                        {count}
                      </span>
                    </h5>
                  </div>
                  <div className="col-sm-8 col-md-6 col-lg-4">
                    <Search
                      label="Search by Title or Code"
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
                                  "Are you sure to change status this record?",
                                subTitle: "You can't undo this operation",
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
                            <Tooltip title="edit" arrow>
                              <Link
                                to={`/admin/coupon/edit/${item.couponId}`}
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
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Coupon;
