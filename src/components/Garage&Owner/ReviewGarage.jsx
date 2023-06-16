import React from "react";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import StarIcon from "@mui/icons-material/Star";

import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
const headCells = [
  { id: "id", label: "ID" },
  { id: "service", label: "Service" },

  { id: "review", label: "Review", disableSorting: true },
  { id: "ratin", label: "Rating" },
];
const ReviewGarage = () => {
  const rows = [
    {
      id: 1,
      service: "Rua xe",
      review:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,",
      rating: "4",
    },
    {
      id: 2,
      service: "Son bong",
      review: "Service quality was good.",

      rating: "5",
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
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
                    Review List
                    <span className="badge badge-soft-dark radius-50 fz-12">
                      2
                    </span>
                  </h5>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <Search
                    label="Search orders"
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
                  {rows.map((item) => (
                    <TableRow hover key={item.id}>
                      <TableCell sx={{ border: "none" }}>{item.id}</TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {item.service}
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <p className="text-wrap mb-1 ">{item.review}</p>
                      </TableCell>
                      <TableCell sx={{ border: "none", fontSize: "12px" }}>
                        <label className="mb-1 badge badge-soft-info">
                          <span className="fz-12 d-flex align-items-center gap-1">
                            {item.rating}
                            <StarIcon fontSize="inherit" />
                          </span>
                        </label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination className="pagination" />
            </div>
            <div className="table-responsive mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGarage;
