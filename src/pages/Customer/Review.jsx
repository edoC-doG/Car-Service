import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "../../components/filter/Select";
import Date from "../../components/filter/DateTime";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import { MdFilterList } from "react-icons/md";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  getReviews,
  updateReviewStatus,
  resetState,
  getReviewsByGarage,
} from "../../features/review/reviewSlice";
import authService from "../../features/auth/authService";

const headCells = [
  { id: "reviewId", label: "ID" },
  { id: "garageReviewDto", label: "Garage" },
  { id: "fullName", label: "Tên KH" },
  { id: "rating", label: "Đánh giá" },
  { id: "content", label: "Nội dung" },
  { id: "createdAt", label: "Ngày viết" },

  { id: "reviewStatus", label: "Trạng thái" },
];

const headCellsManager = [
  { id: "reviewId", label: "ID" },
  { id: "fullName", label: "Tên KH" },
  { id: "rating", label: "Đánh giá" },
  { id: "content", label: "Nội dung" },
  { id: "createdAt", label: "Ngày viết" },

  { id: "reviewStatus", label: "Trạng thái" },
];

const Review = () => {
  const user = authService.getCurrentUser();
  const role = user?.roleName;

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
  const [age, setAge] = React.useState("");

  const updateSuccessAction = useSelector(
    (state) => state.review.isSuccessAction
  );

  useEffect(() => {
    document.title = "Danh sách đánh giá của khách hàng";
  }, []);

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };

    if (role === "Admin") dispatch(getReviews(data));
    else if (role === "Manager")
      dispatch(getReviewsByGarage({ ...data, garageId: user?.garageId }));

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
  }, [page, rowsPerPage, updateSuccessAction]);

  const recordsReview = useSelector((state) => state.review.reviews);

  const count = useSelector((state) => state.review.number);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSwitchToggle = (reviewId, reviewStatus) => {
    // Dispatch the updateCustomerStatus action
    // console.log(userId, userStatus);
    dispatch(updateReviewStatus({ reviewId, reviewStatus }));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsReview,
      role === "Admin" ? headCells : headCellsManager,
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
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/customer_review.png"
          size={20}
          alt="review"
          title="Đánh giá của Khách hàng"
        />
        <div className="card card-body">
          <div className="row border-bottom pb-3 align-items-center mb-4">
            <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
              <h5 className="text-capitalize d-flex gap-1 font-semibold">
                Danh sách đánh giá
                <span className="badge badge-soft-dark radius-50 fz-12">
                  {count}
                </span>
              </h5>
            </div>
            <div className="col-sm-8 col-md-6 col-lg-4">
              <Search
                label="Tìm kiếm"
                onChange={() => {}}
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
          {/* <form>
            <div className="row gy-3 align-items-end">
              <div className="col-md-4">
                <div>
                  <label htmlFor="product" className="title-color d-flex">
                    Lọc dịch vụ
                  </label>
                  <Select
                    title={"--Select service--"}
                    value={age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Customer */}
              {/* <div className="col-md-4">
                <div>
                  <label htmlFor="customer" className="title-color d-flex">
                    Lọc Khách Hàng
                  </label>
                  <Select
                    title={"--Select customer--"}
                    value={age}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              {/* Status */}

              {/* <div className="col-md-4">
                <div>
                  <label htmlFor="status" className="title-color d-flex">
                    Lọc trạng thái
                  </label>
                  <Select
                    title={"--Select status--"}
                    value={age}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              {/* From */}
              {/* <div className="col-md-4">
                <div>
                  <label htmlFor="from" className="title-color d-flex">
                    Bắt đầu
                  </label>
                  <Date />
                </div>
              </div>
              {/* To */}
              {/* <div className="col-md-4">
                <div>
                  <label htmlFor="to" className="title-color d-flex">
                    Tới
                  </label>
                  <Date />
                </div>
              </div> */} 
              {/* Filter */}
              {/* <div className="col-md-2">
                <Button
                  fullWidth
                  className="add-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<MdFilterList fontSize="small" />}
                  text="Lọc dữ liệu"
                />
              </div>
              <div className="col-md-2">
                <Button
                  fullWidth
                  variant="outlined"
                  className="export-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<FileDownloadIcon fontSize="small" />}
                  text="Xuất dữ liệu"
                />
              </div>
            </div>
          </form> */} 
        </div>

        <div className="card mt-4">
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.reviewId}>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.reviewId}</div>
                    </TableCell>
                    {role === "Admin" ? (
                      <TableCell sx={{ border: "none" }}>
                        <Link
                          to={`/admin/garage/view/${item.garageReviewDto?.garageId}`}
                          className="title-color hover-c1"
                        >
                          {item.garageReviewDto?.garageName}
                        </Link>
                      </TableCell>
                    ) : (
                      <></>
                    )}
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.userReviewDto?.fullName}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <label className="badge badge-soft-info mb-0">
                        <span className="fz-12 d-flex align-items-center gap-1">
                          {item.rating} <StarIcon fontSize="inherit" />
                        </span>
                      </label>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.content}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.createdAt}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Switches
                        checked={
                          item.reviewStatus === "Activate" ? true : false
                        }
                        onChange={(event) => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Bạn có chắc chắn muốn thay đôi trạng thái?",
                            subTitle: "Bạn không thể hoàn tác thao tác này",
                            onConfirm: () => {
                              handleSwitchToggle(
                                item.reviewId,
                                event.target.checked ? 1 : 0
                              );
                            },
                          });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
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

export default Review;
