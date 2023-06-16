import React from "react";

const StartReview = ({ star, value, count, width }) => {
  return (
    <li className="d-flex align-items-center ">
      <span className="mr-3">{star}</span>
      <div className="progress flex-grow-1">
        <div
          className="progress-bar"
          style={{ width: width }}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span className="ml-3">{count}</span>
    </li>
  );
};

export default StartReview;
