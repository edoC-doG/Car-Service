import React from "react";
import "../../styles/button.scss";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
const headCells = [
  { id: "id", label: "ID" },
  { id: "shopname", label: "Shop Name", disableSorting: true },
  { id: "ownername", label: "Owner Name" },
  { id: "contact", label: "Contact Info" },

  { id: "status", label: "Status" },
  { id: "totalService", label: "Total Services" },
  { id: "totalProduct", label: "Total Product" },
  { id: "totalOrders", label: "Total Orders" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const Onwers = () => {
  const rows = [
    {
      id: 1,
      shopname: {
        image:
          "https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f23c79774.png",
        name: "Auto Garage",
      },
      ownername: "Digital Owner",
      contact: {
        email: "tester123@gmail.com",
        phone: "02921323131",
      },
      status: "Active",
      totalService: 20,
      totalProduct: 40,
      totalOrders: 15,
    },
    {
      id: 2,
      shopname: {
        image:
          "https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f140b5c50.png",
        name: "Royal Crown Garage",
      },
      ownername: "Hello world",
      contact: {
        email: "tester123@gmail.com",
        phone: "02921323131",
      },
      status: "Active",
      totalService: 50,
      totalProduct: 100,
      totalOrders: 210,
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
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

            {/* Table Onwer */}
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
                        <div className="d-flex align-items-center gap-2 w-max-content">
                          <img
                            width="50"
                            className="aspect-1 rounded"
                            src={item.shopname.image}
                            alt=""
                          />
                          <div>
                            <Link
                              to={`/admin/owner/view/${item.id}`}
                              className="title-color"
                            >
                              {item.shopname.name}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      {/* Onwer name */}
                      <TableCell sx={{ border: "none" }}>
                        {item.ownername}
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div className="mb-1">
                          <strong>
                            <Link
                              to={`mailto:${item.contact.email}`}
                              className="title-color hover-c1 lowercase"
                            >
                              {item.contact.email}
                            </Link>
                          </strong>
                        </div>
                        <Link
                          to={`tel:${item.contact.phone}`}
                          className="title-color hover-c1 lowercase "
                        >
                          {item.contact.phone}
                        </Link>
                      </TableCell>

                      <TableCell sx={{ border: "none" }}>
                        <label className="badge badge-success text-xs">
                          {item.status}
                        </label>
                      </TableCell>
                      {/* Total Service */}
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        <Link
                          to={`/admin/owners/service-list/1`}
                          className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                        >
                          {item.totalService}
                        </Link>
                      </TableCell>

                      {/* Total Product */}
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        <Link
                          to={`/admin/owners/product-list/1`}
                          className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                        >
                          {item.totalProduct}
                        </Link>
                      </TableCell>
                      {/* Total Order */}
                      <TableCell
                        sx={{
                          border: "none",
                        }}
                      >
                        <Link
                          to={`/admin/owners/order-list/1`}
                          className="btn text-info bg-soft-info font-weight-bold px-3 py-1 fz-12 mb-0"
                        >
                          {item.totalOrders}
                        </Link>
                      </TableCell>
                      {/* Action */}

                      <TableCell sx={{ border: "none" }}>
                        <div className="d-flex justify-content-center gap-2">
                          <Tooltip title="view" arrow>
                            <Link
                              to={`/admin/customer/view/${item.accountID}`}
                              className="btn btn-outline-info btn-sm square-btn"
                            >
                              <VisibilityIcon fontSize="small" />
                            </Link>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onwers;
