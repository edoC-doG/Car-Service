import { BsChatDots } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { GiWallet, GiRadarSweep, GiMechanicGarage } from "react-icons/gi";
import { RiUserSettingsFill, RiCouponLine } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { GrUserAdmin, GrServices } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { MdFilterList } from "react-icons/md";
// import { VscGraphLine } from "react-icons/vsc";

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

export const themeColors = [];

export const sidebarData = [
  // Dashboard
  {
    key: "",
    icon: <AiOutlineHome />,
    roles: ["Admin", "Manager"],
    label: "Dashboard",
  },
  // USER MANAGEMENT
  {
    key: "um",
    icon: null,
    label: "USER MANAGEMENT",
    type: "group",
    roles: ["Admin", "Manager"],
    children: [
      {
        key: "customer",
        icon: <GiWallet />,
        label: "Customers",
        roles: ["Admin", "Manager"],
        children: [
          {
            key: "list-customer",
            icon: <RxDotFilled />,
            label: "Customer List",
            roles: ["Admin", "Manager"],
          },
          {
            key: "review-list-customer",
            icon: <RxDotFilled />,
            label: "Customer Reviews",
            roles: ["Admin", "Manager"],
          },
        ],
      },
      {
        key: "garage",
        icon: <FaUserShield />,
        label: "All Garages",
        roles: ["Admin"],
        children: [
          {
            key: "add-garage",
            icon: <RxDotFilled />,
            label: "Add New Garage",
            roles: ["Admin"],
          },
          {
            key: "garage-list",
            icon: <RxDotFilled />,
            roles: ["Admin"],
            label: "Garage List",
          },
        ],
      },
      {
        key: "mechanic",
        icon: <RiUserSettingsFill />,
        label: "Mechanics",
        roles: ["Admin", "Manager"],
        children: [
          {
            key: "add-new-mechanics",
            icon: <RxDotFilled />,
            label: "Add New",
            roles: ["Manager"],
          },
          {
            key: "list-mechanics",
            roles: ["Admin", "Manager"],
            icon: <RxDotFilled />,
            label: "List",
          },
        ],
      },
      {
        key: "employee",
        icon: <GrUserAdmin />,
        label: "Employees",
        roles: ["Admin"],
        children: [
          {
            key: "list-employee",
            roles: ["Admin"],
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
    roles: ["Admin"],
    children: [
      {
        key: "category",
        icon: <MdFilterList />,
        roles: ["Admin"],
        label: "Category Setup",
        children: [
          {
            key: "view-category",
            icon: <RxDotFilled />,
            roles: ["Admin"],
            label: "Categories Product",
          },
        ],
      },

      {
        key: "product",
        icon: <GiRadarSweep />,
        roles: ["Admin"],
        label: "In Garage Products",
        children: [
          {
            key: "list-product",
            icon: <RxDotFilled />,
            roles: ["Admin"],
            label: "List Product",
          },
        ],
      },
      {
        key: "service",
        icon: <GrServices />,
        roles: ["Admin"],
        label: "Services",
        children: [
          {
            key: "add-new-service",
            icon: <RxDotFilled />,
            roles: ["Admin"],
            label: "Add New Service",
          },
          {
            key: "list-service",
            icon: <RxDotFilled />,
            roles: ["Admin"],
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
    roles: ["Admin"],
    children: [
      {
        key: "offer",
        icon: <RiCouponLine />,
        label: "Offers & Deals",
        roles: ["Admin"],
        children: [
          {
            key: "coupon",
            icon: <RxDotFilled />,
            roles: ["Admin"],
            label: "Coupon",
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
    roles: ["Admin", "Manager"],
    children: [
      {
        key: "order",
        icon: <GiMechanicGarage />,
        label: "Orders",
        roles: ["Admin", "Manager"],
        children: [
          {
            key: "all-orders",
            icon: <RxDotFilled />,
            label: "All",
            roles: ["Admin", "Manager"],
          },
          {
            key: "pending-order",
            icon: <RxDotFilled />,
            label: "Pending",
            roles: ["Admin", "Manager"],
          },
          {
            key: "confirm-order",
            icon: <RxDotFilled />,
            label: "Confirmed",
            roles: ["Admin", "Manager"],
          },
          {
            key: "cancel-order",
            icon: <RxDotFilled />,
            label: "Canceled",
            roles: ["Admin", "Manager"],
          },
        ],
      },
    ],
  },
  // Reports & Analysis
  // {
  //   key: "r&a",
  //   icon: null,
  //   label: "REPORT & ANALYSIS",
  //   type: "group",
  //   children: [
  //     {
  //       key: "report",
  //       icon: <VscGraphLine />,
  //       label: "Sale & Transaction Report",
  //       children: [
  //         {
  //           key: "Admin-repMrt",
  //           icon: <RxDotFilled />,
  //           label: "Earning report",
  //         },
  //         {
  //           key: "order-transaction-list",
  //           icon: <RxDotFilled />,
  //           label: "Transaction report",
  //         },
  //         {
  //           key: "owner-report",
  //           icon: <RxDotFilled />,
  //           label: "Owner Report",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
