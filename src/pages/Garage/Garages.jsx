import React, { useEffect, useState } from "react";
import "../../styles/button.scss";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { getGarages, resetState,updateGarageStatus } from "../../features/garage/garageSlice";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";

const headCells = [
  { id: "garageId", label: "ID" },
  { id: "garageName", label: "Tên garage", disableSorting: true },
  { id: "garageContactInformation", label: "SĐT" },

  { id: "garageStatus", label: "Trạng thái" },
  { id: "totalServices", label: "Tổng số dịch vụ" },
  // { id: "", label: "Total Product" },
  { id: "totalOrders", label: "Tổng đơn hàng" },

  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Onwers = () => {
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });


  const updateSuccessAction = useSelector((state) => state.garage.isSuccessAction);

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getGarages(data));
    // dispatch(getNumberCustomer());

    if (updateSuccessAction) {
      dispatch(resetState());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Update Successfully",
        type: "success",
      });
    }
  }, [page, rowsPerPage, updateSuccessAction]);

  const recordsGarage = useSelector((state) => state.garage.garages);

  const handleSwitchToggle = (garageId, garageStatus) => {
    // Dispatch the updateCustomerStatus action
    console.log("id and status", garageId, garageStatus);
    dispatch(updateGarageStatus({garageId, garageStatus }));
  };
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
    useTableV2(
      recordsGarage,
      headCells,
      filterFn,
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      15
    );
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
          alt="onwers"
          title="Danh sách garage"
          number="15"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row justify-content-between align-items-center gy-2">
                  <div className="col-sm-8 col-md-6 col-lg-4">
                    <Search
                      label="Tìm kiếm bằng tên garage"
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
                        text="Thêm mới garage"
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
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.garageId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.garageId}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex align-items-center gap-2 w-max-content">
                            {/* <img
                            width="50"
                            className="aspect-1 rounded"
                            src={item.shopname.image}
                            alt=""
                          /> */}
                            <div>
                              <Link
                                to={`/admin/garage/view/${item.garageId}`}
                                className="title-color"
                              >
                                {item.garageName}
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        {/* Onwer name */}

                        <TableCell sx={{ border: "none" }}>
                          <Link
                            to={`tel:${item.garageContactInformation}`}
                            className="title-color hover-c1 lowercase "
                          >
                            {item.garageContactInformation}
                          </Link>
                        </TableCell>
                        {/* status garage */}
                        <TableCell sx={{ border: "none" }}>
                          <Switches
                            checked={
                              item.garageStatus === "Activate" ? true : false
                            }
                            onChange={(event) => {
                              setConfirmDialog({
                                isOpen: true,
                                title:
                                  "Bạn có chắc chắn muốn thay đổi trạng thái?",
                                subTitle: "Bạn không thể hoàn tác thao tác này",
                                onConfirm: () => {
                                  handleSwitchToggle(
                                    item.garageId,
                                    event.target.checked ? 1 : 0
                                  );
                                },
                              });
                            }}
                          />
                        </TableCell>
                        {/* Total Service */}
                        <TableCell
                          sx={{
                            border: "none",
                          }}
                        >
                          <Link
                            to={`/admin/garage/service-list/${item.garageId}`}
                            className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                          >
                            {item.totalServices}
                          </Link>
                        </TableCell>

                        {/* Total Product
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
                      </TableCell> */}
                        {/* Total Order */}
                        <TableCell
                          sx={{
                            border: "none",
                          }}
                        >
                          <Link
                            to={`/admin/garage/order-list/${item.garageId}`}
                            className="btn text-info bg-soft-info font-weight-bold px-3 py-1 fz-12 mb-0"
                          >
                            {item.totalOrders}
                          </Link>
                        </TableCell>
                        {/* Action */}

                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="Chi tiết" arrow>
                              <Link
                                to={`/admin/garage/view/${item.garageId}`}
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Onwers;
