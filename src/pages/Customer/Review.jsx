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

const Review = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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

      <div className="card mt-4">sdasd</div>
    </div>
  );
};

export default Review;
