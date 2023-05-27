import React from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import AddIcon from "@mui/icons-material/Add";
const Services = () => {
  return (
    <div className="md:pt-24 md:px-8">
      <Header
        icon="https://i.imgur.com/1EPVEZN.png"
        size={25}
        alt="services"
        title="Service List"
        number="20"
      />
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <div className="row  align-items-center">
                <div className="col-lg-4">
                  <Search
                    label="Search by Name "
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
                <div className="col-lg-8 mt-3 mt-lg-0 d-flex flex-wrap gap-3 justify-content-lg-end">
                  <div>
                    <Button
                      variant="outlined"
                      className="export-button"
                      size="large"
                      onClick={() => {}}
                      startIcon={<FileDownloadIcon fontSize="small" />}
                      text="Export"
                    />
                  </div>
                  <div>
                    <Button
                      className="add-button"
                      size="large"
                      onClick={() => {}}
                      startIcon={<AddIcon fontSize="small" />}
                      text="Add new Service"
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

export default Services;
