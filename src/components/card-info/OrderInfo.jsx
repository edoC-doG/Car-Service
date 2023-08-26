import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
const OrderInfo = ({ title, items, name }) => {
  return (
    <div className={name === "mechanic" ? "" : "col-md-6"}>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0 font-semibold"> {title}</h5>
        </div>
        <div className="card-body" style={{ textAlign: "left" }}>
          {items.map((item, id) => (
            <div className="flex-start" key={id}>
              <div>
                {item.name === "" ? (
                  <PlaceIcon className=" mb-3 d-flex align-items-center gap-2 rounded-circle avatar-30" />
                ) : item.name === "Bắt đầu" ? (
                  <CalendarTodayIcon className="mb-3 d-flex align-items-center gap-2 avatar-30" />
                ) : item.name === "Biển số" ? (
                    <TimeToLeaveIcon className="mb-3 d-flex align-items-center gap-2 avatar-30" />
                ) : (
                    <div className="mb-3 d-flex align-items-center gap-2 font-semibold">
                    {item.name}:
                  </div>
                  
                )}
              </div>
              <h5 className="mb-3 ml-2 d-flex align-items-center">
                {item.content}.
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
