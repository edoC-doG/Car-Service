import React, { useEffect, useState } from "react";
import PendingIcon from "@mui/icons-material/Pending";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { getSlot } from "../../features/garage/garageSlice";
import useTableV2 from "../table/useTableV2";

const headCells = [
  { id: "lotNumber", label: "Vị trí " },
  { id: "isAssignedFor", label: "Xe đang thực hiện"},
  { id: "lotStatus", label: "Hiện trạng" },
];

const CarParking = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[4];
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    dispatch(getSlot(id));
  }, [id, page, rowsPerPage]);

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
    <div className="tab-content">
      <div className="tab-pane fade show active">
        <div className="row pt-2">
          <div className="col-md-12">
            <div className="card w-100">
              {/* Title */}
              <div className="card-header">
                <h5 className="mb-0 font-semibold">
                  Danh sách bãi xe khả dụng
                </h5>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default CarParking;
