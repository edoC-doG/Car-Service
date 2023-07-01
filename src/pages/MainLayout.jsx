import NavBar from "../components/navbar-sidebar/Navbar";
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Sidebar from "../components/navbar-sidebar/Sidebar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { activeMenu, screenSize } = useStateContext();


  return (
    <>
      <div>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebarr dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <>
              {screenSize <= 1200 ? (
                <div>
                  <div className="w-0">
                    <Sidebar />
                  </div>
                </div>
              ) : (
                <div className="bg-white small-sidebar ">
                  <Sidebar />
                </div>
              )}
            </>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div
              className={
                activeMenu
                  ? "fixed md:fixed sm:fixed  dark:bg-main-dark-bg navbarr size"
                  : screenSize <= 1200
                  ? "fixed md:fixed sm:fixed dark:bg-main-dark-bg navbarr w-full"
                  : "fixed md:fixed sm:fixed dark:bg-main-dark-bg navbarr size1"
              }
            >
              <NavBar />
            </div>
            <div>
              {/* {themeSettings && <ThemeSettings />} */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
