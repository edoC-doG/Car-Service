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
    key: "om",
    icon: null,
    label: "QUẢN LÝ ĐƠN HÀNG",
    type: "group",
  
    children: [
      {
        key: "order",
        icon: <GiMechanicGarage />,
        label: "Đơn hàng",
      
        children: [
          {
            key: "all-orders",
            icon: <RxDotFilled />,
            label: "Tất cả đơn hàng",
            
          },
          {
            key: "pending-order",
            icon: <RxDotFilled color="orange" />,
            label: "Sắp tới",
            
          },
          {
            key: "checkin-order",
            icon: <RxDotFilled  color="yellow"/>,
            label: "Đang làm",
            
          },
          {
            key: "confirm-order",
            icon: <RxDotFilled  color="green"/>,
            label: "Hoàn thành",
            
          },
          {
            key: "cancel-order",
            icon: <RxDotFilled  color="red"/>,
            label: "Hủy bỏ",
            
          },
        ],
      },
    ],
  },
  {
    key: "um",
    icon: null,
    label: "Quản lý người dùng",
    type: "group",
    
    children: [
      {
        key: "customer",
        icon: <GiWallet />,
        label: "Khách hàng",
       
        children: [
         
          {
            key: "review-list-customer",
            icon: <RxDotFilled />,
            label: "Đánh giá khách hàng",
            
          },
        ],
      },
      {
        key: "mechanic",
        icon: <RiUserSettingsFill />,
        label: "Thợ sửa chữa",
        
        children: [
          {
            key: "list-mechanics",
            icon: <RxDotFilled />,
            label: "Danh sách thợ",
            
          },
        ],
      },
      {
        key: "staff",
        icon: <SensorOccupiedIcon />,
        label: "Nhân viên",
        
        children: [
          {
            key: "list-staffs",
            icon: <RxDotFilled />,
            label: "Danh sách nhân viên",
           
          },
        ],
      }, 
    ],
  },

   // Product & Service Management
   {
    key: "psm",
    icon: null,
    label: "QUẢN LÝ SẢN PHẨM VÀ DỊCH VỤ",
    type: "group",
  
    children: [
     

      {
        key: "product",
        icon: <GiRadarSweep />,
        label: "Sản phẩm",
        children: [
          {
            key: "list-product",
            icon: <RxDotFilled />,
            label: "Danh sách sản phẩm",
           
          },
        ],
      },
      {
        key: "service",
        icon: <GrServices />,
        label: "Dịch vụ",
        
        children: [
          {
            key: "list-service",
            icon: <RxDotFilled />,
            label: "Danh sách dịch vụ",
           
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
  // Orders
  {
    key: "om",
    icon: null,
    label: "QUẢN LÝ ĐƠN HÀNG",
    type: "group",
    
    children: [
      {
        key: "order",
        icon: <GiMechanicGarage />,
        label: "Đơn hàng",
        
        children: [
          {
            key: "all-orders",
            icon: <RxDotFilled />,
            label: "Tất cả đơn hàng",
            
          },
          {
            key: "pending-order",
            icon: <RxDotFilled color="orange" />,
            label: "Sắp tới",
            
          },
          {
            key: "checkin-order",
            icon: <RxDotFilled  color="yellow"/>,
            label: "Đang làm",
            
          },
          {
            key: "confirm-order",
            icon: <RxDotFilled  color="green[500]"/>,
            label: "Hoàn thành",
            
          },
          {
            key: "cancel-order",
            icon: <RxDotFilled  color="red"/>,
            label: "Hủy bỏ",
            
          },
        ],
      },
    ],
  },
  // USER MANAGEMENT
  {
    key: "um",
    icon: null,
    label: "QUẢN LÝ TÀI KHOẢN",
    type: "group",
   
    children: [
      {
        key: "customer",
        icon: <GiWallet />,
        label: "Khách hàng",
        
        children: [
          {
            key: "list-customer",
            icon: <RxDotFilled />,
            label: "Danh sách khách hàng",
            
          },
          {
            key: "review-list-customer",
            icon: <RxDotFilled />,
            label: "Đánh giá khách hàng",
            
          },
        ],
      },
      {
        key: "garage",
        icon: <FaUserShield />,
        label: "Garage của hệ thống",
        
        children: [
          // {
          //   key: "add-garage",
          //   icon: <RxDotFilled />,
          //   label: "Add New Garage",
            
          // },
          {
            key: "garage-list",
            icon: <RxDotFilled />,
            label: "Danh sách garage",
            
          },
        ],
      },
      {
        key: "mechanic",
        icon: <RiUserSettingsFill />,
        label: "Thợ sửa chữa",
        
        children: [
          
          {
            key: "list-mechanics",
            icon: <RxDotFilled />,
            label: "Danh sách thợ",
            
          },
        ],
      },
      {
        key: "employee",
        icon: <GrUserAdmin />,
        label: "Nhân viên",
       
        children: [
          {
            key: "list-employee",
            icon: <RxDotFilled />,
            label: "Danh sách nhân viên",
            
          },
        ],
      },
    ],
  },

  // Product & Service Management
  {
    key: "psm",
    icon: null,
    label: "QUẢN LÝ SẢN PHẨM VÀ DỊCH VỤ ",
    type: "group",
    
    children: [
      {
        key: "category",
        icon: <MdFilterList />,
        label: "Danh mục sản phẩm ",
        
        children: [
          {
            key: "view-category",
            icon: <RxDotFilled />,
            label: "Danh sách",
          
          },
        ],
      },

      {
        key: "product",
        icon: <GiRadarSweep />,
        label: "Sản phẩm",
       
        children: [
          {
            key: "list-product",
            icon: <RxDotFilled />,
            label: "Danh sách",
           
          },
        ],
      },
      {
        key: "service",
        icon: <GrServices />,
        label: "Dịch vụ",
      
        children: [
          {
            key: "list-service",
            icon: <RxDotFilled />,
            label: "Danh sách",
            
          },
        ],
      },
    ],
  },

  // Promotion Management
  {
    key: "pm",
    icon: null,
    label: "QUẢN LÝ MÃ GIẢM GIÁ",
    type: "group",
    
    children: [
      {
        key: "offer",
        icon: <RiCouponLine />,
        label: "Mã giảm giá",
       
        children: [
          {
            key: "coupon",
            icon: <RxDotFilled />,
            label: "Danh sách",
            
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