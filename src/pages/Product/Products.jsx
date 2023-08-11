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
import ModalAdd from "./ModalAdd";
import Notification from './../../components/Notification';
import ModalEdit from "./ModalEdit";
const headCells = [
  { id: "productId", label: "ID" },
  { id: "productImage", label: "Product Image", align: "left" },

  { id: "productName", label: "Name" },
  { id: "productPrice", label: "Price" },
  { id: "productQuantity", label: "Quantity" },
  // { id:"categoryName",  label: "Category" },
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
  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
    title: "",
    subTitle: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [proEdit, setSerEdit] = useState({});
  const handleEdit = (pro) => {
    setSerEdit(pro)
    setShowEdit(true)
  }
   //Call API List
   const proState = useSelector((state) => state.product);
   const { isSuccessAdd,  message } =
    proState;
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "", 
    });
  
   const getData = () => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getProducts(data));
  };
  useEffect(() => {
    getData();
    if(isSuccessAdd ){
      setNotify({
        isOpen: true,
        message: "Sản phẩm được được thêm thành công",
        type: "success",
      })
      handleClose()
    } else {
      if (message?.status === 400) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      }
    }
  }, [page, rowsPerPage, isSuccessAdd, message]);;
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
                        onClick={() => setShowModal(true)}
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
                        {/* <TableCell sx={{ border: "none" }}>
                          <div>{item.categoryProductDto.categoryName}</div>
                        </TableCell> */}
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
                               onClick={() => handleEdit(item)}
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
      <ModalAdd show={showModal} handleClose={handleClose} />
      <ModalEdit show={showEdit} handleClose={handleClose} proEdit={proEdit}/>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Products;
