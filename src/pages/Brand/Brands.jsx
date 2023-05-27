import React from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "../../styles/button.scss";
import Search from "../../components/filter/Search";
const Brands = () => {
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/brand.png"
        size={20}
        alt="brands"
        title="Brand List"
        number="15"
      />
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <div className="row gy-2 align-items-center">
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
                      variant="outlined"
                      className="export-button"
                      size="large"
                      onClick={() => {}}
                      startIcon={<FileDownloadIcon fontSize="small" />}
                      text="Export"
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

export default Brands;
