import React from "react";
const CustomerInfo = ({
  title,
  srcIcon,
  name,
  src,
  content,
  phone,
  email,
  icon,
  location,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="mb-4 d-flex align-items-center gap-2 font-semibold">
          <img src={srcIcon} alt="customer" />
          {title}
        </h4>
        <div className="media flex-wrap gap-2">
          <div>
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
            <span className="title-color break-all">
              <strong>{phone}</strong>
            </span>
            <span className="title-color lowercase break-all">{email}</span>

            <div className="d-flex align-items-start gap-1">
              {icon}
              {location}
            </div>
          </div>
          {/* <div className="media-body text-right"></div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
