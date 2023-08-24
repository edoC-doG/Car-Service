import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Collapse,
  Box,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ModalDetail from './../../pages/Order/ModalDetail';
const TableOrderDetail = (
  {
  detail,
  booking,
  TblContainer,
  TblHead,
  setBid,
  bid,
  setOpen,
  open,
  key,
  setDetail,
  detailService,
  showDetail,
  handleClose,
  handleDetail
}) => {
  return (
    <>
      {/* Table */}
      <div className="table-responsive">
        <TblContainer>
          <TblHead />
          <TableBody key={key}>
            {detail.map((item) => (
              <>
                <TableRow hover key={item.bookingDetailId}>
                  <TableCell sx={{ border: "none" }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        setBid(item.bookingDetailId);
                        setOpen(!open);
                      }}
                    >
                      {item.bookingDetailId === bid && open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div className="media align-items-center gap-3">
                      <img
                        className="avatar avatar-60 rounded"
                        src={item.serviceBookingDetailDto.serviceImage}
                        alt="Description"
                      />
                      <div>
                        <h6 className="title-color font-semibold">
                          {item.serviceBookingDetailDto.serviceName}
                        </h6>
                        <div>
                          <strong>Price:</strong>{" "}
                          {item.serviceBookingDetailDto.servicePrice}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell sx={{ border: "none" }}>
                    {item.serviceCost}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    {item.productCost}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <Tooltip title=" Sửa" arrow>
                        <Link
                        onClick={()=> handleDetail(item.bookingDetailId)}
                          className="btn btn-outline--primary btn-sm edit square-btn"
                        >
                          <EditIcon fontSize="small" />
                        </Link>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
                {/*  PRODUCT */}
                {item.bookingDetailId === bid ? (
                  <TableRow key={item.productCost}>
                    <TableCell
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        border: "none",
                      }}
                      colSpan={6}
                    >
                      <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        key={item.bookingDetailId}
                      >
                        <Box>
                          <Typography variant="h6" gutterBottom component="div">
                            Product
                          </Typography>
                        </Box>
                        <Table aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Id
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Name
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow hover>
                              <TableCell sx={{ border: "none" }}>
                                {item.productBookingDetailDto.productId}
                              </TableCell>
                              <TableCell sx={{ border: "none" }}>
                                {item.productBookingDetailDto.productName}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
              </>
            ))}
          </TableBody>
        </TblContainer>
      </div>
      <hr className="my-3" />

      {/* Total Price */}
      <div className="row justify-content-md-end mb-3">
        <div className="col-md-9 col-lg-8">
          <dl className="row gy-1 text-sm-right">
            <dt className="col-5">Repair costs</dt>
            <dd className="col-6 title-color">
              <strong>{booking.totalPrice}</strong>
            </dd>
            <dt className="col-5">Coupon discount</dt>
            <dd className="col-6 title-color">- 0.0</dd>
            <dt className="col-5 ">
              <strong>Total</strong>
            </dt>
            <dd className="col-6 title-color">
              <strong>{booking.totalPrice}</strong>
            </dd>
          </dl>
        </div>
      </div>
      <ModalDetail show={showDetail} handleClose={handleClose} detailService={detailService} />
    </>
  );
};

export default TableOrderDetail;
