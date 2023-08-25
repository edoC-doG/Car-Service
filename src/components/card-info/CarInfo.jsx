import React from "react";
import DirectionsCarFilledSharpIcon from "@mui/icons-material/DirectionsCarFilledSharp";
const CarInfo = ({ title, brand, model, plate }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="mb-4 d-flex align-items-center gap-2 font-semibold">
          <DirectionsCarFilledSharpIcon fontSize="small" />
          {title}
        </h4>

        <div className="d-flex flex-column gap-2">
          <div>
            <span>Hãng xe: </span>
            <strong>{brand}</strong>
          </div>
          <div>
            <span>Nguyên liệu tiêu thụ: </span>
            <strong>{model}</strong>
          </div>
          <div>
            <span>Biển số: </span>
            <strong>{plate}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
