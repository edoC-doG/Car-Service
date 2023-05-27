import React from "react";

const Header = ({ icon, title, alt, number, size }) => {
  return (
    <div className="mb-3">
      <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
        <img width={size} src={icon} alt={alt} />
        {title}
        <span className="badge badge-soft-dark radius-50">{number}</span>
      </h2>
    </div>
  );
};

export default Header;
