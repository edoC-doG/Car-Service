import React from "react";
import { Link } from "react-router-dom";
const BoxOrder = ({ link, src, content, quantity }) => {
  return (
    <div className="col-sm-6 col-lg-4">
      <Link to={`/admin/${link}`} className="order-stats">
        <div className="order-stats__content">
          <img width={"20"} src={src} alt="icon" className="svg" />
          <h5 className="order-stats__subtitle">{content}</h5>
        </div>
        <span className="order-stats__title">{quantity}</span>
      </Link>
    </div>
  );
};

export default BoxOrder;
