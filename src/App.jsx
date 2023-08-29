import React from "react";
import SignIn from "./pages/SignIn/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customer/Customers";
import MainLayout from "./pages/MainLayout";
import Review from "./pages/Customer/Review";
import CustomerDetail from "./pages/Customer/CustomerDetail";
import AddOwner from "./pages/Garage/AddOwner";
import Garages from "./pages/Garage/Garages";
import AddMechanic from "./pages/Mechanic/AddMechanic";
import Mechanics from "./pages/Mechanic/Mechanics";
import MechanicDetail from "./pages/Mechanic/MechanicDetail";
import Employees from "./pages/Employee/Employees";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import AddService from "./pages/Service/AddService";
import Services from "./pages/Service/Services";
import Coupon from "./pages/Coupon/Coupon";
import Authorization from "./pages/Errors/401";
import All from "./pages/Order/All";
import Pending from "./pages/Order/Pending";
import Confirm from "./pages/Order/Confirm";
import Cancel from "./pages/Order/Cancel";
import Checkin from "./pages/Order/Checkin";

import OrderDetail from "./pages/Order/OrderDetail";
import GarageDetail from "./pages/Garage/GarageDetail";

import ServiceDetail from "./pages/Service/ServiceDetail/ServiceDetail";
import { useSelector } from "react-redux";
import StaffDetail from "./pages/Staff/StaffDetail";
import Staffs from "./pages/Staff/Staffs";
import authService from "./features/auth/authService";
import CarParking from "./pages/CarParking/CarParking";

function App() {
  const currentUser = authService.getCurrentUser();
  const role = currentUser?.roleName;
  const authState = useSelector((state) => state.auth);

  const { user, isSuccess } = authState;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<SignIn />} />

            <Route path="login" element={<SignIn />} />
          </Route>

          {role === "Admin" || user?.roleName === "Admin" ? (
            <Route path="admin" element={<MainLayout />}>
              <Route index element={<All />} />

              {/* CUSTOMER */}
              <Route path="list-customer" element={<Customers />} />
              <Route path="customer/view/:id" element={<CustomerDetail />} />
              <Route path="review-list-customer" element={<Review />} />
              {/* Garage */}
              <Route path="add-garage" element={<AddOwner />} />
              <Route path="garage-list" element={<Garages />} />
              <Route path="garage/view/:id" element={<GarageDetail />} />

              {/* MECHANIC */}
              <Route path="add-new-mechanics" element={<AddMechanic />} />
              <Route path="list-mechanics" element={<Mechanics />} />
              <Route path="mechanic/detail/:id" element={<MechanicDetail />} />

              {/* EMPLOYEE */}
              <Route path="list-employee" element={<Employees />} />
              {/* CATEGORY */}
              <Route path="view-category" element={<Categories />} />

              {/* PRODUCT */}
              <Route path="list-product" element={<Products />} />
              {/* SERVICES */}
              <Route path="add-new-service" element={<AddService />} />
              <Route
                path="list-service/detail/:id"
                element={<ServiceDetail />}
              />
              <Route path="list-service" element={<Services />} />
              {/* COUPON */}
              <Route path="coupon" element={<Coupon />} />
              {/* ORDER */}
              <Route path="all-orders" element={<All />} />

              <Route path="orders/details/:id" element={<OrderDetail />} />

              <Route path="pending-order" element={<Pending />} />
              <Route path="checkin-order" element={<Checkin />} />
              <Route path="confirm-order" element={<Confirm />} />
              <Route path="cancel-order" element={<Cancel />} />
            </Route>
          ) : role === "Manager" || user?.roleName === "Manager" ? (
            <Route path="manager" element={<MainLayout />}>
              <Route index element={<All />} />
              {/* <Route path="" element={<Dashboard />} /> */}
              <Route path="review-list-customer" element={<Review />} />
              {/* MECHANIC */}
              <Route path="list-mechanics" element={<Mechanics />} />
              <Route path="mechanic/detail/:id" element={<MechanicDetail />} />
              {/* Staff */}
              <Route path="list-staffs" element={<Staffs />} />
              <Route path="staff/detail/:id" element={<StaffDetail />} />
              {/* PRODUCT */}
              <Route path="list-product" element={<Products />} />
              <Route
                path="list-service/detail/:id"
                element={<ServiceDetail />}
              />
              {/* Coupon */}
              <Route path="coupon" element={<Coupon />} />

              <Route path="list-service" element={<Services />} />
              {/* ORDER */}
              <Route path="all-orders" element={<All />} />
              <Route path="orders/details/:id" element={<OrderDetail />} />

              <Route path="pending-order" element={<Pending />} />
              <Route path="checkin-order" element={<Checkin />} />

              <Route path="confirm-order" element={<Confirm />} />
              <Route path="cancel-order" element={<Cancel />} />
              {/* CAR PARKING  */}
              <Route path="car-parking" element={<CarParking />} />
            </Route>
          ) : (
            <Route path="403" element={<Authorization />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
