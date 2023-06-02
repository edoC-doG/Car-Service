import Header from "../../components/Header";
import React from "react";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "../../components/filter/Select";
import Date from "../../components/filter/Date";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import { MdFilterList } from "react-icons/md";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Switches from "../../components/table/Switches";
const headCells = [
  { id: "id", label: "ID" },
  { id: "service", label: "Service" },

  { id: "customer", label: "Customer Name" },
  { id: "rating", label: "Rating" },
  { id: "Review", label: "Review" },
  { id: "date", label: "Date" },

  { id: "status", label: "Status" },
];
const Review = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const rows = [
    {
      id: 1,
      service: "Rua Xe",
      customer: "Min",
      rating: 5,
      review: "Quality was good",
      date: "12 Jun 2023",
      status: true,
    },
    {
      id: 2,
      service: "Son mau xe",
      customer: "Mindsd",
      rating: 4,
      review: "Lorem Ipsum is simply dummy text of...",
      date: "9 Jun 2023",
      status: true,
    },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
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
                  Choose Product
                </label>
                <Select
                  size="small"
                  title={"--Select product--"}
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
              {rows.map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell sx={{ border: "none" }}>
                    <div>{item.id}</div>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div>{item.service}</div>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div>{item.customer}</div>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <label className="badge badge-soft-info mb-0">
                      <span className="fz-12 d-flex align-items-center gap-1">
                        {item.rating} <StarIcon fontSize="inherit" />
                      </span>
                    </label>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div>{item.review}</div>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div>{item.date}</div>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Switches checked={item.status} />
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
