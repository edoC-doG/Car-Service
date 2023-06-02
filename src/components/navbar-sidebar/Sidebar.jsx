import React from "react";
import { Link } from "react-router-dom";

import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Menu } from "antd";
import "../../styles/sidebar.scss";
import { sidebarData } from "../../data/data";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const navigate = useNavigate();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 1200) {
      setActiveMenu(false);
    }
  };

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
              src="https://i.imgur.com/IbQr6kf.png"
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
            items={sidebarData}
          />
        </div>
      </>
    </div>
  );
};

export default Sidebar;
