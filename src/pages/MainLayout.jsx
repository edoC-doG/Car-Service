import NavBar from "../components/navbar-sidebar/Navbar";
import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Tooltip } from "@mui/material";
import { FiSettings } from "react-icons/fi";
import Sidebar from "../components/navbar-sidebar/Sidebar";
import ThemeSettings from "../components/ThemeSettings";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    screenSize,
  } = useStateContext();
  // console.log(screenSize);
  // console.log(activeMenu);
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <Tooltip content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white setting hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </Tooltip>
          </div> */}
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
                <div className="bg-white small-sidebar">
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
              {themeSettings && <ThemeSettings />}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
