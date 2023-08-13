import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import React, { useState } from "react";
import Garage from "../../components/Garage&Owner/Garage";
import Order from "../../components/Garage&Owner/Order";
import Service from "../../components/Garage&Owner/Service";
import ReviewGarage from "../../components/Garage&Owner/ReviewGarage";
import { useSelector } from "react-redux";

const tabs = ["garage", "order", "service", "review"];
const OwnerDetail = () => {
  const [type, setType] = useState("garage");
  const navigate = useNavigate();  
  const garageDetail = useSelector((state) => state.garage.garage);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon={
          "https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
        }
        alt={"owner detail"}
        title={"Garage Details"}
      />

      {/* Button back  */}
      <div className="flex-between d-sm-flex row align-items-center justify-content-between mb-2 mx-1">
        <div>
          <Link
            className="btn btn--primary mt-3 mb-3 text-base"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back to garage list
          </Link>
        </div>
      </div>
      {/* Navbar page */}
      <div className="page-header">
        {/* name of garage */}
        <div className="flex-between row mx-1">
          <h1 className="page-header-title text-xl font-semibold">
           {garageDetail.garageName}
          </h1>
        </div>
        <div className="js-nav-scroller hs-nav-scroller-horizontal">
          <ul className="nav nav-tabs flex-wrap page-header-tabs">
            {tabs.map((tap) => (
              <li
                style={{ backgroundColor: "#f9f9fb" }}
                className="nav-item"
                key={tap}
              >
                <Link
                  className={
                    tap === type ? "nav-link active" : "nav-link capitalize"
                  }
                  onClick={() => setType(tap)}
                >
                  {tap}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Garage */}
      {type === "garage" && <Garage />}
      {/* Order */}
      {type === "order" && <Order />}
      {/*  */}
      {/* Service */}
      {type === "service" && <Service />}
      {/*  */}
      {/* Review */}
      {type === "review" && <ReviewGarage />}
    </div>
  );
};

export default OwnerDetail;