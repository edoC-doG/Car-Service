import React, { useEffect, useState } from "react";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import StarIcon from "@mui/icons-material/Star";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import {
  getReviewsByGarage,
  resetState,
} from "../../features/review/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import useTableV2 from "../table/useTableV2";
import { Link, useLocation } from "react-router-dom";
const headCells = [
  { id: "reviewId", label: "ID" },

  { id: "fullName", label: "Tên KH" },
  { id: "rating", label: "Đánh giá" },
  { id: "content", label: "Nội dung" },
  { id: "createdAt", label: "Ngày gửi" },

  { id: "reviewStatus", label: "Trạng thái" },
];
const ReviewGarage = () => {
  useEffect(() => {
    document.title = "Đánh giá của khách hàng";
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();

  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const id = location.pathname.split("/")[4];

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

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage, garageId: id };
    dispatch(getReviewsByGarage(data));
  }, [page, rowsPerPage, id]);

  const recordsReview = useSelector((state) => state.review.reviews);

  const count = useSelector((state) => state.review.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsReview,
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
    <div className="container-fluid p-0">
      <div className="row gx-2 gx-lg-3">
        <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
          <div className="card">
            {/* Title and search */}
            <div className="px-3 py-4">
              <div className="row align-items-center">
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
                    <TableRow hover key={item.reviewId}>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.reviewId}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.userReviewDto.fullName}</div>
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
                        <span
                          className={
                            item.ureviewStatus === "Activate"
                              ? "badge badge-soft-danger fz-12"
                              : "badge badge-soft-success fz-12"
                          }
                        >
                          {item.reviewStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </div>
            <div className="table-responsive mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGarage;
