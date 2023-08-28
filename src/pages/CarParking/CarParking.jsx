import React, { useEffect, useState } from "react";

import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import { TableBody, TableCell, TableRow } from "@mui/material";


import { useDispatch, useSelector } from "react-redux";
import { getSlot } from "../../features/garage/garageSlice";
import useTableV2 from "../../components/table/useTableV2";
import authService from "../../features/auth/authService";
import Header from "../../components/Header";

const headCells = [
  { id: "lotNumber", label: "Vị trí " },
  { id: "isAssignedFor", label: "Xe đang thực hiện"},
  { id: "lotStatus", label: "Hiện trạng" },
];

const CarParking = () => {
  useEffect(() => {
    document.title = "Danh sách trạng thái vị trí sửa xe";
  }, []);
  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    dispatch(getSlot(user?.garageId));
  }, [user?.garageId, page, rowsPerPage]);

  const records = useSelector((state) => state.garage.garages);
  const count = useSelector((state) => state.garage.number);
  const carCount = useSelector((state) => state.garage.carCount);

  const statusDetail = useSelector((state) => state.booking.booking);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      records,
      headCells,
      filterFn,
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      count + carCount
    );
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
        size={20}
        alt="all"
        title="Danh sách khu vực sửa xe"
        number={count + carCount}
      />
            <div className="card w-100">
              {/* the number of the status */}
              <div className="card-body">
                <div className="row">
                  {/* All */}
                  <div className="col-md-6 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <WidthFullIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">
                          Số lượng trống
                        </h6>
                      </div>
                      <div className="order-stats__title">{count}</div>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div className="col-md-6 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <CheckCircleSharpIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">
                          Số lượng đang sử dụng
                        </h6>
                      </div>
                      <div className="order-stats__title">
                        {carCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.lotNumber}>
                        <TableCell sx={{ border: "none" }}>
                          {item.lotNumber}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.isAssignedFor}</div>
                        </TableCell>

                        <TableCell
                          sx={{
                            border: "none",
                            textDecoration: "capitalize",
                          }}
                        >
                          <span
                            className={
                              item.lotStatus === "Trống"
                                ? "badge badge-soft-success fz-12"
                                : "badge badge-danger fz-12"
                            }
                          >
                            {item.lotStatus}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
              </div>
              <div className="table-responsive mt-4">
                <div className="px-4 d-flex justify-content-lg-end"></div>
              </div>
            </div>
          
        
    </div>
  );
};

export default CarParking;
