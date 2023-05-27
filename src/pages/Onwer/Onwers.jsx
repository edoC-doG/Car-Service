import React from "react";
import "../../styles/button.scss";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
const Onwers = () => {
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
        alt="onwers"
        title="Owner & Garage List"
        number="10"
      />
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-sm-8 col-md-6 col-lg-4">
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
                <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                  <div className="d-flex justify-content-sm-end">
                    <Button
                      className="add-button"
                      size="large"
                      onClick={() => {}}
                      startIcon={<AddIcon fontSize="small" />}
                      text="Add new owner"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onwers;
