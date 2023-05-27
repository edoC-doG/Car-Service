import React from "react";

const CustomerInfo = ({ title, src, name, numberOfOrder, phone, email }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="mb-4 d-flex align-items-center gap-2 font-semibold">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
            alt="customer"
          />
          {title}
        </h4>
        <div className="media">
          <div className="mr-3">
            <img
              className="avatar rounded-circle avatar-70"
              src={src}
              alt="avatar"
            />
          </div>
          {/* Info detail */}
          <div className="media-body d-flex flex-column gap-1">
            <span className="title-color hover-c1">
              <strong>{name}</strong>
            </span>
            <span className="title-color">
              <strong>{numberOfOrder}</strong>
              Orders
            </span>
            <span className="title-color">
              <strong>{phone}</strong>
            </span>
            <span className="title-color lowercase">{email}</span>
          </div>
          <div className="media-body text-right"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
