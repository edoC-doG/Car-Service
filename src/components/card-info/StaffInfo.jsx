import React from "react";

const StaffInfo = ({ title, name, contact, location, skill, activeDiv }) => {
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

        <div className="d-flex flex-column gap-2">
          <div>
            <span>Name: </span>
            <strong>{name}</strong>
          </div>
          <div>
            <span>Contact: </span>
            <strong>{contact}</strong>
          </div>
          {activeDiv === true ? (
            <div>
              <span>Skill: </span>
              <strong>{skill}</strong>
            </div>
          ) : (
            ""
          )}

          <div>
            <span>Garage Location: </span>
            <strong>{location}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffInfo;
