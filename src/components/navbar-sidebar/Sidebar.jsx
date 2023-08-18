import React from "react";
import { Link } from "react-router-dom";

import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Menu } from "antd";
import "../../styles/sidebar.scss";
import { sidebarData } from "../../data/data";
import { useSelector } from "react-redux";
import authService from "../../features/auth/authService";

const Sidebar = () => {
  const authState = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = authState;


  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const navigate = useNavigate();
// const user = authService.getCurrentUser()
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 1200) {
      setActiveMenu(false);
    }
  };


  const filterDataByRole = (data, role) => {
    return data.filter(item => {
      if (item.roles && item.roles.includes(role)) {
        if (item.children) {
          item.children = filterDataByRole(item.children, role);
        }
        return true;
      }
      return false;
    });
  };
  
  const filteredSidebarData = filterDataByRole(sidebarData,user.roleDto.roleName );
  console.log(filteredSidebarData);
  return (
    <div className="h-screen overflow-auto frame-sidebar">
      <>
        <div
          className={
            activeMenu
              ? "flex justify-between items-center"
              : "flex items-center"
          }
        >
          <Link
            to="/admin"
            onClick={handleCloseSideBar}
            className="items-center gap-3 flex text-xl font-extrabold tracking-tight dark:text-white font-logo"
          >
            <img
              height="40px"
              className="z-index-2"
              src="https://firebasestorage.googleapis.com/v0/b/car-service-bf62f.appspot.com/o/logo.png?alt=media&token=ec9161af-b632-4d9e-a849-4e07dcce7ce3"
              alt="Logo"
            />

            {activeMenu ? <span>Auto Detailing</span> : ""}
          </Link>
          <Tooltip title="Menu" placeholder="BottomCenter">
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </Tooltip>
        </div>
        <div className="main-sidebar">
          <Menu
            defaultSelectedKeys={[""]}
            mode="inline"
            theme="light"
            onClick={({ key }) => {
              navigate(key);
            }}
            inlineCollapsed={!activeMenu}
            items={filteredSidebarData}
          />
        </div>
      </>
    </div>
  );
};

export default Sidebar;
