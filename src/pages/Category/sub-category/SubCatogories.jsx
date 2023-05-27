import React from "react";
import Header from "../../../components/Header";
import Search from "../../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
const SubCatogories = () => {
  return (
    <div className="md:pt-24 md:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
        alt="sub-category"
        title="Sub Category Setup"
      />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <div className="row align-items-center">
                <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                  <h5 className="text-capitalize d-flex gap-1 font-semibold">
                    Category List
                    <span className="badge badge-soft-dark radius-50 fz-12">
                      13
                    </span>
                  </h5>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <Search
                    label="Search by Sub category"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCatogories;
