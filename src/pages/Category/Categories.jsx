import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/category/categorySlide";

const headCells = [
  { id: "categoryId", label: "ID" },
  { id: "categoryName", label: "Name" },
  { id: "categoryStatus", label: "Status" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Categories = () => {
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
    dispatch(getCategories(data));
  }, [page, rowsPerPage]);


  const recordsCategory = useSelector((state) => state.category.categories);
  const count = useSelector((state) => state.category.number);


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsCategory,
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
          icon="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
          alt="category"
          title="Category Setup"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                    <h5 className="text-capitalize d-flex gap-1 font-semibold">
                      Category List
                      <span className="badge badge-soft-dark radius-50 fz-12">
                        {count}
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
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.categoryId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.categoryId}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.categoryName}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <Switches
                            checked={
                              item.categoryStatus === "Activate" ? true : false
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            {/* <Tooltip title="edit" arrow>
                              <Link
                                to={`/admin/mechanic/edit/${item.categoryId}`}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <EditIcon fontSize="small" />
                              </Link>
                            </Tooltip> */}

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

export default Categories;
