import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
const headCells = [
  { id: "productId", label: "ID" },
  { id: "productImage", label: "Product Image", align: "left" },

  { id: "productName", label: "Name" },
  { id: "productPrice", label: "Price" },
  { id: "productQuantity", label: "Quantity" },
  { id:"categoryName",  label: "Category" },
  { id: "productStatus", label: "Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Products = () => {
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

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getProducts(data));
  }, [page, rowsPerPage]);

  const rows = [
    {
      id: 1,
      image:
        "https://aloauto.net/wp-content/uploads/2021/11/camera-hanh-trinh-vietmap-c6-1-1.jpg",
      name: "Camera Hành Trình Vietmap C6 Ghi Hình Sắc Nét, Full HD 1080P",
      type: "Đồ công nghê",
      price: "2,190,000 ",
      status: true,
    },

    {
      id: 2,
      image:
        "https://aloauto.net/wp-content/uploads/2021/11/boc-vo-lang-dinh-da-2-1.jpg",
      name: "Bọc Vô Lăng Hạt Cườm, Đính Đá Siêu Sang Chảnh",
      type: "Bọc vô lăng",
      price: "5,190,000 ",
      status: true,
    },
    {
      id: 3,
      image:
        "https://aloauto.net/wp-content/uploads/2021/11/tham-lot-san-mercedes-3.jpg",
      name: "Thảm Lót Sàn Mercedes",
      type: "Bọc vô lăng",
      price: "4,000,000 ",
      status: true,
    },
  ];

  const recordsProduct = useSelector((state) => state.product.products);
  const count = useSelector((state) => state.product.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsProduct,
      headCells,
      filterFn, 
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      count
    );
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/inhouse-product-list.png"
          alt="products"
          title="In-Garage Product List"
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
                        text="Add new Product"
                      />
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
                      <TableRow hover key={item.productId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productId}</div>
                        </TableCell>

                        <TableCell sx={{ border: "none", textAlign: "center" }}>
                          <img
                            className="rounded"
                            src={item.productImage}
                            width={70}
                            alt={"hello"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productName}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productPrice}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productQuantity}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.categoryProductDto.categoryName}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Switches
                            checked={
                              item.productStatus === "Activate" ? true : false
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="edit" arrow>
                              <Link
                                to={`/admin/mechanic/edit/${item.productId}`}
                                className="btn btn-outline--primary btn-sm square-btn"
                              >
                                <EditIcon fontSize="small" />
                              </Link>
                            </Tooltip>

                            <Tooltip title="delelte" arrow>
                              <Link
                                className="btn btn-outline-danger btn-sm delete square-btn"
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      "Are you sure to delete this record?",
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {},
                                  });
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Products;
