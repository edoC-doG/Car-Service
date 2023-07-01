import Header from "../../components/Header";
import React, {useState, useEffect} from "react";
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

import { useDispatch, useSelector } from "react-redux";
import {getReviews} from '../../features/review/reviewSlice'

const headCells = [
  { id: "reviewId", label: "ID" },
  { id: "garageReviewDto", label: "Garage" },

  { id: "fullName", label: "Customer Name" },
  { id: "rating", label: "Rating" },
  { id: "content", label: "Review" },
  { id: "createdAt", label: "Date" },

  { id: "reviewStatus", label: "Status" },
];
const Review = () => {
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0);  // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [age, setAge] = React.useState("");


  useEffect(() => {
    const data = { pageIndex: page + 1 , pageSize : rowsPerPage }
    dispatch(getReviews(data));
   

}, [ page,rowsPerPage, dispatch])


const recordsReview = useSelector((state) => state.review.reviews)

const count = useSelector((state) => state.review.number)
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const rows = [
    {
      id: 1,
      service: {
        id_service: 1,
        name: "Rua Xe",
      },

      customer: "Min",
      rating: 5,
      review: "Quality was good",
      date: "12 Jun 2023",
      status: true,
    },
    {
      id: 2,
      service: {
        id_service: 2,
        name: "Son mau xe",
      },
      customer: "Mindsd",
      rating: 4,
      review: "Lorem Ipsum is simply dummy text of...",
      date: "9 Jun 2023",
      status: true,
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(recordsReview, headCells, filterFn, pages, page, rowsPerPage, setPage, setRowsPerPage, count );
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/customer_review.png"
        size={20}
        alt="review"
        title="Customer Reviews"
      />
      <div className="card card-body">
        <div className="row border-bottom pb-3 align-items-center mb-4">
          <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
            <h5 className="text-capitalize d-flex gap-1 font-semibold">
              Review Table
              <span className="badge badge-soft-dark radius-50 fz-12">13</span>
            </h5>
          </div>
          <div className="col-sm-8 col-md-6 col-lg-4">
            <Search
              label="Search here"
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
        <form>
          <div className="row gy-3 align-items-end">
            <div className="col-md-4">
              <div>
                <label htmlFor="product" className="title-color d-flex">
                  Choose Service
                </label>
                <Select
                  size="small"
                  title={"--Select service--"}
                  value={age}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Customer */}
            <div className="col-md-4">
              <div>
                <label htmlFor="customer" className="title-color d-flex">
                  Choose Customer
                </label>
                <Select
                  size="small"
                  title={"--Select customer--"}
                  value={age}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Status */}

            <div className="col-md-4">
              <div>
                <label htmlFor="status" className="title-color d-flex">
                  Choose status
                </label>
                <Select
                  size="small"
                  title={"--Select status--"}
                  value={age}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* From */}
            <div className="col-md-4">
              <div>
                <label htmlFor="from" className="title-color d-flex">
                  From
                </label>
                <Date />
              </div>
            </div>
            {/* To */}
            <div className="col-md-4">
              <div>
                <label htmlFor="to" className="title-color d-flex">
                  To
                </label>
                <Date />
              </div>
            </div>
            {/* Filter */}
            <div className="col-md-2">
              <Button
                fullWidth
                className="add-button"
                size="large"
                onClick={() => {}}
                startIcon={<MdFilterList fontSize="small" />}
                text="Filter"
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
                text="Export"
              />
            </div>
          </div>
        </form>
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
                  <TableCell sx={{ border: "none" }}>
                    <Link
                      to={`/admin/service/view/${item.garageReviewDto.garageId}`}
                      className="title-color hover-c1"
                    >
                      {item.garageReviewDto.garageName}
                    </Link>
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
                    <div>{item.createdAt}</div>si
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Switches checked={item.reviewStatus === "Activate" ? true : false} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </div>
      </div>
    </div>
  );
};

export default Review;
