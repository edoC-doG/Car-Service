import { BsChatDots } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { GiWallet, GiRadarSweep, GiMechanicGarage } from "react-icons/gi";
import { RiUserSettingsFill, RiCouponLine } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { GrUserAdmin, GrServices } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { MdFilterList } from "react-icons/md";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
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


export const sidebarManager = [
  // Dashboard
  {
    key: "",
    icon: <AiOutlineHome />,
    label: "Dashboard",
    
  },

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
            key: "review-list-customer",
            icon: <RxDotFilled />,
            label: "Customer Reviews",
            
          },
        ],
      },
      {
        key: "mechanic",
        icon: <RiUserSettingsFill />,
        label: "Mechanics",
        
        children: [
          {
            key: "list-mechanics",
            icon: <RxDotFilled />,
            label: "List",
            
          },
        ],
      },
      {
        key: "staff",
        icon: <SensorOccupiedIcon />,
        label: "Staffs",
        
        children: [
          {
            key: "list-staffs",
            icon: <RxDotFilled />,
            label: "List Staff",
           
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
        key: "product",
        icon: <GiRadarSweep />,
        label: "Products",
        children: [
          {
            key: "list-product",
            icon: <RxDotFilled />,
            label: "List Product",
           
          },
        ],
      },
      {
        key: "service",
        icon: <GrServices />,
        label: "Services",
        
        children: [
          {
            key: "list-service",
            icon: <RxDotFilled />,
            label: "List Service",
           
          },
        ],
      },
    ],
  },
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
            icon: <RxDotFilled color="orange" />,
            label: "Pending",
            
          },
          {
            key: "checkin-order",
            icon: <RxDotFilled  color="yellow"/>,
            label: "Check In",
            
          },
          {
            key: "confirm-order",
            icon: <RxDotFilled  color="green[500]"/>,
            label: "Confirmed",
            
          },
          {
            key: "cancel-order",
            icon: <RxDotFilled  color="red"/>,
            label: "Canceled",
            
          },
        ],
      },
    ],
  },

]


export const sidebarDataAdmin = [
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
        ],
      },
      {
        key: "garage",
        icon: <FaUserShield />,
        label: "All Garages",
        
        children: [
          // {
          //   key: "add-garage",
          //   icon: <RxDotFilled />,
          //   label: "Add New Garage",
            
          // },
          {
            key: "garage-list",
            icon: <RxDotFilled />,
            label: "Garage List",
            
          },
        ],
      },
      {
        key: "mechanic",
        icon: <RiUserSettingsFill />,
        label: "Mechanics",
        
        children: [
          
          {
            key: "list-mechanics",
            icon: <RxDotFilled />,
            label: "List",
            
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
            label: "Categories Product",
          
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
        ],
      },
      {
        key: "service",
        icon: <GrServices />,
        label: "Services",
      
        children: [
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
            icon: <RxDotFilled color="orange" />,
            label: "Pending",
            
          },
          {
            key: "checkin-order",
            icon: <RxDotFilled  color="yellow"/>,
            label: "Check In",
            
          },
          {
            key: "confirm-order",
            icon: <RxDotFilled  color="green[500]"/>,
            label: "Confirmed",
            
          },
          {
            key: "cancel-order",
            icon: <RxDotFilled  color="red"/>,
            label: "Canceled",
            
          },
        ],
      },
    ],
  },
  
];


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