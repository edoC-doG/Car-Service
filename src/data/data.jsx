import { IoMdContacts } from "react-icons/io";
import { BiColorFill } from "react-icons/bi";
import { GiLouvrePyramid } from "react-icons/gi";

import { BsChatDots } from "react-icons/bs";
import { AiOutlineHome, AiFillStar } from "react-icons/ai";
import { GiWallet, GiRadarSweep, GiMechanicGarage } from "react-icons/gi";
import { RiUserSettingsFill, RiCouponLine } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { GrUserAdmin, GrServices } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { MdFilterList } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
export const userProfileData = [
  {
    icon: <GrUserAdmin />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsChatDots />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const sidebarData = [
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
];
