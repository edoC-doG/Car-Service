import "../../styles/button.scss";
import React from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
const Employees = () => {
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/employee.png"
        size={20}
        alt="employee"
        title="Employee List"
      />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header flex-wrap gap-10">
              <h5 className="mb-0 d-flex gap-2 align-items-center font-semibold">
                Employee table
                <span className="badge badge-soft-dark radius-50 fz-12">3</span>
              </h5>
              <div>
                <Search
                  label="Search by Name or Email or Phone"
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

              <div className="d-flex justify-content-end">
                <Button
                  className="add-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<AddIcon fontSize="small" />}
                  text="Add New"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
