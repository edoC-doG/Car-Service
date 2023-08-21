import authService from "../../features/auth/authService";
import React, { useEffect, useState } from "react";
import Notification from "../../components/Notification";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard"
  }, []);
 

 
  return (
    <>
      <div className="md:pt-24 md:px-8">
        <div className="page-header pb-0 mb-0 border-0">
          <div className="flex-between align-items-center">
            <div>
              <h1
                className="page-header-title"
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Dashboard
              </h1>
              <p className="mb-4">Welcome.</p>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Dashboard;
