import Header from "../../components/Header";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import StartReview from "../../components/review/StartReview";
import StarIcon from "@mui/icons-material/Star";

import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";

const headCells = [
  { id: "reviewer", label: "Reviewer" },
  { id: "review", label: "Review", disableSorting: true },
  { id: "date", label: "Date", minWidth: 138 },
];

const ReviewDetail = () => {
  const navigate = useNavigate();

  const rows = [
    {
      reviewer: {
        id: 1,
        name: "David Jack",
        image:
          "https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png",
        email: "thanhminh145200@gmail.com",
      },
      review: {
        star: "4",
        des: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,",
      },
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
    {
      reviewer: {
        id: 2,
        name: "Min Min",
        image:
          "https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png",
        email: "thanhminh145200@gmail.com",
      },
      review: {
        star: "5",
        des: "Service quality was good.",
      },
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <Header
          size={"25"}
          icon={"https://i.imgur.com/1EPVEZN.png"}
          alt={"service"}
          title={"Vệ Sinh – Bảo Dưỡng Ngoại Thất Ô Tô"}
        />
        <div className="mb-3">
          <Link
            to={""}
            className="btn btn--primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />{" "}
            <span style={{ fontSize: "14px" }}>Back</span>
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row align-items-md-center gx-md-5">
            <div className="col-md-auto mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <img
                  className="avatar avatar-xxl avatar-4by3 mr-4"
                  src="https://danhbongxehoi.vn/kcfinder/upload/images/hinh1-ky-thuat-rua-xe-o-to-chuyen-nghiep.jpg"
                  alt="rua-xe"
                />
                <div className="d-block">
                  <h4 className="display-2 text-dark mb-0">4.50</h4>
                  <p> Of 2 Reviews</p>
                  <span className="badge badge-soft-dark badge-pill ml-1"></span>
                </div>
              </div>
            </div>
            {/* Thanh sao đánh giá */}
            <div className="col-md">
              <ul className="list-unstyled list-unstyled-py-2 mb-0">
                <StartReview
                  star={"5 star"}
                  width={"50%"}
                  value={100}
                  count="1"
                />
                <StartReview
                  star={"4 star"}
                  width={"75%"}
                  value={75}
                  count="3"
                />
                <StartReview
                  star={"3 star"}
                  width={"00%"}
                  value={100}
                  count="0"
                />
                <StartReview
                  star={"2 star"}
                  width={"0%"}
                  value={100}
                  count="0"
                />
                <StartReview
                  star={"1 star"}
                  width={"0%"}
                  value={100}
                  count="0"
                />
              </ul>
            </div>
            <div className="col-12">
              <hr className="my-3" />
            </div>
            {/* Detail Service */}
            <div className="col-lg-4 mb-5 mb-lg-0 d-flex flex-column gap-1">
              <div className="flex-start">
                <h5 className="font-bold">Rua Xe</h5>
              </div>
              <div className="flex-start">
                <span className="">Price: </span>
                <span className="mx-1">70.000 VND</span>
              </div>
              <div className="flex-start">
                <span className="">Discount: </span>
                <span className="mx-1">0 VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Review */}
      <div className="card mt-3">
        <div className="table-reponsive">
          <TblContainer>
            <TblHead />
            <TableBody>
              {rows.map((item) => (
                <TableRow hover key={item.reviewer.id}>
                  <TableCell sx={{ border: "none" }}>
                    <div>
                      <Link
                        to={`/admin/customer/view/${item.reviewer.id}`}
                        className="d-flex align-items-center"
                      >
                        <div className="avatar avatar-circle">
                          <img
                            className="avatar-img"
                            src={item.reviewer.image}
                            alt="pictre description"
                          />
                        </div>
                        <div className="ml-3">
                          <span
                            className="d-block h5 text-hover-primary mb-0"
                            style={{ fontSize: "14px", lineHeight: "20px" }}
                          >
                            {item.reviewer.name}
                          </span>
                          <span className="d-block  text-body lowercase">
                            {item.reviewer.email}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </TableCell>

                  {/* Review description */}
                  <TableCell sx={{ border: "none" }}>
                    <div className="text-wrap">
                      <div className="d-flex mb-2">
                        <label className="badge badge-soft-info">
                          <span className="text-sm">
                            {item.review.star} <StarIcon fontSize="inherit" />
                          </span>
                        </label>
                      </div>
                      <p className="text-sm">{item.review.des}</p>
                    </div>
                  </TableCell>
                  {/* Date */}
                  <TableCell sx={{ border: "none" }}>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination className="pagination" />
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
