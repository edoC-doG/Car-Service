import React from "react";
import { Link, NavLink } from "react-router-dom";

import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { AiOutlineHome, AiFillStar } from "react-icons/ai";
import { GiWallet, GiRadarSweep, GiMechanicGarage } from "react-icons/gi";
import { RiUserSettingsFill, RiCouponLine } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { GrUserAdmin, GrServices } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { MdFilterList } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { Menu } from "antd";
import "../../styles/sidebar.scss";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  // console.log(activeMenu);
  const navigate = useNavigate();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 1200) {
      setActiveMenu(false);
    }
  };
  // const activeLink = "flex items-center gap-5 pb-2.5 text-base active-link";
  // const normalLink =
  //   "flex items-center gap-5 pb-2.5 text-base dark:text-gray-200 dark:hover:text-black normal-link";

  return (
    <div className="h-screen overflow-auto frame-sidebar">
      {activeMenu ? (
        <>
          <div className="flex justify-between items-center">
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
              <span>Auto Detailing</span>
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
              // defaultOpenKeys={"customer"}
              mode="inline"
              theme="light"
              onClick={({ key }) => {
                // console.log(key);
                navigate(key);
              }}
              inlineCollapsed={!activeMenu}
              items={[
                // Dashboard
                {
                  key: "",
                  icon: <AiOutlineHome />,
                  label: "Dashboard",
                },
                // USER MANAGEMENT
                {
                  key: "um",
                  icon: null,
                  label: "USER MANAGEMENT",
                  type: "group",
                  children: [
                    {
                      key: "customer",
                      icon: <GiWallet />,
                      label: "Customers",
                      children: [
                        {
                          key: "list-customer",
                          icon: <RxDotFilled />,
                          label: "Customer List",
                        },
                        {
                          key: "review-list-customer",
                          icon: <RxDotFilled />,
                          label: "Customer Reviews",
                        },
                        {
                          key: "customer-wallet-report",
                          icon: <RxDotFilled />,
                          label: "Wallet",
                        },
                      ],
                    },
                    {
                      key: "oweners",
                      icon: <FaUserShield />,
                      label: "All Owners",
                      children: [
                        {
                          key: "owner",
                          icon: <RxDotFilled />,
                          label: "Add New Owner",
                        },
                        {
                          key: "owner-list",
                          icon: <RxDotFilled />,
                          label: "Owner List",
                        },
                      ],
                    },
                    {
                      key: "mechanic",
                      icon: <RiUserSettingsFill />,
                      label: "Mechanics",
                      children: [
                        {
                          key: "add-new-mechanics",
                          icon: <RxDotFilled />,
                          label: "Add New",
                        },
                        {
                          key: "list-mechanics",
                          icon: <RxDotFilled />,
                          label: "List",
                        },
                        {
                          key: "chat",
                          icon: <RxDotFilled />,
                          label: "Chat",
                        },
                        {
                          key: "emergency-contact",
                          icon: <RxDotFilled />,
                          label: "Emergency Contact",
                        },
                      ],
                    },
                    {
                      key: "employee",
                      icon: <GrUserAdmin />,
                      label: "Employees",
                      children: [
                        {
                          key: "list-employee",
                          icon: <RxDotFilled />,
                          label: "Employees",
                        },
                      ],
                    },
                  ],
                },

                // Product & Service Management
                {
                  key: "psm",
                  icon: null,
                  label: "PRODUCT & SERVICE MANAGEMENT",
                  type: "group",
                  children: [
                    {
                      key: "category",
                      icon: <MdFilterList />,
                      label: "Category Setup",
                      children: [
                        {
                          key: "view-category",
                          icon: <RxDotFilled />,
                          label: "Categories",
                        },
                        {
                          key: "sub-category-view",
                          icon: <RxDotFilled />,
                          label: "Sub Categories",
                        },
                      ],
                    },
                    {
                      key: "brand",
                      icon: <AiFillStar />,
                      label: "Brands",
                      children: [
                        {
                          key: "add-new-brand",
                          icon: <RxDotFilled />,
                          label: "Add New",
                        },
                        {
                          key: "list-brand",
                          icon: <RxDotFilled />,
                          label: "List",
                        },
                      ],
                    },
                    {
                      key: "product",
                      icon: <GiRadarSweep />,
                      label: "In Garage Products",
                      children: [
                        {
                          key: "list-product",
                          icon: <RxDotFilled />,
                          label: "List Product",
                        },
                        {
                          key: "import",
                          icon: <RxDotFilled />,
                          label: "Import",
                        },
                      ],
                    },
                    {
                      key: "service",
                      icon: <GrServices />,
                      label: "Services",
                      children: [
                        {
                          key: "add-new-service",
                          icon: <RxDotFilled />,
                          label: "Add New Service",
                        },
                        {
                          key: "list-service",
                          icon: <RxDotFilled />,
                          label: "List Service",
                        },
                      ],
                    },
                  ],
                },

                // Promotion Management
                {
                  key: "pm",
                  icon: null,
                  label: "PROMOTION MANAGEMENT",
                  type: "group",
                  children: [
                    {
                      key: "offer",
                      icon: <RiCouponLine />,
                      label: "Offers & Deals",
                      children: [
                        {
                          key: "coupon",
                          icon: <RxDotFilled />,
                          label: "Coupon",
                        },
                        {
                          key: "deal",
                          icon: <RxDotFilled />,
                          label: "Featured Deal",
                        },
                      ],
                    },
                  ],
                },
                // Orders
                {
                  key: "om",
                  icon: null,
                  label: "ORDER MANAGEMENT",
                  type: "group",
                  children: [
                    {
                      key: "order",
                      icon: <GiMechanicGarage />,
                      label: "Orders",
                      children: [
                        {
                          key: "all-orders",
                          icon: <RxDotFilled />,
                          label: "All",
                        },
                        {
                          key: "pending-order",
                          icon: <RxDotFilled />,
                          label: "Pending",
                        },
                        {
                          key: "confirm-order",
                          icon: <RxDotFilled />,
                          label: "Confirmed",
                        },
                        {
                          key: "cancel-order",
                          icon: <RxDotFilled />,
                          label: "Canceled",
                        },
                      ],
                    },
                  ],
                },
                // Reports & Analysis
                {
                  key: "r&a",
                  icon: null,
                  label: "REPORT & ANALYSIS",
                  type: "group",
                  children: [
                    {
                      key: "report",
                      icon: <VscGraphLine />,
                      label: "Sale & Transaction Report",
                      children: [
                        {
                          key: "admin-report",
                          icon: <RxDotFilled />,
                          label: "Earning report",
                        },
                        {
                          key: "order-transaction-list",
                          icon: <RxDotFilled />,
                          label: "Transaction report",
                        },
                        {
                          key: "owner-report",
                          icon: <RxDotFilled />,
                          label: "Owner Report",
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
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

          <Menu
            defaultSelectedKeys={[""]}
            // defaultOpenKeys={"customer"}
            onClick={({ key }) => {
              navigate(key);
              // console.log(key);
            }}
            mode="inline"
            theme="light"
            inlineCollapsed={!activeMenu}
            items={[
              // Dashboard
              {
                key: "",
                icon: <AiOutlineHome />,
                label: "Dashboard",
              },
              // USER MANAGEMENT
              {
                key: "um",
                icon: null,
                label: "USER MANAGEMENT",
                type: "group",
                children: [
                  {
                    key: "customer",
                    icon: <GiWallet />,
                    label: "Customers",
                    children: [
                      {
                        key: "list-customer",
                        icon: <RxDotFilled />,
                        label: "Customer List",
                      },
                      {
                        key: "review-list-customer",
                        icon: <RxDotFilled />,
                        label: "Customer Reviews",
                      },
                      {
                        key: "customer-wallet-report",
                        icon: <RxDotFilled />,
                        label: "Wallet",
                      },
                    ],
                  },
                  {
                    key: "oweners",
                    icon: <FaUserShield />,
                    label: "All Owners",
                    children: [
                      {
                        key: "owner",
                        icon: <RxDotFilled />,
                        label: "Add New Owner",
                      },
                      {
                        key: "owner-list",
                        icon: <RxDotFilled />,
                        label: "Owner List",
                      },
                    ],
                  },
                  {
                    key: "mechanic",
                    icon: <RiUserSettingsFill />,
                    label: "Mechanics",
                    children: [
                      {
                        key: "add-new-mechanics",
                        icon: <RxDotFilled />,
                        label: "Add New",
                      },
                      {
                        key: "list-mechanics",
                        icon: <RxDotFilled />,
                        label: "List",
                      },
                      {
                        key: "chat",
                        icon: <RxDotFilled />,
                        label: "Chat",
                      },
                      {
                        key: "emergency-contact",
                        icon: <RxDotFilled />,
                        label: "Emergency Contact",
                      },
                    ],
                  },
                  {
                    key: "employee",
                    icon: <GrUserAdmin />,
                    label: "Employees",
                    children: [
                      {
                        key: "list-employee",
                        icon: <RxDotFilled />,
                        label: "Employees",
                      },
                    ],
                  },
                ],
              },

              // Product & Service Management
              {
                key: "psm",
                icon: null,
                label: "PRODUCT & SERVICE MANAGEMENT",
                type: "group",
                children: [
                  {
                    key: "category",
                    icon: <MdFilterList />,
                    label: "Category Setup",
                    children: [
                      {
                        key: "view-category",
                        icon: <RxDotFilled />,
                        label: "Categories",
                      },
                      {
                        key: "sub-category-view",
                        icon: <RxDotFilled />,
                        label: "Sub Categories",
                      },
                    ],
                  },
                  {
                    key: "brand",
                    icon: <AiFillStar />,
                    label: "Brands",
                    children: [
                      {
                        key: "add-new-brand",
                        icon: <RxDotFilled />,
                        label: "Add New",
                      },
                      {
                        key: "list-brand",
                        icon: <RxDotFilled />,
                        label: "List",
                      },
                    ],
                  },
                  {
                    key: "product",
                    icon: <GiRadarSweep />,
                    label: "In Garage Products",
                    children: [
                      {
                        key: "list-product",
                        icon: <RxDotFilled />,
                        label: "List Product",
                      },
                      {
                        key: "import",
                        icon: <RxDotFilled />,
                        label: "Import",
                      },
                    ],
                  },
                  {
                    key: "service",
                    icon: <GrServices />,
                    label: "Services",
                    children: [
                      {
                        key: "add-new-service",
                        icon: <RxDotFilled />,
                        label: "Add New Service",
                      },
                      {
                        key: "list-service",
                        icon: <RxDotFilled />,
                        label: "List Service",
                      },
                    ],
                  },
                ],
              },

              // Promotion Management
              {
                key: "pm",
                icon: null,
                label: "PROMOTION MANAGEMENT",
                type: "group",
                children: [
                  {
                    key: "offer",
                    icon: <RiCouponLine />,
                    label: "Offers & Deals",
                    children: [
                      {
                        key: "coupon",
                        icon: <RxDotFilled />,
                        label: "Coupon",
                      },
                      {
                        key: "deal",
                        icon: <RxDotFilled />,
                        label: "Featured Deal",
                      },
                    ],
                  },
                ],
              },
              // Orders
              {
                key: "om",
                icon: null,
                label: "ORDER MANAGEMENT",
                type: "group",
                children: [
                  {
                    key: "order",
                    icon: <GiMechanicGarage />,
                    label: "Orders",
                    children: [
                      {
                        key: "all-orders",
                        icon: <RxDotFilled />,
                        label: "All",
                      },
                      {
                        key: "pending-order",
                        icon: <RxDotFilled />,
                        label: "Pending",
                      },
                      {
                        key: "confirm-order",
                        icon: <RxDotFilled />,
                        label: "Confirmed",
                      },
                      {
                        key: "cancel-order",
                        icon: <RxDotFilled />,
                        label: "Canceled",
                      },
                    ],
                  },
                ],
              },
              // Reports & Analysis
              {
                key: "r&a",
                icon: null,
                label: "REPORT & ANALYSIS",
                type: "group",
                children: [
                  {
                    key: "report",
                    icon: <VscGraphLine />,
                    label: "Sale & Transaction Report",
                    children: [
                      {
                        key: "admin-report",
                        icon: <RxDotFilled />,
                        label: "Earning report",
                      },
                      {
                        key: "order-transaction-list",
                        icon: <RxDotFilled />,
                        label: "Transaction report",
                      },
                      {
                        key: "owner-report",
                        icon: <RxDotFilled />,
                        label: "Owner Report",
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
