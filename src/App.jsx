import React from "react";
import SignIn from "./pages/SignIn/SignIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customer/Customers";
import MainLayout from "./pages/MainLayout";
import Review from "./pages/Customer/Review";
import CustomerDetail from "./pages/Customer/CustomerDetail";
import AddOwner from "./pages/Onwer/AddOwner";
import Onwers from "./pages/Onwer/Onwers";
import AddMechanic from "./pages/Mechanic/AddMechanic";
import Mechanics from "./pages/Mechanic/Mechanics";
import Chat from "./pages/Mechanic/MechanicDetail";
import Employees from "./pages/Employee/Employees";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import AddService from "./pages/Service/AddService";
import Services from "./pages/Service/Services";
import Coupon from "./pages/Coupon/Coupon";

import All from "./pages/Order/All";
import Pending from "./pages/Order/Pending";
import Confirm from "./pages/Order/Confirm";
import Cancel from "./pages/Order/Cancel";

import OrderDetail from "./pages/Order/OrderDetail";
import OwnerDetail from "./pages/Onwer/OwnerDetail";
import authService from "./features/auth/authService";
import ServiceDetail from "./pages/Service/ServiceDetail/ServiceDetail";


function App() {
  const user = authService.getCurrentUser();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<SignIn />} />
          </Route>
          {/* Protected routes for "admin" role */}
          <Route path="admin" element={<MainLayout />}>
            <Route path="" element={<Dashboard />} />
            {/* CUSTOMER */}
            <Route path="list-customer" element={<Customers />} />
            <Route path="customer/view/:id" element={<CustomerDetail />} />
            <Route path="review-list-customer" element={<Review />} />
            {/* Garage */}
            <Route path="add-garage" element={<AddOwner />} />
            <Route path="garage-list" element={<Onwers />} />
            <Route path="garage/view/:id" element={<OwnerDetail />} />

            {/* MECHANIC */}
            <Route path="add-new-mechanics" element={<AddMechanic />} />
            <Route path="list-mechanics" element={<Mechanics />} />
            <Route path="mechanic/detail/:id" element={<Chat />} />

            {/* EMPLOYEE */}
            <Route path="list-employee" element={<Employees />} />
            {/* CATEGORY */}
            <Route path="view-category" element={<Categories />} />

            {/* PRODUCT */}
            <Route path="list-product" element={<Products />} />
            {/* SERVICES */}
            <Route path="add-new-service" element={<AddService />} />
            <Route path="list-service/detail/:id" element={<ServiceDetail />} />
            <Route path="list-service" element={<Services />} />
            {/* COUPON */}
            <Route path="coupon" element={<Coupon />} />
            {/* ORDER */}
            <Route path="all-orders" element={<All />} />
            <Route path="orders/details/:id" element={<OrderDetail />} />

            <Route path="pending-order" element={<Pending />} />
            <Route path="confirm-order" element={<Confirm />} />
            <Route path="cancel-order" element={<Cancel />} />
            {/* REPORT */}
            {/* <Route path="admin-report" element={<AdminReport />} />
  
                <Route
                  path="order-transaction-list"
                  element={<TransactionReport />}
                />
                <Route path="owner-report" element={<OnwerReport />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
